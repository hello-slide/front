/**********************************************************
 * Get user data.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {UserData} from '../../@types/userData';
import AbstractApiConnector, {UserAPI} from './abstractApiConnector';

export default class User extends AbstractApiConnector implements UserAPI {
  async run(): Promise<UserData> {
    const response = await this.connect('', '/account/user');

    return (await response.json()) as UserData;
  }
}
