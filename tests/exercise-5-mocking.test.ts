import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getUserName } from "../src/index";
import * as api from "../src/api";

describe("getUserName - Øvelse 5: Mocking af afhængigheder", () => {
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
});

