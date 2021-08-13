/**********************************************************
 * Delete logic
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig} from 'axios';

/**
 * delete account.
 *
 * @param {string} token - Login token
 */
export default async function deleteAccount(token: string) {
  const config: AxiosRequestConfig = {
    url: '/account/delete',
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

  await axios(config);
}
