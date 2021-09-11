/**********************************************************
 * websocket host core hooks.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import HostSocket from '../utils/socket/hostSocket';
import {IsHostSocketState, AnswersState} from '../utils/state/atom';

const useHostSocket = (): [
  string,
  number,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [id, setId] = React.useState('');
  const [visitor, setVisitor] = React.useState(0);
  const setAnswers = useSetRecoilState(AnswersState);
  const isHostSocket = useRecoilValue(IsHostSocketState);
  const [topic, setTopic] = React.useState('');
  const [init, setInit] = React.useState(false);

  const ref = React.useRef<HostSocket>();

  React.useEffect(() => {
    if (isHostSocket) {
      setTopic('');

      const socket = new HostSocket();

      socket.get(data => {
        switch (data.type) {
          case '0':
            setId(data.id);
            break;
          case '2':
            setVisitor(parseInt(data.visitors));
            break;
          case '3':
            setAnswers(value => {
              return value.concat(data.answers);
            });
            break;
        }
      });

      socket.initSend({
        type: '0',
      });

      setInit(true);
      ref.current = socket;
    } else {
      if (ref.current) {
        ref.current.close();
      }
    }

    return () => {
      if (ref.current) {
        ref.current.close();
      }
    };
  }, [isHostSocket]);

  React.useEffect(() => {
    if (isHostSocket && ref.current && topic.length !== 0 && init) {
      ref.current.sendNewTopic(topic);
    }
  }, [isHostSocket, topic]);

  return [id, visitor, setTopic];
};

export default useHostSocket;
