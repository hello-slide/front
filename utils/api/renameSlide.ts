/**********************************************************
 * Rename slide API
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {AxiosRequestConfig} from 'axios';
import AbstractApiConnector, {RenameSlideAPI} from './abstractApiConnector';

export default class RenameSlide
  extends AbstractApiConnector
  implements RenameSlideAPI
{
  async run(slideId: string, name: string): Promise<void> {
    const config: AxiosRequestConfig = {
      url: '/slide/rename',
      method: 'post',
      baseURL: this.url,
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        SessionToken: this.sessionToken,
        SlideID: slideId,
        newName: name,
      }),
      responseType: 'json',
    };
    await this.connect(config);
  }
}
