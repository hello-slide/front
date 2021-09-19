/**********************************************************
 * Delete all
 *
 * @author YutoWatanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractApiConnector, {DeleteAllAPI} from './abstractApiConnector';

export default class DeleteAll
  extends AbstractApiConnector
  implements DeleteAllAPI
{
  async run(): Promise<void> {
    await this.connect('', '/slide/deleteall');

    await this.connect('', '/account/delete');
  }
}
