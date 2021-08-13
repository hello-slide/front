/**********************************************************
 * Delete all
 *
 * @author YutoWatanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {AxiosRequestConfig} from 'axios';
import AbstractApiConnector, {DeleteAllAPI} from './abstractApiConnector';
import deleteAccount from './account/delete';

export default class DeleteAll
  extends AbstractApiConnector
  implements DeleteAllAPI
{
  async run(): Promise<void> {
    const config: AxiosRequestConfig = {
      url: '/slide/deleteall',
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
    await this.connect(config);

    await deleteAccount(this.getRefreshToken());
  }
}
