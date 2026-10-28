export async function submitContact(data: FormData): Promise<void> {
  const body = new URLSearchParams();
  data.forEach((value, name) => {
    if (typeof value === "string") body.set(name, value.trim());
  });
  body.set("form-name", "contact");
  if (["name", "email", "phone", "message"].some((field) => !body.get(field))) {
    throw new Error(
      "Please enter your name, email, phone number, and message.",
    );
  }
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!response.ok)
    throw new Error(
      "We couldn’t send your message. Please try again or call (904) 325-6275.",
    );
}
