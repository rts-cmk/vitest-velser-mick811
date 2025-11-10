export interface User {
    id: number;
    name: string;
    email: string;
}

/**
 * Henter en bruger fra "API".
 * @param id - Brugerens ID
 * @returns Promise med bruger data
 */
export async function getUser(id: number): Promise<User> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
            });
        }, 100); // 100ms delay
    })
}
