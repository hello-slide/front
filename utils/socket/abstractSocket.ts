/**********************************************************
 * connect for websocket
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {ReqSocket, ResSocket} from '../../@types/socket';

export default abstract class AbstractSocketClient {
  protected url: string;

  protected socket: WebSocket;

  constructor(path: string) {
    const domain = process.env.NEXT_PUBLIC_API_DOMAIN || 'api.hello-slide.jp';

    this.url = `wss://${domain}${path}`;
    this.socket = new WebSocket(this.url);
  }

  /**
   * init send data.
   *
   * @param {string} data - send to data.
   */
  public initSend(data: ReqSocket) {
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify(data));
    };
  }

  /**
   * send data.
   *
   * @param {string} data - send to data.
   */
  public send(data: ReqSocket) {
    this.socket.send(JSON.stringify(data));
  }

  /**
   * Get the data.
   *
   * @param {(data: ResSocket) => void} fn - response func.
   */
  public get(fn: (data: ResSocket) => void) {
    this.socket.onmessage = event => {
      fn(JSON.parse(event.data) as ResSocket);
    };
  }

  /**
   * Close socket.
   */
  public close() {
    this.socket.close();
  }
}
