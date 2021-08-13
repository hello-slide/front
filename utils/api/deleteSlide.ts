/**********************************************************
 * Delete Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractApiConnector, {DeletePageAPI} from './abstractApiConnector';

export default class DeleteSlide
  extends AbstractApiConnector
  implements DeletePageAPI
{
  async run(slideId: string): Promise<void> {
    this.setConfig('/slide/delete', {SlideID: slideId});

    await this.connect();
  }
}
