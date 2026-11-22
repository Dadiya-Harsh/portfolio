// One place for site-wide details that show up on more than one page.
// The values come from src/content/profile.json.
import { profile } from '../content';

export const siteConfig = {
  email: profile.email,

  // Shown in "Now building" on Home (and in Recent work on Projects).
  // Set show to false in profile.json to hide it.
  secureWorkspace: profile.nowBuilding,
};
