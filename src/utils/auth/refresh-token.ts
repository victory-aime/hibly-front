import axios from 'axios';
import { APIS } from '_store/endpoints';

export async function refreshAccessToken(refresh_token: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(APIS(baseUrl).AUTH.REFRESH.url, {
      refresh_token,
    });

    const data = res.data;

    if (!data?.access_token || !data?.refresh_token) {
      throw new Error('Invalid token refresh response');
    }

    console.log('Refreshed token:', data);
    return data;
  } catch (error) {
    console.error('Failed to refresh token', error);
    return null;
  }
}
