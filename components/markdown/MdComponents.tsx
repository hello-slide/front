/**********************************************************
 * markdown components.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Components} from 'react-markdown/src/ast-to-react';
import * as headers from './MdComponents/Headers';
import * as lists from './MdComponents/Lists';
import * as other from './MdComponents/Other';
import * as texts from './MdComponents/Texts';

export const components: Components = {
  h1: headers.H1,
  h2: headers.H2,
  h3: headers.H3,
  h4: headers.H4,
  h5: headers.H5,
  h6: headers.H6,
  p: texts.P,
  strong: texts.Strong,
  pre: texts.Pre,
  code: texts.Code,
  blockquote: texts.Quote,
  a: texts.Link,
  ul: lists.Ul,
  li: lists.Li,
  ol: lists.Ol,
  hr: other.Hr,
};
