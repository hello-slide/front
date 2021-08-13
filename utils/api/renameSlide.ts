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
    this.setConfig('/slide/rename', {SlideID: slideId, newName: name});

    await this.connect();
  }
}
