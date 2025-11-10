import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fetchData, getUserName, handleInput } from "../src/index";
import * as api from "../src/api";

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

describe("getUserName", () => {
    let cases: {
        userId: number
        mockUser: {
            id: number
            name: string
            email: string
        },
        expected: string
    }[] = []

    beforeEach(() => {
        cases = [];
        // nulstiller alle mocks før hver test
        vi.clearAllMocks();
    });

    afterEach(() => {
        // gendanner alle mocks efter hver test
        vi.restoreAllMocks();
    });

    describe("when given invalid input", () => {
        it("should throw error for negative user ID", async () => {
            await expect(getUserName(-1)).rejects.toThrow("user id must be positive");
        });
        
        it("should throw error for non-integer user ID", async () => {
            await expect(getUserName(1.5)).rejects.toThrow("user id must be an integer");
        });
    });

    // test af succes-tilfælde når api returnerer bruger
    describe("when api returns user successfully", () => {
        beforeEach(() => {
            cases = [
                { userId: 1, mockUser: { id: 1, name: "John Doe", email: "john.doe@example.com" }, expected: "john doe" },
                { userId: 2, mockUser: { id: 2, name: "Jane Smith", email: "jane.smith@example.com" }, expected: "jane smith" },
                { userId: 3, mockUser: { id: 3, name: "Jim Beam", email: "jim.beam@example.com" }, expected: "jim beam" },
            ]
        });

        // async test - tester at funktionen returnerer korrekt navn
        it("should return lowercase user name", async () => {
            for (const { userId, mockUser, expected } of cases) {
                // vi.spyOn() overvåger api.getUser og lader os bestemme hvad den returnerer
                // mockResolvedValue() sætter hvad funktionen skal returnere når den kaldes
                vi.spyOn(api, "getUser").mockResolvedValue(mockUser);

                const result = await getUserName(userId);
                expect(result, `"${userId}" to return "${expected}"`).toBe(expected);
                // verificer at api funktionen blev kaldt med korrekt id
                expect(api.getUser).toHaveBeenCalledWith(userId);
            }
        })
    });

    // test af fejltilfælde når api kaster fejl
    describe("when api throws error", () => {
        beforeEach(() => {
            cases = [
                { userId: 999, mockUser: { id: 999, name: "", email: "" }, expected: "" },
            ]
        });

        // async test - tester at funktionen kaster fejl når api fejler
        it("should throw error when API fails", async () => {
            for (const { userId } of cases) {
                // vi.spyOn() overvåger api.getUser og mockRejectedValue() får den til at kaste en fejl
                // dette erstatter den rigtige api kald med en test-version der fejler
                vi.spyOn(api, "getUser").mockRejectedValue(new Error("User not found"));
                
                // rejects.toThrow fanger fejlen og verificerer at det er den forventede fejl
                await expect(
                    getUserName(userId),
                    `should throw error for user ${userId}`
                ).rejects.toThrow("User not found");
                
                // verificer at api blev kaldt
                expect(api.getUser).toHaveBeenCalledWith(userId);
            }
        })
    })
})
