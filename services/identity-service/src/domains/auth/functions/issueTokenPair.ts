import { prisma } from "../../../db/client.js";
import { config } from "../../../config.js";
import { signAccessToken } from "../../../lib/signAccessToken.js";
import { generateOpaqueToken } from "../../../lib/generateOpaqueToken.js";
import { hashToken } from "../../../lib/hashToken.js";
import type { UserWithRelations } from "../../users/internal/userWithRelations.js";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export async function issueTokenPair(user: UserWithRelations): Promise<TokenPair> {
  const roles = user.roles.map((r) => r.role);
  const locationIds = user.locations.map((l) => l.locationId);

  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email,
    roles,
    locationIds,
  });

  const refreshToken = generateOpaqueToken();
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(refreshToken),
      expiresAt: new Date(Date.now() + config.refreshTokenTtlSeconds * 1000),
    },
  });

  return { accessToken, refreshToken };
}
