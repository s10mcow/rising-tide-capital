import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata, metadataValues } from "@/lib/page-metadata";
export default function PageMetadata() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const meta = getPageMetadata(pathname);
    document.title = meta.title;
    for (const [key, value] of Object.entries(metadataValues(pathname))) {
      document
        .querySelector(`meta[name="${key}"], meta[property="${key}"]`)
        ?.setAttribute("content", value);
    }
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", meta.url);
  }, [pathname]);
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;
      target.scrollIntoView({ behavior: "auto" });
      return true;
    };
    if (scroll()) return;
    // A lazy route may mount after this effect; wait for its anchor without polling.
    const observer = new MutationObserver(() => {
      if (scroll()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 10000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname, hash]);
  return null;
}
