/**********************************************************
 * Delete page api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {updateToken} from './refresh';

/**
 * Delete page API
 *
 * @param {string} token - Session token
 * @param {string} refreshToken - refresh token.
 * @param {string} slideId - id of slide.
 * @param {string} pageId - id of slide in page.
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 */
export default async function deletePage(
  token: string,
  refreshToken: string,
  slideId: string,
  pageId: string,
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void
) {
  const config: AxiosRequestConfig = {
    url: '/slide/deletepage',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      SessionToken: token,
      SlideID: slideId,
      PageID: pageId,
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
      await deletePage(newToken, refreshToken, slideId, pageId, updateFunc);
    }
    throw new Error(
      (error as AxiosError).response.data || (error as AxiosError).message
    );
  }
}
