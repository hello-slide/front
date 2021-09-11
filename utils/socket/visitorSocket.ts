/**********************************************************
 * connect to visitor by websocket.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {ReqSocket} from '../../@types/socket';
import AbstractSocketClient from './abstractSocket';

export default class VisitorSocket extends AbstractSocketClient {
  constructor() {
    const path = '/sync/visitor';

    super(path);
  }

  public sendAnswer(answer: string, name: string) {
    const data: ReqSocket = {
      type: '6',
      answer: answer,
      name: name,
    };

    this.send(data);
  }
}
