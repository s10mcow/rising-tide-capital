import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata, metadataValues } from "@/lib/page-metadata";

export default function PageMetadata() {
  const { pathname } = useLocation();
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
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
