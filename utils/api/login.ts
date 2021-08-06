/**********************************************************
 * Api Login
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig} from 'axios';

export interface Login {
  refreshToken: string;
  sessionToken: string;
}
/**
 * Connect to backend. login.
 *
 * @param {string} token - Google OAuth id token.
 * @returns {Login} - User data.
 */
export default async function login(token: string): Promise<Login> {
  const config: AxiosRequestConfig = {
    url: '/account/login',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      Token: token,
    }),
    responseType: 'json',
  };

  const response = await axios(config);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return {
    refreshToken: response.data['refresh_token'],
    sessionToken: response.data['session_token'],
  };
}
