/**********************************************************
 * slideshow state.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import SlidePageData from './pageItem';
import Slide from './slides';

export interface Slideshow extends Slide {
  data: {
    key: string;
    value: SlidePageData;
  }[];
}
