/**********************************************************
 * Delete page api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractApiConnector, {DeletePageAPI} from './abstractApiConnector';

export default class DeletePage
  extends AbstractApiConnector
  implements DeletePageAPI
{
  async run(slideId: string, pageId: string): Promise<void> {
    this.setConfig('/slide/deletepage', {SlideID: slideId, PageID: pageId});

    await this.connect();
  }
}
