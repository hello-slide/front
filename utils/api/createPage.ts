/**********************************************************
 * Create page api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig, AxiosError} from 'axios';
import {GetAPIPageData} from '../../@types/page';
import {updateToken} from './refresh';

/**
 * Create page API
 *
 * @param {string} token - Session token
 * @param {string} refreshToken - refresh token.
 * @param {string} slideId - id of slide.
 * @param {string} pageType - page type.
 * @param {(sessionToken: string, refreshToken: string, isFailed?: boolean) => void} updateFunc - Update function.
 * @returns {string} - Slide id.
 */
export default async function createPage(
  token: string,
  refreshToken: string,
  slideId: string,
  pageType: string,
  updateFunc: (
    sessionToken: string,
    refreshToken: string,
    isFailed?: boolean
  ) => void
): Promise<GetAPIPageData> {
  const config: AxiosRequestConfig = {
    url: '/slide/createpage',
    method: 'post',
    baseURL: 'https://api.hello-slide.jp/',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      SessionToken: token,
      SlideID: slideId,
      PageType: pageType,
    }),
    responseType: 'json',
  };

  try {
    const response = await axios(config);
    return response.data as GetAPIPageData;
  } catch (error) {
    if (
      (error as AxiosError).code === '401' ||
      (error as AxiosError).response.status === 401
    ) {
      const newToken = await updateToken(updateFunc, refreshToken);
      return await createPage(
        newToken,
        refreshToken,
        slideId,
        pageType,
        updateFunc
      );
    }
    throw new Error(
      (error as AxiosError).response.data || (error as AxiosError).message
    );
  }
}
