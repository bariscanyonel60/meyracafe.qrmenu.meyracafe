export function normalizeSearchQuery(query: string): string {
  if (!query) return "";
  return query.trim().toLocaleLowerCase("tr-TR");
}

export function matchProduct(productName: string, query: string): boolean {
  const normName = normalizeSearchQuery(productName);
  const normQuery = normalizeSearchQuery(query);
  return normName.includes(normQuery);
}
