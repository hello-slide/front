/**********************************************************
 * Slide API
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

export default interface SlideConfig {
  user_id: string;
  number_of_slides: string;
  slides: SlideContent[];
}

export interface SlideContent {
  title: string;
  id: string;
  create_date: string;
  change_date: string;
}
