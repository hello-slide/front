/**********************************************************
 * Page type
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import Slide from './slides';

export default interface Page {
  id: string;
  type: string;
}

export interface GetAPIPage extends Slide {
  number_of_pages: string;
  pages: {
    page_id: string;
    type: string;
  }[];
}
