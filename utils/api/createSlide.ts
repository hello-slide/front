/**********************************************************
 * Create Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {updateToken} from './refresh';

/**
 * Create Slide API
 *
 * @param {string} token - Session token
 * @param {string} title - Slide title.
 * @param {string} refreshToken - refresh token.
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 * @returns {string} - Slide id.
 */
export default async function createSlide(
  token: string,
  title: string,
  refreshToken: string,
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void
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

  try {
    const response = await axios(config);
    return response.data['slide_id'];
  } catch (error) {
    if (
      (error as AxiosError).code === '401' ||
      (error as AxiosError).response.status === 401
    ) {
      const newToken = await updateToken(updateFunc, refreshToken);
      return await createSlide(newToken, title, refreshToken, updateFunc);
    }
    throw new Error(
      (error as AxiosError).response.data || (error as AxiosError).message
    );
  }
}
