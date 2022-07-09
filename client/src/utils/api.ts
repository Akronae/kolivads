if (!process.env.REACT_APP_KOLIVADS_API_URL) {
  throw new Error('REACT_APP_KOLIVADS_API_URL needs to be set');
}
export const KolivadsApiUrl: string = process.env.REACT_APP_KOLIVADS_API_URL;
