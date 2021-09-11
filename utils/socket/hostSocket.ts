/**********************************************************
 * connect to host by websocket.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {ReqSocket} from '../../@types/socket';
import AbstractSocketClient from './abstractSocket';

export default class HostSocket extends AbstractSocketClient {
  constructor() {
    const path = '/sync/host';

    super(path);
  }

  public sendNewTopic(topic: string) {
    const data: ReqSocket = {
      type: '4',
      topic: topic,
    };

    this.send(data);
  }
}
