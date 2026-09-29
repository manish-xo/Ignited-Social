import { NextRequest, NextResponse } from "next/server";

// Photon: free OpenStreetMap place search built for search-as-you-type, no API
// key. Override with LOCATION_SEARCH_API_URL (e.g. a self-hosted Photon).
const PHOTON_URL =
  process.env.LOCATION_SEARCH_API_URL ?? "https://photon.komoot.io/api/";

// Only places that make sense to target — not streets or house numbers.
const LAYERS = ["city", "district", "county", "state", "country"] as const;

export interface LocationResult {
  id: string; // OSM id, stable across searches
  name: string; // "Dharamshala"
  kind: "city" | "region" | "country";
  detail: string; // "Himachal Pradesh, India"
  label: string; // "Dharamshala, Himachal Pradesh, India" — what gets saved
  countryCode: string | null; // "IN"
}

const kindOf = (layer: string): LocationResult["kind"] =>
  layer === "country"
    ? "country"
    : layer === "state" || layer === "county"
      ? "region"
      : "city";

export async function GET(req: NextRequest) {
  const query = (req.nextUrl.searchParams.get("q") ?? "").trim();

  if (query.length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }

  const url = new URL(PHOTON_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "10");
  url.searchParams.set("lang", "en");
  for (const layer of LAYERS) url.searchParams.append("layer", layer);

  try {
    const res = await fetch(url, {
      // Photon's usage policy asks for an identifying User-Agent.
      headers: { "User-Agent": "sts-onboarding/1.0 (location targeting)" },
      signal: AbortSignal.timeout(10_000),
    });
    const body = await res.json().catch(() => null);

    if (!res.ok || !Array.isArray(body?.features)) {
      console.error("Location search failed:", { query, status: res.status });
      return NextResponse.json(
        { success: false, message: "Location search is unavailable right now." },
        { status: 502 },
      );
    }

    const seen = new Set<string>();
    const data: LocationResult[] = [];

    for (const feature of body.features) {
      const p = feature?.properties ?? {};
      if (!p.name) continue;

      const kind = kindOf(String(p.type ?? ""));
      const parts =
        kind === "country"
          ? []
          : [kind === "city" ? p.state : null, p.country].filter(
              (part): part is string => Boolean(part) && part !== p.name,
            );
      const label = [p.name, ...parts].join(", ");

      // OSM often has the same town as both a city and a district node.
      if (seen.has(label.toLowerCase())) continue;
      seen.add(label.toLowerCase());

      data.push({
        id: `${p.osm_type ?? ""}${p.osm_id ?? label}`,
        name: String(p.name),
        kind,
        detail:
          kind === "country"
            ? "Country"
            : parts.join(", ") || (kind === "region" ? "Region" : "City"),
        label,
        countryCode: p.countrycode ? String(p.countrycode).toUpperCase() : null,
      });
    }

    return NextResponse.json(
      { success: true, data },
      { headers: { "Cache-Control": "private, max-age=3600" } },
    );
  } catch (err) {
    console.error("Location search error:", { query, err });
    return NextResponse.json(
      { success: false, message: "Location search is unavailable right now." },
      { status: 502 },
    );
  }
}
