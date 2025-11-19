# Proces Tjekliste - Informationssøgning

## Oversigt
En interaktiv webapplikation til at guide medarbejdere gennem vidensafdækning ved udvikling af vidensprodukter. Applikationen understøtter 8 trin i processen med mulighed for at spore fremgang, tildele ansvar og eksportere til Word-dokumenter.

## Nye features

### ✨ Word-eksport
- Eksportér dit arbejde til et professionelt formateret Word-dokument (.docx)
- Indeholder projektnavn, dato, og status for alle 8 trin
- Alle noter og ansvarlige personer inkluderes
- Automatisk filnavngivning baseret på projektnavn

### 📝 Metadata-felter
- **Projektnavn**: Navngiv dit vidensprodukt
- **Dato**: Automatisk udfyldt med dags dato (kan ændres)

### 💾 Forbedret gem/indlæs
- JSON-filer inkluderer nu metadata
- Fuld kompatibilitet med tidligere gemte projekter

## Sådan bruges systemet

### 1. Start nyt projekt
1. Åbn `index.html` i din browser
2. Indtast projektnavn og vælg dato
3. Klik på hvert trin for at markere det som gennemført
4. Udfyld "Ansvarlig person" og "Noter" for hvert trin

### 2. Gem dit arbejde
**Automatisk gemning:**
- Dit arbejde gemmes automatisk i browserens LocalStorage
- Data bevares når du lukker og genåbner siden

**Manuel sikkerhedskopi:**
- Klik "Gem projekt" for at downloade en JSON-fil
- Filen kan deles med kolleger eller gemmes til senere brug

### 3. Indlæs eksisterende projekt
1. Klik "Indlæs projekt"
2. Vælg en tidligere gemt JSON-fil
3. Alle data genindlæses automatisk

### 4. Eksportér til Word
1. Når du er klar til at dele eller arkivere dit arbejde
2. Klik "Eksportér til Word"
3. Et struktureret Word-dokument downloades automatisk

**Word-dokumentet indeholder:**
- Projekttitel og metadata
- Status-oversigt (X/8 trin gennemført)
- Hvert trin med:
  - Status (✓ Gennemført / ○ Ikke gennemført)
  - Ansvarlig person
  - Noter

## De 8 trin i processen

1. **Hvad leder du efter?** - Definer dit søgemål
2. **Afdelingens viden** - Tjek eksisterende intern viden
3. **Find hjemmesider og rapporter** - Søg eksterne kilder
4. **Find forskning** - Identificer relevant forskning
5. **Involvér fagperson(er)** - Inddrag ekspertise
6. **Kilder og referencer** - Dokumenter dine kilder
7. **Vurdér informationen** - Kvalitetssikring
8. **Formidling** - Klar til at dele budskabet

## Tekniske detaljer

### Teknologier
- HTML5, CSS3, JavaScript (ES6+)
- [docx.js](https://docx.js.org/) - Word-dokument generering
- [FileSaver.js](https://github.com/eligrey/FileSaver.js) - Fil-download funktionalitet
- LocalStorage API - Lokal data-persistens

### Browserkrav
- Moderne browsers (Chrome, Firefox, Safari, Edge)
- JavaScript aktiveret
- LocalStorage support

### Datastruktur (JSON)
```json
{
  "metadata": {
    "projectName": "Mit vidensprodukt",
    "projectDate": "2025-01-15"
  },
  "completedSteps": [1, 2, 3],
  "stepData": {
    "1": {
      "responsible": "Anders Jensen",
      "notes": "Emnet er afgrænset til..."
    }
  },
  "savedAt": "2025-01-15T10:30:00.000Z",
  "version": "1.0"
}
```

## Samarbejde

### Deling mellem medarbejdere
1. Person A arbejder på projektet
2. Person A klikker "Gem projekt" og gemmer JSON-filen
3. Person A sender JSON-filen til Person B (email, Teams, SharePoint)
4. Person B klikker "Indlæs projekt" og fortsætter arbejdet
5. Person B gemmer igen og sender tilbage

### Best practices
- Brug beskrivende projektnavne
- Gem regelmæssigt som backup
- Tilføj dato i filnavn når I sender filer rundt
- Eksportér til Word når projektet er færdigt

## Fejlfinding

### Word-eksport virker ikke
- Tjek at du har internetforbindelse (libraries hentes fra CDN)
- Prøv en anden browser
- Tjek browser-konsollen for fejlmeddelelser

### Data forsvinder
- Tjek at LocalStorage er aktiveret i din browser
- Private browsing/inkognito mode gemmer ikke data
- Brug "Gem projekt" som sikkerhedskopi

### JSON-fil kan ikke indlæses
- Tjek at filen er gemt korrekt (ikke korrupt)
- Filen skal have .json-endelse
- Prøv at gemme projektet igen

## Fremtidige forbedringer (potentielle)
- [ ] Integration med SharePoint
- [ ] Real-time collaboration
- [ ] Template-muligheder for forskellige typer vidensprodukter
- [ ] Påmindelser og notifikationer
- [ ] Excel-eksport for data-analyse
- [ ] PDF-eksport

## Support
For spørgsmål eller problemer, kontakt IT-support eller projektejeren.

---
**Version**: 1.0
**Sidst opdateret**: 2025-01-19
