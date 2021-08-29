/**********************************************************
 * Page List api
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {GetAPIPages} from '../../@types/page';
import AbstractApiConnector, {ListPagesAPI} from './abstractApiConnector';

export default class ListPages
  extends AbstractApiConnector
  implements ListPagesAPI
{
  async run(slideId: string): Promise<GetAPIPages> {
    const response = await this.connect(
      JSON.stringify({SlideID: slideId}),
      '/slide/details'
    );
    return (await response.json()) as GetAPIPages;
  }
}
