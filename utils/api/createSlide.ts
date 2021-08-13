/**********************************************************
 * Create Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {AxiosRequestConfig} from 'axios';
import AbstractApiConnector, {CreateSlideAPI} from './abstractApiConnector';

export default class CreateSlide
  extends AbstractApiConnector
  implements CreateSlideAPI
{
  async run(title: string): Promise<string> {
    const config: AxiosRequestConfig = {
      url: '/slide/create',
      method: 'post',
      baseURL: this.url,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        SessionToken: this.sessionToken,
        Title: title,
      }),
      responseType: 'json',
    };
    const response = await this.connect(config);
    return response.data['slide_id'];
  }
}
