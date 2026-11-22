// Typed access to the site's content. Shapes follow `content.json` v1
// (see plans/mcp/master-plan.md, section 6).
import profileJson from './profile.json';
import projectsJson from './projects.json';

export interface Link {
  label: string;
  url: string;
}

export interface FocusItem {
  title: string;
  description: string;
  href?: string; // left out when the card doesn't link anywhere
}

export interface Stat {
  value: string;
  label: string; // may contain {repoStars}, use resolveStars()
}

export interface ExperienceItem {
  role: string;
  org: string;
  orgUrl: string | null;
  period: string;
  points: string[];
  tags: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  url: string | null;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  careerStart: string; // "YYYY-MM"
  openToRoles: boolean;
  openToRolesLabel: string;
  headline: string;
  summary: string;
  tagline: string;
  focus: FocusItem[];
  stats: Stat[];
  photo: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
    medium: string;
    resume: string;
    resumePdf: string;
    resumeDocx: string;
    contact: string;
    booking: string | null;
  };
  nowBuilding: {
    show: boolean;
    name: string;
    description: string;
    repoUrl: string;
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
}

export interface ProjectItem {
  title: string;
  description: string;
  links: Link[];
}

export interface OpenSourceItem extends ProjectItem {
  technologies: string[];
  repoStars: string;
}

export interface Projects {
  recent: ProjectItem[];
  openSource: OpenSourceItem[];
  earlier: ProjectItem[];
}

export const profile: Profile = profileJson;
export const projects: Projects = projectsJson;

// The OpenMontage star count lives in one place: projects.openSource[0].repoStars.
// Text that mentions it uses {repoStars}, filled in here.
export const openMontageStars = projects.openSource[0].repoStars;

export function resolveStars(text: string): string {
  return text.split('{repoStars}').join(openMontageStars);
}
