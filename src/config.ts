export const API_URL = import.meta.env.DEV
  ? "" // Will be handled by direct call in dev
  : ""; // Production uses same domain

export const IS_DEV = import.meta.env.DEV;
