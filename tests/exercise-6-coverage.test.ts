import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handleInput, fetchData, getUserName } from "../src/index";
import * as api from "../src/api";

describe("Øvelse 6: Testdækning - Alle funktioner", () => {
    beforeEach(() => {
        // nulstiller alle mocks før hver test
        vi.clearAllMocks();
    });

    afterEach(() => {
        // gendanner alle mocks efter hver test
        vi.restoreAllMocks();
    });

    describe("handleInput - fuld dækning", () => {
        it("should handle all input types", () => {
            // numbers
            expect(handleInput(1)).toBe(true);
            expect(handleInput(-1)).toBe(false);
            expect(handleInput(0)).toBe(true);
            expect(handleInput(NaN)).toBe(false);
            expect(handleInput(Infinity)).toBe(false);
            
            // strings
            expect(handleInput("hello")).toBe(true);
            expect(handleInput("")).toBe(false);
            expect(handleInput(" ")).toBe(false);
            
            // null og undefined
            expect(handleInput(null)).toBe(false);
            expect(handleInput(undefined)).toBe(false);
        });
    });

    describe("fetchData - fuld dækning", () => {
        it("should handle success and error cases", async () => {
            // success case
            const result = await fetchData(true, "test");
            expect(result).toBe("test");
            
            // error case
            await expect(fetchData(false)).rejects.toThrow("operation failed");
        });
    });

    describe("getUserName - fuld dækning", () => {
        it("should handle validation errors", async () => {
            // validation errors
            await expect(getUserName(-1)).rejects.toThrow("user id must be positive");
            await expect(getUserName(0)).rejects.toThrow("user id must be positive");
            await expect(getUserName(1.5)).rejects.toThrow("user id must be an integer");
        });

        it("should handle success case", async () => {
            // success case
            vi.spyOn(api, "getUser").mockResolvedValue({
                id: 1,
                name: "Test User",
                email: "test@example.com"
            });
            const result = await getUserName(1);
            expect(result).toBe("test user");
            expect(api.getUser).toHaveBeenCalledWith(1);
        });

        it("should handle API error case", async () => {
            // API error case
            vi.spyOn(api, "getUser").mockRejectedValue(new Error("User not found"));
            await expect(getUserName(999)).rejects.toThrow("User not found");
            expect(api.getUser).toHaveBeenCalledWith(999);
        });
    });
});

