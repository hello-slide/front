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
 * @param {(sessionToken: string, refreshToken: string) => void} updateFunc - Update function.
 * @param {string} refreshToken - refresh token.
 */
export async function updateToken(
  updateFunc: (sessionToken: string, refreshToken: string) => void,
  refreshToken: string
) {
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

  const response = await axios(config);

  updateFunc(response['session_token'], response['refresh_token']);
}
