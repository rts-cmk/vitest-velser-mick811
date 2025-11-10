import { describe, it, expect } from "vitest";
import { handleInput } from "../src/index";

/**
 * Øvelse 1: Test med forskellige inputtyper
 * 
 * Test af grænsetilfælde og inputvariation.
 * Formålet er at sikre, at funktioner reagerer korrekt på forskellige typer input og ikke fejler utilsigtet.
 * 
 * Se exercise-2-structure.test.ts for hvordan man strukturerer tests med describe, beforeEach og afterEach.
 */
describe("handleInput - Øvelse 1: Inputtyper", () => {
    it("should handle numbers correctly", () => {
        const cases = [
            { input: 1, expected: true },
            { input: 13, expected: true },
            { input: -7, expected: false },
            { input: 0, expected: true },
            { input: NaN, expected: false },
            { input: Infinity, expected: false },
        ];

        cases.forEach(({ input, expected }) => {
            expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected);
        });
    });

    it("should handle strings correctly", () => {
        const cases = [
            { input: "hello", expected: true },
            { input: "  test ", expected: true },
            { input: " ", expected: false },
            { input: "", expected: false },
        ];

        cases.forEach(({ input, expected }) => {
            expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected);
        });
    });

    it("should handle null and undefined correctly", () => {
        const cases = [
            { input: undefined, expected: false },
            { input: null, expected: false },
        ];

        cases.forEach(({ input, expected }) => {
            expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected);
        });
    });
});

