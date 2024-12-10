'use server';

import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { options } from '../../app/api/auth/[...nextauth]/options';
// import { Session } from "next-auth";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const fetchDataforMembers = async <T>(
  apiUrl: string,
  method: HttpMethod = 'GET',
  body?: any,
  requestCache?: RequestCache,
  tag?: string
): Promise<T> => {
  'use server';
  const session: Session | null = await getServerSession(options);
  const token: string = session ? session.user.accessToken : '';
  const cache = requestCache || 'no-cache';
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Uuid': session?.user.uuid || '1',
    },
    cache,
  };
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  if (tag) {
    fetchOptions.next = { tags: [tag] };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/${apiUrl}`, fetchOptions);

  const data = (await res.json()) as T;
  return data;
};

export const fetchDataforCommon = async <T>(
  apiUrl: string,
  method: HttpMethod = 'GET',
  body?: any,
  requestCache?: RequestCache,
  tag?: string
): Promise<T> => {
  'use server';
  const cache = requestCache || 'no-cache';
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    cache,
  };
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  if (tag) {
    fetchOptions.next = { tags: [tag] };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/${apiUrl}`, fetchOptions);

  const data = (await res.json()) as T;
  return data;
};
