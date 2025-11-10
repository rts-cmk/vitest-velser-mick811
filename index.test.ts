import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { fetchData, handleInput } from "./index";

describe("handleInput", () => {
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

describe("fetchData", () => {
    let cases: {
        shouldSucceed: boolean
        data?: string
        expected?: string
        expectedError?: string
    }[] = []

    beforeEach(() => cases = []);
    afterEach(() => cases = []);

    // test af succes-tilfælde når promise resolver
    describe("when promise resolves successfully", () => {
        beforeEach(() => {
            cases = [
                { shouldSucceed: true, data: "Success", expected: "Success" },
                { shouldSucceed: true, data: "Hello World", expected: "Hello World" },
                { shouldSucceed: true, data: "Test data", expected: "Test data" },
            ]
        });

        // async test - venter på promise resolver før assertion
        it("should return data when successful", async () => {
            for (const { shouldSucceed, data, expected } of cases) {
                // await venter på promise resolver
                const result = await fetchData(shouldSucceed, data);
                expect(result, `"${data}" to return "${expected}"`).toBe(expected);
            }
        })
    })

    // test af fejltilfælde når promise rejecter
    describe("when promise rejects with error", () => {
        beforeEach(() => {
            cases = [
                { shouldSucceed: false, expectedError: "operation failed" },
            ]
        });

        // async test - tester at promise rejecter med forventet fejl
        it("should throw error when failed", async () => {
            for (const { shouldSucceed, expectedError } of cases) {
                // rejects.toThrow tester at promise rejecter med specifik fejl
                await expect(
                    fetchData(shouldSucceed),
                    `should reject with "${expectedError}"`
                ).rejects.toThrow(expectedError);
            }
        })
    })
});
