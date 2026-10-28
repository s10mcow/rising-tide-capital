export const CONTRACTING_FORM_NAME = "contracting-inquiry";

export async function submitContractingInquiry(data: FormData): Promise<void> {
  const body = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === "string") body.set(key, value.trim());
  });
  body.set("form-name", CONTRACTING_FORM_NAME);

  const required = ["name", "email", "propertyCounty", "projectStage"];
  if (required.some((field) => !body.get(field))) {
    throw new Error(
      "Please enter your name, email, county, and project stage.",
    );
  }

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(
      "We couldn't send your inquiry. Please try again, email, or call us.",
    );
  }
}
