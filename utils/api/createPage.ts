/**********************************************************
 * Create page api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {AxiosRequestConfig} from 'axios';
import {GetAPIPageData} from '../../@types/page';
import AbstractApiConnector, {CreatePageAPI} from './abstractApiConnector';

export default class CreatePage
  extends AbstractApiConnector
  implements CreatePageAPI
{
  async run(slideId: string, pageType: string): Promise<GetAPIPageData> {
    const config: AxiosRequestConfig = {
      url: '/slide/createpage',
      method: 'post',
      baseURL: this.url,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        SessionToken: this.sessionToken,
        SlideID: slideId,
        PageType: pageType,
      }),
      responseType: 'json',
    };

    const response = await this.connect(config);
    return response.data as GetAPIPageData;
  }
}
