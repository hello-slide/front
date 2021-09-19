/**********************************************************
 * websocket host core hooks.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import HostSocket from '../utils/socket/hostSocket';
import {IsHostSocketState, AnswersState} from '../utils/state/atom';

const useHostSocket = (): [
  string,
  number,
  React.Dispatch<React.SetStateAction<string>>,
  () => void
] => {
  const [id, setId] = React.useState('');
  const [visitor, setVisitor] = React.useState(0);
  const setAnswers = useSetRecoilState(AnswersState);
  const isHostSocket = useRecoilValue(IsHostSocketState);
  const [topic, setTopic] = React.useState('');
  const [init, setInit] = React.useState(false);
  const toast = useToast();

  const ref = React.useRef<HostSocket>();

  React.useEffect(() => {
    if (isHostSocket) {
      setTopic('');

      const socket = new HostSocket();

      socket.error(() => {
        toast({
          title: 'エラーによりコネクションが切断されました',
          status: 'error',
          isClosable: true,
        });
      });

      socket.get(data => {
        switch (data.type) {
          case '0':
            setId(data.id);
            break;
          case '2':
            setVisitor(parseInt(data.visitors));
            break;
          case '3':
            setAnswers(data.answers);
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

  const resetAnswers = () => {
    setAnswers([]);
  };

  return [id, visitor, setTopic, resetAnswers];
};

export default useHostSocket;
