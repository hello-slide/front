/**********************************************************
 * Rename slide API
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import AbstractApiConnector, {RenameSlideAPI} from './abstractApiConnector';

export default class RenameSlide
  extends AbstractApiConnector
  implements RenameSlideAPI
{
  async run(slideId: string, name: string): Promise<void> {
    await this.connect(
      JSON.stringify({SlideID: slideId, newName: name}),
      '/slide/rename'
    );
  }
}
