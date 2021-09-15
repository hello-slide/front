/**********************************************************
 * visitor controller
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import {useSetRecoilState} from 'recoil';
import useVisitorSocket from '../../hooks/useVisitorSocket';
import {LoadState} from '../../utils/state/atom';
import Home from './contents/Home';
import Load from './contents/Load';
import Question from './contents/Question';
import Quiz from './contents/Quiz';

const VisitorController: React.FC<{id: string | string[]}> = ({id}) => {
  const [topic, isEnd, setId, setAnswer] = useVisitorSocket();
  const setLoad = useSetRecoilState(LoadState);

  React.useEffect(() => {
    if (id && typeof id === 'string') {
      setId(id);
    }
  }, [id]);

  React.useEffect(() => {
    let isMount = true;
    if (!topic?.a) {
      setLoad(true);

      setTimeout(() => {
        if (isMount) {
          setLoad(false);
        }
      }, 1000);
    }

    return () => {
      setLoad(false);
      isMount = false;
    };
  }, [topic]);

  if (isEnd) {
    return <Home />;
  } else {
    switch (topic?.t) {
      case 'q1':
      case 'q2':
        return <Quiz topic={topic} setAns={setAnswer} />;
      case 'qe':
        return <Question topic={topic} setAns={setAnswer} />;
      default:
        return <Load />;
    }
  }
};

export default VisitorController;
