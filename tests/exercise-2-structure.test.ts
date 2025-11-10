import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { handleInput } from "../src/index";

/**
 * Øvelse 2: Strukturér dine tests med describe, beforeEach og afterEach
 * 
 * Teststruktur og gentagelighed. Ved at gruppere og genbruge opsætning 
 * undgår man duplikering og får mere overskuelige testfiler.
 * 
 * Denne fil demonstrerer brugen af describe, beforeEach og afterEach.
 * Dette er en forbedret struktur af samme tests fra exercise-1-input-types.test.ts,
 * som viser hvordan man kan organisere tests bedre.
 */
describe("handleInput - Øvelse 2: Teststruktur", () => {
    let cases: {
        input: number | string | null | undefined
        expected: boolean
    }[] = []

    // kører automatisk før hver enkel test
    beforeEach(() => cases = []);

    // bruges til at nulstille mocks, close connections, etc.
    afterEach(() => cases = []);

    // grouping tests together under one "organization"
    describe("when given numbers", () => {
        beforeEach(() => {
            cases = [
                { input: 1, expected: true },
                { input: 13, expected: true },
                { input: -7, expected: false },
                { input: 0, expected: true },
                { input: NaN, expected: false },
                { input: Infinity, expected: false },
            ]
        });

        it("should return correct boolean values", () => {
            cases.forEach(({ input, expected }) => {
                expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected)
            })
        })
    })

    describe("when given strings", () => {
        beforeEach(() => {
            cases = [
                { input: "hello", expected: true },
                { input: "  test ", expected: true, },
                { input: " ", expected: false, },
                { input: "", expected: false, }
            ]
        })

        it("should return correct boolean values", () => {
            cases.forEach(({ input, expected }) => {
                expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected)
            })
        })
    })

    describe("when given null or undefined", () => {
        cases = [
            { input: undefined, expected: false },
            { input: null, expected: false }
        ]

        it("should return false", () => {
            cases.forEach(({ input, expected }) => {
                expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected)
            })
        })
    })
});

