export const normalizeCatalogType = (value = "ALL") => {
  const normalizedValue = String(value).trim().toUpperCase();

  if (["RETAIL", "WHOLESALE", "ALL"].includes(normalizedValue)) {
    return normalizedValue;
  }

  return "ALL";
};

export const normalizeOrderMode = (value = "RETAIL") => {
  const normalizedValue = String(value).trim().toUpperCase();

  return normalizedValue === "WHOLESALE" ? "WHOLESALE" : "RETAIL";
};

export const buildOrderNumber = () => `ORD-${Date.now()}`;
