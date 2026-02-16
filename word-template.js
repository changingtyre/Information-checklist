/**
 * Genbrugelig Word-skabelon baseret på Steno Videncenter-styling.
 *
 * Afhængigheder (CDN):
 *   <script src="https://unpkg.com/docx@7.8.2/build/index.js"></script>
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
 *
 * Brug:
 *   const template = new WordTemplate();
 *   template.addTitle('Min titel');
 *   template.addMetadata('Projektnavn', 'Mit projekt');
 *   template.addSectionHeading('1. Første afsnit');
 *   template.addLabelValue('Felt', 'Indhold med https://links.dk automatisk');
 *   template.addBodyText('Brødtekst her...');
 *   template.download('rapport.docx');
 */

class WordTemplate {
    // ── Designkonstanter ────────────────────────────────────────────────
    static STYLE = {
        colors: {
            darkBlue: '003D5C',   // Overskrifter
            black: '000000',      // Brødtekst
            linkBlue: '0563C1',   // Hyperlinks
        },
        font: 'Calibri',
        sizes: {
            title: 32,            // Halvpunkter (= 16 pt)
            sectionHeading: 28,   // 14 pt
            body: 22,             // 11 pt
        },
        spacing: {
            titleAfter: 400,
            metadataAfter: 150,
            sectionBefore: 400,
            sectionAfter: 200,
            labelAfter: 100,
            bodyAfter: 200,
            largeGap: 600,
        },
        indent: {
            content: 300,         // Twips – indrykning af feltindhold
        },
        margins: {                // 1 tomme = 1440 twips
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1440,
        },
    };

    constructor() {
        if (typeof docx === 'undefined') {
            throw new Error('docx.js er ikke indlæst. Tilføj scriptet før brug.');
        }
        this.paragraphs = [];
    }

    // ── Hjælpefunktioner ────────────────────────────────────────────────

    /**
     * Konverterer tekst til TextRun-array, hvor URL'er bliver til klikbare
     * hyperlinks med blå farve og understregning.
     */
    static textToRunsWithLinks(text, size, font) {
        const S = WordTemplate.STYLE;
        size = size || S.sizes.body;
        font = font || S.font;

        if (!text || text === 'Ingen noter') {
            return [new docx.TextRun({ text: text, size, font, color: S.colors.black })];
        }

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = urlRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(new docx.TextRun({
                    text: text.substring(lastIndex, match.index),
                    size, font, color: S.colors.black,
                }));
            }

            parts.push(new docx.ExternalHyperlink({
                children: [
                    new docx.TextRun({
                        text: match[0],
                        size, font,
                        color: S.colors.linkBlue,
                        underline: {},
                    }),
                ],
                link: match[0],
            }));

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            parts.push(new docx.TextRun({
                text: text.substring(lastIndex),
                size, font, color: S.colors.black,
            }));
        }

        return parts.length > 0
            ? parts
            : [new docx.TextRun({ text, size, font, color: S.colors.black })];
    }

    // ── Bygge-metoder (kædebare) ────────────────────────────────────────

    /** Hovedtitel – fed, 32 halvpunkter, mørkeblå */
    addTitle(text) {
        const S = WordTemplate.STYLE;
        this.paragraphs.push(
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text,
                        bold: true,
                        size: S.sizes.title,
                        color: S.colors.darkBlue,
                        font: S.font,
                    }),
                ],
                spacing: { after: S.spacing.titleAfter },
            })
        );
        return this;
    }

    /** Metadata-linje, f.eks. "Projektnavn: Mit projekt" */
    addMetadata(label, value) {
        const S = WordTemplate.STYLE;
        this.paragraphs.push(
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: label + ': ',
                        bold: true,
                        size: S.sizes.body,
                        font: S.font,
                        color: S.colors.black,
                    }),
                    new docx.TextRun({
                        text: value,
                        size: S.sizes.body,
                        font: S.font,
                        color: S.colors.black,
                    }),
                ],
                spacing: { after: S.spacing.metadataAfter },
            })
        );
        return this;
    }

    /** Kursiv statuslinje, f.eks. "Status: 3/8 trin gennemført (38%)" */
    addStatusLine(text) {
        const S = WordTemplate.STYLE;
        this.paragraphs.push(
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text,
                        italics: true,
                        size: S.sizes.body,
                        font: S.font,
                        color: S.colors.black,
                    }),
                ],
                spacing: { after: S.spacing.largeGap },
            })
        );
        return this;
    }

    /** Sektionsoverskrift – fed, 28 halvpunkter, mørkeblå */
    addSectionHeading(text) {
        const S = WordTemplate.STYLE;
        this.paragraphs.push(
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text,
                        bold: true,
                        size: S.sizes.sectionHeading,
                        font: S.font,
                        color: S.colors.darkBlue,
                    }),
                ],
                spacing: { before: S.spacing.sectionBefore, after: S.spacing.sectionAfter },
            })
        );
        return this;
    }

    /** Felt-label (fed) + indholdsværdi (med auto-link-detektion) */
    addLabelValue(label, value) {
        const S = WordTemplate.STYLE;

        // Label
        this.paragraphs.push(
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: label + ':',
                        bold: true,
                        size: S.sizes.body,
                        font: S.font,
                        color: S.colors.black,
                    }),
                ],
                spacing: { after: S.spacing.labelAfter },
            })
        );

        // Værdi (indrykket, med URL-håndtering)
        this.paragraphs.push(
            new docx.Paragraph({
                children: WordTemplate.textToRunsWithLinks(value),
                spacing: { after: S.spacing.bodyAfter },
                indent: { left: S.indent.content },
            })
        );
        return this;
    }

    /** Almindelig brødtekst (indrykket, med auto-link-detektion) */
    addBodyText(text) {
        const S = WordTemplate.STYLE;
        this.paragraphs.push(
            new docx.Paragraph({
                children: WordTemplate.textToRunsWithLinks(text),
                spacing: { after: S.spacing.bodyAfter },
                indent: { left: S.indent.content },
            })
        );
        return this;
    }

    /** Tom linje / ekstra mellemrum */
    addSpacer(twips) {
        this.paragraphs.push(
            new docx.Paragraph({ text: '', spacing: { after: twips || 200 } })
        );
        return this;
    }

    // ── Generering & download ───────────────────────────────────────────

    /** Byg docx.Document-objekt med de tilføjede paragraffer */
    build() {
        const M = WordTemplate.STYLE.margins;
        return new docx.Document({
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: M.top,
                            right: M.right,
                            bottom: M.bottom,
                            left: M.left,
                        },
                    },
                },
                children: this.paragraphs,
            }],
        });
    }

    /** Generér blob og download filen */
    async download(fileName) {
        if (typeof saveAs === 'undefined') {
            throw new Error('FileSaver.js er ikke indlæst. Tilføj scriptet før brug.');
        }
        const doc = this.build();
        const blob = await docx.Packer.toBlob(doc);
        saveAs(blob, fileName || 'dokument.docx');
    }

    /** Returnér blob uden at downloade (nyttigt til tests eller uploads) */
    async toBlob() {
        const doc = this.build();
        return docx.Packer.toBlob(doc);
    }
}
