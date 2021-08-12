/**********************************************************
 * Rename slide API
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {updateToken} from './refresh';

/**
 * Rename Slide API
 *
 * @param {string} slideId - Slide id.
 * @param {string} newName - new slide name.
 * @param {string} token - Session token
 * @param {string} refreshToken - refresh token.
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 */
export default async function renameSlide(
  slideId: string,
  newName: string,
  token: string,
  refreshToken: string,
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void
) {
  const config: AxiosRequestConfig = {
    url: '/slide/rename',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      SessionToken: token,
      SlideID: slideId,
      newName: newName,
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
      const newToken = await updateToken(updateFunc, refreshToken);
      await renameSlide(slideId, newName, newToken, refreshToken, updateFunc);
    }
    throw new Error(
      (error as AxiosError).response.data.status ||
        (error as AxiosError).message
    );
  }
}
