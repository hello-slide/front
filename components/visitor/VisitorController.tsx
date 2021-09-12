/**********************************************************
 * visitor controller
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import useVisitorSocket from '../../hooks/useVisitorSocket';
import Home from './contents/Home';
import Load from './contents/Load';
import Quiz from './contents/Quiz';

const VisitorController: React.FC<{id: string | string[]}> = ({id}) => {
  const [topic, isEnd, setId, setAnswer] = useVisitorSocket();

  React.useEffect(() => {
    if (id && typeof id === 'string') {
      setId(id);
    }
  }, [id]);

  if (isEnd) {
    return <Home />;
  } else {
    switch (topic?.t) {
      case 'q1':
      case 'q2':
        return <Quiz topic={topic} setAns={setAnswer} />;
      case 'qe':
        return <></>;
      default:
        return <Load />;
    }
  }
};

export default VisitorController;
