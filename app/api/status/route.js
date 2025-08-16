import axios from "axios";

const DOMAINS = [
  { name: "JesseJesse.com", url: "https://jessejesse.com" },
  { name: "JJroper.web.app", url: "https://jjroper.web.app" },
  { name: "sudo-self.com", url: "https://sudo-self.com" },
];

export async function GET() {
  const results = await Promise.all(
    DOMAINS.map(async (domain) => {
      try {
        const response = await axios.get(domain.url, { timeout: 5000 });
        return { ...domain, status: response.status === 200 ? "online" : "offline" };
      } catch {
        return { ...domain, status: "offline" };
      }
    })
  );

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
