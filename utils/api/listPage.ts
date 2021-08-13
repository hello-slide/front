/**********************************************************
 * Page List api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {AxiosRequestConfig} from 'axios';
import {GetAPIPages} from '../../@types/page';
import AbstractApiConnector, {ListPagesAPI} from './abstractApiConnector';

export default class ListPages
  extends AbstractApiConnector
  implements ListPagesAPI
{
  async run(slideId: string): Promise<GetAPIPages> {
    const config: AxiosRequestConfig = {
      url: '/slide/details',
      method: 'post',
      baseURL: this.url,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        SessionToken: this.sessionToken,
        SlideID: slideId,
      }),
      responseType: 'json',
    };

    const response = await this.connect(config);
    return response.data as GetAPIPages;
  }
}
