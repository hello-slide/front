/**********************************************************
 * Delete Slide APi
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
 * @param {string} id - Slide id.
 * @param {string} refreshToken - refresh token.
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 */
export default async function deleteSlide(
  token: string,
  id: string,
  refreshToken: string,
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void
) {
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

  try {
    await axios(config);
  } catch (error) {
    if (
      (error as AxiosError).code === '401' ||
      (error as AxiosError).response.status === 401
    ) {
      await updateToken(updateFunc, refreshToken);
      deleteSlide(token, id, refreshToken, updateFunc);
    }
    throw new Error(
      (error as AxiosError).response.data || (error as AxiosError).message
    );
  }
}
