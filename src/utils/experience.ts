export const CAREER_START = new Date(2025, 0, 1); // Jan 2025

/** Whole years + one decimal, rounded DOWN (Nov 2026 → "1.8"). */
export function experienceYears(start = CAREER_START, now = new Date()): string {
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return (Math.floor((months / 12) * 10) / 10).toFixed(1);
}
