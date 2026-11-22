import { profile } from '../content';

// profile.careerStart is "YYYY-MM" (currently Jan 2025)
const [startYear, startMonth] = profile.careerStart.split('-').map(Number);
export const CAREER_START = new Date(startYear, startMonth - 1, 1);

/** Whole years + one decimal, rounded DOWN (Nov 2026 → "1.8"). */
export function experienceYears(start = CAREER_START, now = new Date()): string {
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return (Math.floor((months / 12) * 10) / 10).toFixed(1);
}
