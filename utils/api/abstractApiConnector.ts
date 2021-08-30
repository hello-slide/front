/**********************************************************
 * Abstract API Connecter.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {GetAPIPageData} from '../../@types/page';
import {GetAPIPages} from '../../@types/page';
import SlidePageData from '../../@types/pageItem';
import SlideConfig from '../../@types/slideApi';
import {UserData} from '../../@types/userData';
import {domain} from './links';
export default abstract class AbstractApiConnector {
  private apiUrl: string;

  constructor() {
    this.apiUrl = `https://${domain}`;
  }

  /**
   * Connect to API
   *
   * @param {string} data - send data.
   * @param {string} apiPath -api path.
   * @param {boolean} isUpdate - Whether it is an API for updating tokens. If true, the body will be sent empty.
   * @returns {Promise<Response>} - response data.
   */
  protected async connect(
    data: string,
    apiPath: string,
    isUpdate?: boolean
  ): Promise<Response> {
    const response = await fetch(`${this.apiUrl}${apiPath}`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: isUpdate ? '' : data,
    });

    if (response.status === 301) {
      const redirectUrl = response.headers.get('location');
      let isUpdate = false;
      if (redirectUrl.split('/').pop() === 'update') {
        isUpdate = true;
      }
      this.connect(data, apiPath, isUpdate);
    }

    if (!response.ok) {
      throw new Error((await response.json())['status']);
    }

    return response;
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

export interface SetPageAPI {
  /**
   * Set the slide page.
   *
   * @param {SlidePageData} slideData - slide page data.
   */
  run(slideId: string, pageId: string, slideData: SlidePageData): Promise<void>;
}

export interface GetPageAPI {
  /**
   * Get the slide page.
   *
   * @param {string} slideId - Id of slide.
   * @param {string} pageId - Id of pages.
   * @returns {Promise<SlidePageData>} - Page data.
   */
  run<T = SlidePageData>(
    slideId: string,
    pageId: string
  ): Promise<T | undefined>;
}

export interface LogoutAPI {
  /**
   * Logout.
   */
  run(): Promise<void>;
}

export interface UserAPI {
  /**
   * Get user data.
   */
  run(): Promise<UserData>;
}
