/**********************************************************
 * Show Slide APi
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import SlideConfig from '../../@types/slideApi';
import AbstractApiConnector, {ListSlidesAPI} from './abstractApiConnector';

export default class ListSlides
  extends AbstractApiConnector
  implements ListSlidesAPI
{
  async run(): Promise<SlideConfig> {
    const response = await this.connect('', '/slide/list');
    return (await response.json()) as SlideConfig;
  }
}
