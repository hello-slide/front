/**********************************************************
 * Create Slide APi
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
 * @param {string} token - Google OAuth id token.
 * @param {string} title - Slide title.
 * @returns {string} - Slide id.
 */
export default async function createSlide(
  token: string,
  title: string
): Promise<string> {
  const config: AxiosRequestConfig = {
    url: '/slide/create',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      SessionToken: token,
      Title: title,
    }),
    responseType: 'json',
  };

  const response = await axios(config);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data['slide_id'];
}
