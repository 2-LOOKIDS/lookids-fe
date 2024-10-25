"use server";

import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
// import { Session } from "next-auth";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export const fetchDataforMembers = async <T>(
  apiUrl: string,
  method: HttpMethod = "GET",
  body?: any,
  requestCache?: RequestCache,
  tag?: string,
): Promise<T> => {
  "use server";
  const session: Session | null = await getServerSession();
  const token: string = session ? session.user.accessToken : "";
  const cache = requestCache || "no-cache";
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache,
  };
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  if (tag) {
    fetchOptions.next = { tags: [tag] };
  }
  const res = await fetch(apiUrl, fetchOptions);

  const data = (await res.json()) as T;
  return data;
};
