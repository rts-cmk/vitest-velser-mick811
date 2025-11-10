/**
 * Test af grænsetilfælde og inputvariation.
 * Håndterer tal, strenge og null-værdier.
 * 
 * @param value - Værdi fra inputfeltet (tal, streng eller null)
 * @returns true hvis værdien er gyldig (ikke-null tal >= 0 eller ikke-tom streng), ellers false
 */
export function handleInput(value: number | string | null | undefined): boolean {
  if (value === null) {
    return false;
  }
  
  if (typeof value === "number") {
    // håndterer NaN, infinity og negative tal
    return Number.isFinite(value) && value >= 0;
  }
  
  if (typeof value === "string") {
    // trim fjerner whitespace
    return value.trim().length > 0;
  }
  
  return false;
}
