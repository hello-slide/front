/**********************************************************
 * Show Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import SlideConfig from '../../@types/slideApi';
import {updateToken} from './refresh';

/**
 * List Slide API
 *
 * @param {string} token - Session token
 * @param {string} refreshToken - refresh token.
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 * @returns {SlideConfig} - Slide data.
 */
export default async function listSlide(
  token: string,
  refreshToken: string,
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void
): Promise<SlideConfig> {
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

  try {
    const response = await axios(config);
    return response.data as SlideConfig;
  } catch (error) {
    if (
      (error as AxiosError).code === '401' ||
      (error as AxiosError).response.status === 401
    ) {
      const newToken = await updateToken(updateFunc, refreshToken);
      return await listSlide(newToken, refreshToken, updateFunc);
    }
    throw new Error(
      (error as AxiosError).response.data || (error as AxiosError).message
    );
  }
}
