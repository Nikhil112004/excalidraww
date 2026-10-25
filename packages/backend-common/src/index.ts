const configuredJwtSecret = process.env.JWT_SECRET;

if (process.env.NODE_ENV === "production" && !configuredJwtSecret) {
  throw new Error("JWT_SECRET must be set in production");
}

export const JWT_SECRET = configuredJwtSecret || "123456";
