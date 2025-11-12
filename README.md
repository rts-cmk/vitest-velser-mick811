# how to run it (please read it actually)
first, you have to install dependencies. i use **bun** as my package manager, so the command is `bun install` if you use another package manager like npm, yarn, or pnpm, replace `bun install` with the appropriate installation command, the same goes for the rest of the commands, obviously.

to run the tests to check your tests and see if they passed or failed, you can run the test script defined in your package.json. use `bun run test` the run command is the standard way to execute a script defined in your package.json file for most package managers for example, npm run test or bun run test alternatively, you might be able to run it directly with just `vitest`.

to generate a test coverage report, you can run the dedicated coverage script: `bun run test:coverage`.

now with the cool fancy ui provided by vitest to launch the interactive testing interface in your browser, all you have to do is run `bun run test:ui` this should successfully open the browser to view the vitest ui.

that's a wrap good luck.

# Øvelser med Vitest

Dette sæt øvelser er målrettet elever, der allerede har erfaring med testskrivning i JavaScript. Fokus er på at arbejde med Vitest og styrke forståelsen af testprincipper som struktur, fejlhåndtering, mocking og dækning.

---

## Øvelse 1: Test med forskellige inputtyper

**Opgave:**  
Skriv tests for en funktion, der håndterer både tal, strenge og null-værdier. Sørg for at dække både gyldige og ugyldige input.

**Princip:**  
Test af grænsetilfælde og inputvariation. Formålet er at sikre, at funktioner reagerer korrekt på forskellige typer input og ikke fejler utilsigtet.

**Dokumentation:**  
[Expect API – Vitest](https://vitest.dev/api/expect/)

---

## Øvelse 2: Strukturér dine tests med `describe`, `beforeEach` og `afterEach`

**Opgave:**  
Organisér dine tests i grupper med `describe`. Brug `beforeEach` til at opsætte testdata og `afterEach` til at rydde op.

**Princip:**  
Teststruktur og gentagelighed. Ved at gruppere og genbruge opsætning undgår man duplikering og får mere overskuelige testfiler.

**Dokumentation:**  
[Test Context og Lifecycle – Vitest](https://vitest.dev/guide/test-context.html)

---

## Øvelse 3: Test af asynkrone funktioner

**Opgave:**  
Skriv tests for en funktion, der returnerer en Promise. Test både succes og fejltilfælde.

**Princip:**  
Asynkron testning kræver korrekt håndtering af ventetid og fejl. Det er vigtigt at sikre, at testen venter på resultatet og ikke afsluttes for tidligt.

**Dokumentation:**  
[Async Tests – Vitest](https://vitest.dev/guide/async.html)

---

## Øvelse 4: Test af fejl og undtagelser

**Opgave:**  
Skriv tests for en funktion, der kaster en fejl ved ugyldigt input. Test at fejlen bliver kastet som forventet.

**Princip:**  
Fejltestning handler om at sikre, at koden reagerer korrekt i fejltilstande. Det styrker robustheden og gør det lettere at finde bugs.

**Dokumentation:**  
[Expect toThrow – Vitest](https://vitest.dev/api/expect/#expecttothrow)

---

## Øvelse 5: Mocking af afhængigheder

**Opgave:**  
Skriv tests for en funktion, der bruger en ekstern afhængighed. Brug mocking til at erstatte afhængigheden i testen.

**Princip:**  
Mocking bruges til at isolere funktioner og undgå sideeffekter. Det gør det muligt at teste logik uden at være afhængig af eksterne moduler.

**Dokumentation:**  
[Mocking – Vitest](https://vitest.dev/guide/mocking.html)

---

## Øvelse 6: Testdækning og refaktorering

**Opgave:**  
Brug Vitests dækningsoverblik til at finde manglende tests. Tilføj tests, så alle grene i funktionerne bliver dækket. Refaktorér koden og kontroller, at alle tests stadig består.

**Princip:**  
Testdækning handler om at sikre, at alle relevante dele af koden bliver testet. Refaktorering skal ikke ændre funktionalitet, og tests hjælper med at bevare adfærden.

**Dokumentation:**  
[Coverage – Vitest](https://vitest.dev/guide/coverage.html)
