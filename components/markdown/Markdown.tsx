/**********************************************************
 * Markdown effects.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import ReactMarkdown from 'react-markdown';
import {components} from './MdComponents';

const Markdown: React.FC<{text: string}> = ({text}) => {
  return <ReactMarkdown components={components}>{text}</ReactMarkdown>;
};

export default Markdown;
