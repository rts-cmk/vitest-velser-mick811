import { describe, it, expect } from "vitest";
import { handleInput } from "./index";

describe("handleInput", () => {

    it("should handle numbers correctly", () => {

        const cases = [
            { input: 1, expected: true },
            { input: 13, expected: true },
            { input: -7, expected: false },
            { input: 0, expected: true },
            { input: NaN, expected: false },
            { input: Infinity, expected: false },
        ]
        cases.forEach(({ input, expected }) => {
            expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected)
        })
    })

    it("should handle strings correctly", () => {
        
        const cases = [
            { input: "hello", expected: true },
            { input: "  test ", expected: true, },
            { input: " ", expected: false, },
            { input: "", expected: false, }
        ]
        cases.forEach(({ input, expected }) => {
            expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected)
        })
    })

    it("should handle null and undefined values", () => {

        const cases = [
            { input: undefined, expected: false },
            { input: null, expected: false }
        ]
        cases.forEach(({ input, expected }) => {
            expect(handleInput(input), `"${input}" to return ${expected}`).toBe(expected)
        })
    })
});
