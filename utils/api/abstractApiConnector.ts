/**********************************************************
 * Abstract API Connecter.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import axios, {AxiosRequestConfig, AxiosError, AxiosPromise} from 'axios';
import {GetAPIPageData} from '../../@types/page';
import {GetAPIPages} from '../../@types/page';
import SlideConfig from '../../@types/slideApi';

type UpgradeTokenFunc = (
  sessionToken: string,
  refreshToken: string,
  isFailed?: boolean
) => void;

export default abstract class AbstractApiConnector {
  protected sessionToken: string;
  protected url = 'https://api.hello-slide.jp/';

  private refreshToken: string;
  private _upgradeToken: UpgradeTokenFunc;

  /**
   * @param {string} sessionToken - Token of session token.
   * @param {string} refreshToken - Token of refresh token.
   * @param {UpgradeTokenFunc} upgradeToken - A function that is called when the session token is updated.
   */
  constructor(
    sessionToken: string,
    refreshToken: string,
    upgradeToken: UpgradeTokenFunc
  ) {
    this.sessionToken = sessionToken;
    this.refreshToken = refreshToken;
    this._upgradeToken = upgradeToken;
  }

  /**
   * Update to Session token using the Refresh token.
   */
  protected async updateToken() {
    const config: AxiosRequestConfig = {
      url: '/account/update',
      method: 'post',
      baseURL: this.url,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        LoginToken: this.refreshToken,
      }),
      responseType: 'json',
    };

    try {
      const response = await axios(config);

      this._upgradeToken(
        response.data['session_token'],
        response.data['refresh_token']
      );

      this.sessionToken = response.data['session_token'];
      this.refreshToken = response.data['refresh_token'];
    } catch (error) {
      this._upgradeToken('', '', true);
      throw new Error((error as AxiosError).response.data || error);
    }
  }

  /**
   * Connect to API
   *
   * @param {AxiosRequestConfig} config - axios config data.
   * @returns {Promise<AxiosPromise>} - response data.
   */
  protected async connect(config: AxiosRequestConfig): Promise<AxiosPromise> {
    try {
      return await axios(config);
    } catch (_error) {
      const error = _error as AxiosError;

      // If status_code is 2, the session token has timed out.
      // Re-acquire the session token using the refresh token.
      if (error.response.data.status_code === 2) {
        await this.updateToken();
        return await this.connect(config);
      }
    }
  }

  /**
   * Get refresh token.
   *
   * @returns {string} - Refresh Token
   */
  getRefreshToken(): string {
    return this.refreshToken;
  }
}

export interface CreatePageAPI {
  /**
   * Create pages
   *
   * @param {string} slideId - Id of slide.
   * @param {string} pageType - Page type. example: 'quiz', 'question'...
   */
  run(slideId: string, pageType: string): Promise<GetAPIPageData>;
}

export interface CreateSlideAPI {
  /**
   * Create slide
   *
   * @param {string} title - Slide name.
   * @returns {Promise<string>} - Slide id.
   */
  run(title: string): Promise<string>;
}

export interface DeletePageAPI {
  /**
   * Delete pages
   *
   * @param {string} slideId - Id of slide.
   * @param {string} pageId - Id of page.
   */
  run(slideId: string, pageId: string): Promise<void>;
}

export interface DeleteSlideAPI {
  /**
   * Delete slides
   *
   * @param {string} slideId - Id of slide.
   */
  run(slideId: string): Promise<void>;
}

export interface ListPagesAPI {
  /**
   * List pages
   *
   * @param {string} slideId - Id of slide.
   * @returns {Promise<GetAPIPages>} - Pages list.
   */
  run(slideId: string): Promise<GetAPIPages>;
}

export interface ListSlidesAPI {
  /**
   * List slides
   *
   * @returns {Promise<SlideConfig>} - Slides list.
   */
  run(): Promise<SlideConfig>;
}

export interface RenameSlideAPI {
  /**
   * Rename slide
   *
   * @param {string} slideId - Id of slide.
   * @param {string} name - New slide name.
   */
  run(slideId: string, name: string): Promise<void>;
}

export interface DeleteAllAPI {
  /**
   * Delete all than:
   * - All slides.
   * - All pages.
   */
  run(): Promise<void>;
}
