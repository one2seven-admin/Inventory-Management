import { ApiError } from "@platform/contracts";
import { getAccessToken } from "../session/getAccessToken";
import { getGatewayClient } from "./gatewayClient";

/** Every authenticated Server Component/Action call goes through this — throws if there's no session. */
export async function getAuthedGatewayClient() {
  const accessToken = await getAccessToken();
  if (!accessToken) throw ApiError.unauthorized("No session — please log in");
  return getGatewayClient(accessToken);
}
