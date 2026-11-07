import { isManufacturerId } from "@/data/catalog";
import { useParams } from "react-router-dom";
import CatalogDetail from "./CatalogDetail";
import CatalogPage from "./CatalogPage";

export default function CatalogRoute() {
  const { slug } = useParams();
  if (!slug) return <CatalogPage />;
  if (isManufacturerId(slug)) return <CatalogPage manufacturer={slug} />;
  return <CatalogDetail slug={slug} />;
}
