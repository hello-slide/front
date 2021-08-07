/**********************************************************
 * Delete Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig} from 'axios';

/**
 * Create Slide API
 *
 * @param {string} token - Session token
 * @param {string} id - Slide id.
 */
export default async function deleteSlide(token: string, id: string) {
  const config: AxiosRequestConfig = {
    url: '/slide/delete',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      SessionToken: token,
      SlideID: id,
    }),
    responseType: 'json',
  };

  const response = await axios(config);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
}
