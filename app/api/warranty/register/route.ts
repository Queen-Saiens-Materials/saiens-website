import { submitWarrantyRegistration } from "@/lib/warranty/api";

type RegistrationRequest = {
  token?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  registered_by?: unknown;
  proxy_name?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: RegistrationRequest;

  try {
    payload = (await request.json()) as RegistrationRequest;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const token = getString(payload.token);
  const name = getString(payload.name);
  const phone = getString(payload.phone);
  const email = getString(payload.email);
  const proxyName = getString(payload.proxy_name);
  const registeredBy = payload.registered_by;

  if (
    !token ||
    !name ||
    !phone ||
    !email ||
    (registeredBy !== "owner" && registeredBy !== "designer_proxy") ||
    (registeredBy === "designer_proxy" && !proxyName)
  ) {
    return Response.json({ error: "missing_required_fields" }, { status: 400 });
  }

  const result = await submitWarrantyRegistration({
    token,
    name,
    phone,
    email,
    registered_by: registeredBy,
    ...(registeredBy === "designer_proxy" ? { proxy_name: proxyName } : {}),
  });

  return Response.json(result.data, { status: result.status });
}
