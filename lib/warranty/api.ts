type WarrantyApiResult<T> = {
  ok: boolean;
  status: number;
  data: T | { error: string };
};

export type VerifyWarrantyData =
  | {
      status: "valid";
      address: string;
      warranty_years: number;
    }
  | {
      status: "already_registered";
      registered_at: string;
    }
  | {
      error: string;
    };

export type WarrantyRegistrationPayload = {
  token: string;
  name: string;
  phone: string;
  email: string;
  registered_by: "owner" | "designer_proxy";
  proxy_name?: string;
};

export type SubmitWarrantyData =
  | {
      status: "ok";
    }
  | {
      error: string;
    };

const DEFAULT_ODOO_API_URL = "https://quote.saiens.tw";

function getOdooApiUrl() {
  return (process.env.ODOO_API_URL ?? DEFAULT_ODOO_API_URL).replace(/\/$/, "");
}

async function parseJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return { error: "invalid_response" };
  }
}

export async function verifyWarrantyToken(
  token: string,
): Promise<WarrantyApiResult<VerifyWarrantyData>> {
  try {
    const url = new URL("/api/saiens/warranty/verify", getOdooApiUrl());
    url.searchParams.set("token", token);

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    const data = (await parseJson(response)) as VerifyWarrantyData;

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch {
    return {
      ok: false,
      status: 503,
      data: { error: "network_error" },
    };
  }
}

export async function submitWarrantyRegistration(
  data: WarrantyRegistrationPayload,
): Promise<WarrantyApiResult<SubmitWarrantyData>> {
  try {
    const response = await fetch(`${getOdooApiUrl()}/api/saiens/warranty/register`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = (await parseJson(response)) as SubmitWarrantyData;

    return {
      ok: response.ok,
      status: response.status,
      data: responseData,
    };
  } catch {
    return {
      ok: false,
      status: 503,
      data: { error: "network_error" },
    };
  }
}
