export interface CaseStudyMeta {
    id: string;
    type: string;
    title: string;
    subtitle?: string;
    desc: string;
    heroImage?: string;
    techStack?: string;
    timeline?: string;
    bullets: string[];
    status: 'published' | 'coming-soon';
}

/**
 * Fetches the case study registry from the static JSON file.
 * Cached after first load per session.
 */
let registryCache: CaseStudyMeta[] | null = null;

export async function loadCaseStudyRegistry(): Promise<CaseStudyMeta[]> {
    if (registryCache) return registryCache;

    const res = await fetch('/case-studies/registry.json');
    if (!res.ok) throw new Error('Failed to load case study registry');

    const data: CaseStudyMeta[] = await res.json();
    registryCache = data;
    return data;
}

/**
 * Fetches the full markdown content for a specific case study.
 */
export async function loadCaseStudyContent(id: string): Promise<string> {
    const res = await fetch(`/case-studies/${id}.md`);
    if (!res.ok) throw new Error(`Case study "${id}" not found`);
    return res.text();
}
