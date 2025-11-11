import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { fetchData } from "../src/index";

describe("fetchData - Øvelse 3: Asynkrone funktioner", () => {
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

