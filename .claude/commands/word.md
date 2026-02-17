# Word Rapport

Generer en Word-rapport (.docx) ved hjælp af Steno Videncenter-skabelonen fra `word-template.js`.

## Instruktioner

Brugeren vil bede dig om at generere en Word-rapport. Følg disse trin:

1. **Forstå indholdet**: Spørg brugeren hvad rapporten skal indeholde, hvis det ikke allerede fremgår. Du skal bruge:
   - En titel til rapporten
   - Eventuel metadata (projektnavn, dato, forfatter, osv.)
   - Sektioner med overskrifter og indhold

2. **Generer koden**: Opret en selvstændig HTML-fil der bruger `WordTemplate`-klassen fra dette repository til at bygge og downloade Word-dokumentet. Filen skal:
   - Inkludere CDN-afhængighederne: `docx@7.8.2` og `FileSaver.js@2.0.5`
   - Inkludere `word-template.js` inline eller som script-reference
   - Automatisk generere og downloade .docx-filen når den åbnes

3. **Brug skabelonens API**: `WordTemplate`-klassen understøtter disse kædebare metoder:

   ```javascript
   const t = new WordTemplate();
   t.addTitle('Rapporttitel')                    // Hovedtitel (fed, 16pt, mørkeblå #003D5C)
    .addMetadata('Projektnavn', 'Værdien')       // Metadata-linje (fed label + normal værdi)
    .addStatusLine('Status: 3/5 gennemført')     // Kursiv statuslinje
    .addSectionHeading('1. Afsnitsoverskrift')   // Sektionsoverskrift (fed, 14pt, mørkeblå)
    .addLabelValue('Spørgsmål', 'Svar her')      // Felt med fed label + indrykket værdi
    .addBodyText('Brødtekst med auto-links')     // Indrykket brødtekst
    .addSpacer(400)                              // Ekstra mellemrum (twips)
    .download('filnavn.docx');                   // Generér og download
   ```

4. **Design-specifikationer** (allerede indbygget i skabelonen):
   - Font: Calibri gennemgående
   - Farver: Mørkeblå (#003D5C) til overskrifter, sort til brødtekst, blå (#0563C1) til links
   - Marginer: 1 tomme (1440 twips) alle sider
   - URL'er i tekst konverteres automatisk til klikbare hyperlinks

5. **Output**: Skriv den genererede HTML-fil til projektets rod med et beskrivende filnavn, f.eks. `rapport-[emne].html`. Filen skal kunne åbnes direkte i en browser for at downloade Word-dokumentet.

## Eksempel på genereret fil

```html
<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="UTF-8">
    <title>Word Rapport Generator</title>
    <script src="https://unpkg.com/docx@7.8.2/build/index.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <script src="word-template.js"></script>
</head>
<body>
    <p>Genererer rapport...</p>
    <script>
        const t = new WordTemplate();
        t.addTitle('Min rapport')
         .addMetadata('Dato', '2026-02-17')
         .addSectionHeading('1. Introduktion')
         .addBodyText('Indhold her...')
         .download('min-rapport.docx')
         .then(() => {
             document.body.innerHTML = '<p>Rapporten er downloadet!</p>';
         });
    </script>
</body>
</html>
```

$ARGUMENTS
