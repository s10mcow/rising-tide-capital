import raw from "./lake-city-catalog.json";

export type LakeCityTour = { href: string; label: string };

export type LakeCityFeatureSection = {
  heading: string;
  items: string[];
};

export type LakeCityPublication = {
  action: "add" | "enrich";
  packSlug: string;
  slug: string;
  matchModelNumber: string | null;
  brand: string;
  series: string;
  modelName: string;
  modelNumber: string | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  dimensionsText: string | null;
  photos: string[];
  floorPlanImage: string | null;
  floorPlanPdf: string | null;
  tours: LakeCityTour[];
  featureSetId: string | null;
};

type LakeCityFile = {
  featureSets: Record<string, LakeCityFeatureSection[]>;
  publications: LakeCityPublication[];
};

const data = raw as LakeCityFile;

export const lakeCityFeatureSets = data.featureSets;
export const lakeCityPublications = data.publications;
