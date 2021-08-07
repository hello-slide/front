/**********************************************************
 * Show Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig} from 'axios';
import SlideConfig from '../../@types/slideApi';

/**
 * Create Slide API
 *
 * @param {string} token - Session token
 * @returns {SlideConfig} - Slide data.
 */
export default async function listSlide(token: string): Promise<SlideConfig> {
  const config: AxiosRequestConfig = {
    url: '/slide/list',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      SessionToken: token,
    }),
    responseType: 'json',
  };

  const response = await axios(config);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data as SlideConfig;
}
