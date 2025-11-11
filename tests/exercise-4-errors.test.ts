import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getUserName } from "../src/index";
import * as api from "../src/api";

describe("getUserName - Øvelse 4: Fejl og undtagelser", () => {
    beforeEach(() => {
        // nulstiller alle mocks før hver test
        vi.clearAllMocks();
    });

    afterEach(() => {
        // gendanner alle mocks efter hver test
        vi.restoreAllMocks();
    });

    // test af ugyldigt input - kaster fejl før API kald
    describe("when given invalid input", () => {
        it("should throw error for negative user ID", async () => {
            // spy på api funktionen for at verificere den ikke bliver kaldt
            vi.spyOn(api, "getUser");
            
            await expect(getUserName(-1)).rejects.toThrow("user id must be positive");
            
            // verificer at api funktionen ikke blev kaldt (validering fejler før API kald)
            expect(api.getUser).not.toHaveBeenCalled();
        });
        
        it("should throw error for zero user ID", async () => {
            // spy på api funktionen for at verificere den ikke bliver kaldt
            vi.spyOn(api, "getUser");
            
            await expect(getUserName(0)).rejects.toThrow("user id must be positive");
            
            // verificer at api funktionen ikke blev kaldt
            expect(api.getUser).not.toHaveBeenCalled();
        });
        
        it("should throw error for non-integer user ID", async () => {
            // spy på api funktionen for at verificere den ikke bliver kaldt
            vi.spyOn(api, "getUser");
            
            await expect(getUserName(1.5)).rejects.toThrow("user id must be an integer");
            
            // verificer at api funktionen ikke blev kaldt
            expect(api.getUser).not.toHaveBeenCalled();
        });
    });
});

