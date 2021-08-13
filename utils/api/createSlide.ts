/**********************************************************
 * Create Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractApiConnector, {CreateSlideAPI} from './abstractApiConnector';

export default class CreateSlide
  extends AbstractApiConnector
  implements CreateSlideAPI
{
  async run(title: string): Promise<string> {
    this.setConfig('/slide/create', {Title: title});

    const response = await this.connect();
    return response.data['slide_id'];
  }
}
