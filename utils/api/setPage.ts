/**********************************************************
 * Set Slide page data.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import SlidePageData from '../../@types/pageItem';
import AbstractApiConnector, {SetPageAPI} from './abstractApiConnector';

export default class SetPage
  extends AbstractApiConnector
  implements SetPageAPI
{
  async run(
    slideId: string,
    pageId: string,
    slideData: SlidePageData
  ): Promise<void> {
    await this.connect(
      JSON.stringify({
        SlideID: slideId,
        PageID: pageId,
        Data: JSON.stringify(slideData),
      }),
      '/slide/setpage'
    );
  }
}
