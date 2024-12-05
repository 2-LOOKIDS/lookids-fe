import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

interface VerifyPasswordParams {
  verification: true;
}
export async function verifyPassword(
  password: string
): Promise<VerifyPasswordParams> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<VerifyPasswordParams>
    >('auth-service/auth/verify-password', 'POST', password, 'no-cache');
    return data.result;
  } catch (error) {
    console.error('verifyPassword error', error);
    throw Error('verifyPassword error');
  }
}

//export async function findIdByEmail()
