import { ApiError, type LoginInput, type LoginResult } from "@platform/contracts";
import { prisma } from "../../../db/client.js";
import { verifyPassword } from "../../../lib/verifyPassword.js";
import { userWithRelationsInclude } from "../../users/internal/userWithRelations.js";
import { mapUserToDto } from "../../users/internal/mapUserToDto.js";
import { issueTokenPair } from "./issueTokenPair.js";

export async function login(input: LoginInput): Promise<LoginResult> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
    include: userWithRelationsInclude,
  });

  if (!user || !user.isActive) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const passwordMatches = await verifyPassword(input.password, user.passwordHash);
  if (!passwordMatches) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const { accessToken, refreshToken } = await issueTokenPair(user);

  return { accessToken, refreshToken, user: mapUserToDto(user) };
}
