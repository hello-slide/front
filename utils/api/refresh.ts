/**********************************************************
 * Update token.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig} from 'axios';

/**
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 * @param {string} refreshToken - refresh token.
 * @returns {string} - Session token.
 */
export async function updateToken(
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void,
  refreshToken: string
): Promise<string> {
  const config: AxiosRequestConfig = {
    url: '/account/update',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      LoginToken: refreshToken,
    }),
    responseType: 'json',
  };

  try {
    const response = await axios(config);

    updateFunc(response.data['session_token'], response.data['refresh_token']);
    return response.data['session_token'];
  } catch (error) {
    updateFunc('', '', true);
    throw new Error(error);
  }
}
