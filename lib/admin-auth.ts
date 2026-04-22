import { createHmac, timingSafeEqual } from "crypto";

import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "vickooze_admin";

const TOKEN_VALUE = "admin";

export function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) {
    return process.env.ADMIN_PASSWORD;
  }

  if (process.env.NODE_ENV !== "production") {
    return "vickooze-local";
  }

  return null;
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "local-dev-session";
}

export function createAdminToken() {
  return createHmac("sha256", getSessionSecret()).update(TOKEN_VALUE).digest("hex");
}

function safeCompare(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
}

export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  return safeCompare(token, createAdminToken());
}

export function isValidAdminPassword(password: string) {
  const expected = getAdminPassword();

  if (!expected) {
    return false;
  }

  return safeCompare(password, expected);
}
