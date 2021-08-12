/**********************************************************
 * Page List api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {GetAPIPages} from '../../@types/page';
import {updateToken} from './refresh';

/**
 * List Slide API
 *
 * @param {string} token - Session token
 * @param {string} refreshToken - refresh token.
 * @param {string} slideId - Slide id.
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 * @returns {GetAPIPages} - Slide data.
 */
export default async function listPage(
  token: string,
  refreshToken: string,
  slideId: string,
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void
): Promise<GetAPIPages> {
  const config: AxiosRequestConfig = {
    url: '/slide/details',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      SessionToken: token,
      SlideID: slideId,
    }),
    responseType: 'json',
  };

  try {
    const response = await axios(config);
    return response.data as GetAPIPages;
  } catch (error) {
    if (
      (error as AxiosError).code === '401' ||
      (error as AxiosError).response.status === 401
    ) {
      const newToken = await updateToken(updateFunc, refreshToken);
      return await listPage(newToken, refreshToken, slideId, updateFunc);
    }
    throw new Error(
      (error as AxiosError).response.data.status ||
        (error as AxiosError).message
    );
  }
}
