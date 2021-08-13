/**********************************************************
 * Delete page api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {AxiosRequestConfig} from 'axios';
import AbstractApiConnector, {DeletePageAPI} from './abstractApiConnector';

export default class DeletePage
  extends AbstractApiConnector
  implements DeletePageAPI
{
  async run(slideId: string, pageId: string): Promise<void> {
    const config: AxiosRequestConfig = {
      url: '/slide/deletepage',
      method: 'post',
      baseURL: this.url,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        SessionToken: this.sessionToken,
        SlideID: slideId,
        PageID: pageId,
      }),
      responseType: 'json',
    };
    await this.connect(config);
  }
}
