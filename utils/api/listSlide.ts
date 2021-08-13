/**********************************************************
 * Show Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {AxiosRequestConfig} from 'axios';
import SlideConfig from '../../@types/slideApi';
import AbstractApiConnector, {ListSlidesAPI} from './abstractApiConnector';

export default class ListSlides
  extends AbstractApiConnector
  implements ListSlidesAPI
{
  async run(): Promise<SlideConfig> {
    const config: AxiosRequestConfig = {
      url: '/slide/list',
      method: 'post',
      baseURL: this.url,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        SessionToken: this.sessionToken,
      }),
      responseType: 'json',
    };

    const response = await this.connect(config);
    return response.data as SlideConfig;
  }
}
