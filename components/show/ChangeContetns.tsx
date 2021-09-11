/**********************************************************
 * Change slide contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import Page from '../../@types/page';
import useHostSocket from '../../hooks/useHostSocket';

import End from './contents/common/End';
import OpExplanation from './contents/common/OpExplanation';
import QrCode from './contents/common/QrCode';
import Question from './contents/question/Qustion';
import QuizFirst from './contents/quiz/QuizFirst';
import QuizSecond from './contents/quiz/QuizSecond';

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'hello-slide.jp';

const ChangeContents: React.FC<{index: number; pageList: Page[]}> = props => {
  const [id, visitor, setTopic] = useHostSocket();
  const link = (id && `https://${domain}/v?id=${id}`) || '(  ´∀｀)＜ぬるぽ';

  const Pages = (index: number) => {
    switch (props.pageList[index]?.type) {
      case 'quiz1':
        return (
          <QuizFirst
            id={props.pageList[index].id}
            setTopic={setTopic}
            visitor={visitor}
            link={link}
          />
        );
      case 'quiz2':
        return (
          <QuizSecond
            id={props.pageList[index].id}
            setTopic={setTopic}
            visitor={visitor}
            link={link}
          />
        );
      case 'question':
        return (
          <Question
            id={props.pageList[index].id}
            setTopic={setTopic}
            visitor={visitor}
            link={link}
          />
        );
      default:
        return <End />;
    }
  };

  switch (props.index) {
    case 0:
      return <OpExplanation />;
    case 1:
      return <QrCode link={link} visitor={visitor} />;
    default:
      return Pages(props.index - 2);
  }
};

export default ChangeContents;
