/**********************************************************
 * Logout api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractApiConnector, {LogoutAPI} from './abstractApiConnector';

export default class Logout extends AbstractApiConnector implements LogoutAPI {
  async run(): Promise<void> {
    await this.connect('', '/account/logout');
  }
}
