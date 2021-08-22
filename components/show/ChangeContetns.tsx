/**********************************************************
 * Change slide contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';

import OpExplanation from './contents/common/OpExplanation';
import QrCode from './contents/common/QrCode';

const ChangeContents: React.FC<{index: number}> = props => {
  switch (props.index) {
    case 0:
      return <OpExplanation />;
    case 1:
      return <QrCode />;
    default:
      return <>{props.children}</>;
  }
};

export default ChangeContents;
