import { getUser } from "./api";

/**
 * Test af grænsetilfælde og inputvariation.
 * Håndterer tal, strenge og null-værdier.
 * 
 * @param value - Værdi fra inputfeltet (tal, streng eller null)
 * @returns true hvis værdien er gyldig (ikke-null tal >= 0 eller ikke-tom streng), ellers false
 */
export function handleInput(value: number | string | null | undefined): boolean {
    // håndterer null og undefined eksplicit
    if (value === null || value === undefined) {
        return false;
    }

    // håndterer numbers - validerer at det er et endeligt tal >= 0
    if (typeof value === "number") {
        return Number.isFinite(value) && value >= 0;
    }

    // håndterer strings - trim fjerner whitespace og tjekker længde
    if (typeof value === "string") {
        return value.trim().length > 0;
    }

    // fallback for ubekendt type (sker ikke med TypeScript, men defensive programming)
    return false;
}

/**
 * Asynkron funktion der returnerer et Promise.
 * Test af success og fejltilfælde.
 * 
 * @param shouldSucceed - Hvis true, resolver Promise med data, ellers rejecter med fejl
 * @param data - Data der skal returneres ved succes
 * @returns Promise der resolver med data eller rejecter med fejl
 */
export async function fetchData(
    shouldSucceed: boolean = true,
    data: string = "success"
): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldSucceed 
                ? resolve(data) 
                : reject(new Error("operation failed"));
        }, 10);
    });
}

/**
 * Validerer at user ID er gyldigt.
 * 
 * @param userId - ID for brugeren der skal valideres
 * @throws Error hvis user ID er ugyldigt
 */
function validateUserId(userId: number): void {
    if (!Number.isInteger(userId)) {
        throw new Error("user id must be an integer");
    }
    if (userId <= 0) {
        throw new Error("user id must be positive");
    }
}

/**
 * Henter bruger og formaterer navnet.
 * Bruger ekstern API afhængighed.
 * 
 * @param userId - ID for brugeren der skal hentes
 * @returns Promise med formateret bruger navn
 */
export async function getUserName(userId: number): Promise<string> {
    validateUserId(userId);

    const user = await getUser(userId);
    return user.name.toLowerCase();
}
