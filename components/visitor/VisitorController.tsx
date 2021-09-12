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

const VisitorController: React.FC<{id: string | string[]}> = ({id}) => {
  const [topic, setId, setAnswer] = useVisitorSocket();

  React.useEffect(() => {
    if (id && typeof id === 'string') {
      setId(id);
    }
  }, [id]);

  switch (topic?.t) {
    case 'q1':
      return <></>;
    case 'q2':
      return <></>;
    case 'qe':
      return <></>;
    default:
      return <Home />;
  }
};

export default VisitorController;
