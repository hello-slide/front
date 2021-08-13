/**********************************************************
 * Create page api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {GetAPIPageData} from '../../@types/page';
import AbstractApiConnector, {CreatePageAPI} from './abstractApiConnector';

export default class CreatePage
  extends AbstractApiConnector
  implements CreatePageAPI
{
  async run(slideId: string, pageType: string): Promise<GetAPIPageData> {
    this.setConfig('/slide/createpage', {SlideID: slideId, PageType: pageType});

    const response = await this.connect();
    return response.data as GetAPIPageData;
  }
}
