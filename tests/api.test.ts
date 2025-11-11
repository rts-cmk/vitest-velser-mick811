import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUser } from "../src/api";

describe("getUser - Øvelse 7: API-funktioner", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    const cases = [
        { id: 1, expected: { id: 1, name: "User 1", email: "user1@example.com" } },
        { id: 42, expected: { id: 42, name: "User 42", email: "user42@example.com" } },
        { id: 100, expected: { id: 100, name: "User 100", email: "user100@example.com" } },
    ];

    describe("when called with valid user id", () => {
        it("should return correct user object", async () => {
            for (const { id, expected } of cases) {
                const promise = getUser(id);
                // fremskynder den simulerede ventetid med 100ms
                vi.advanceTimersByTime(100);
                const user = await promise;
                expect(user).toEqual(expected);
            }
        });
    });

    describe("when called with invalid id", () => {
        it("should still resolve with generated user object", async () => {
            const promise = getUser(-1);
            vi.advanceTimersByTime(100);
            const user = await promise;
            expect(user).toEqual({
                id: -1,
                name: "User -1",
                email: "user-1@example.com".replace("--", "-")
            });
        });
    });
});
