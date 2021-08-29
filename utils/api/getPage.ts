/**********************************************************
 * Get Slide page data.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import SlidePageData from '../../@types/pageItem';
import AbstractApiConnector, {GetPageAPI} from './abstractApiConnector';

export default class GetPage
  extends AbstractApiConnector
  implements GetPageAPI
{
  async run<T = SlidePageData>(
    slideId: string,
    pageId: string
  ): Promise<T | undefined> {
    const response = await this.connect(
      JSON.stringify({
        SlideID: slideId,
        PageID: pageId,
      }),
      '/slide/getpage'
    );
    const data = await response.json();

    if (data) {
      return data as T;
    }
  }
}
