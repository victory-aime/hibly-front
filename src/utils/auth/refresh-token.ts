import axios from 'axios';
import { APIS } from '_store/endpoints';

export async function refreshAccessToken(refresh_token: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await axios.post(APIS(baseUrl).AUTH.REFRESH.url, {
      refresh_token: refresh_token ,

    },);
    const data = await res.data();
    return data;
  } catch (error) {
    console.error('Failed to refresh token', error);
  }
}
