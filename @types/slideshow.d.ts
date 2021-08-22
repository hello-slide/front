/**********************************************************
 * slideshow state.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import Slide from './slides';

export default interface Slideshow extends Slide {
  session: string;
}
