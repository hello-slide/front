/**********************************************************
 * Delete all
 *
 * @author YutoWatanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractApiConnector, {DeleteAllAPI} from './abstractApiConnector';
import deleteAccount from './account/delete';

export default class DeleteAll
  extends AbstractApiConnector
  implements DeleteAllAPI
{
  async run(): Promise<void> {
    this.setConfig('/slide/deleteall', {});

    await this.connect();

    await deleteAccount(this.getRefreshToken());
  }
}
