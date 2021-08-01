/**********************************************************
 * Logout logic
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig} from 'axios';

/**
 * Logout.
 *
 * @param {string} token - Login token
 */
export default async function logout(token: string) {
  const config: AxiosRequestConfig = {
    url: '/account/login',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      LoginToken: token,
    }),
    responseType: 'json',
  };

  const response = await axios(config);
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
}
