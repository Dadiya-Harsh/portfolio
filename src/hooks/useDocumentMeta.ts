import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description?: string;
  noindex?: boolean;
}

const upsertMeta = (name: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
};

// Sets the tab title, meta description and (optionally) noindex for the current page.
// Pass null to leave the head alone, e.g. while a page is still deciding what it is.
export const useDocumentMeta = (meta: DocumentMeta | null) => {
  const active = meta !== null;
  const title = meta?.title;
  const description = meta?.description;
  const noindex = meta?.noindex ?? false;

  useEffect(() => {
    if (!active || title === undefined) return;

    document.title = title;
    if (description !== undefined) upsertMeta('description', description);

    if (noindex) {
      upsertMeta('robots', 'noindex');
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [active, title, description, noindex]);
};
