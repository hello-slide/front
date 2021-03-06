/**********************************************************
 * visitor socket hooks.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import React from 'react';
import {Topic, VisitorAns} from '../@types/socket';
import VisitorSocket from '../utils/socket/visitorSocket';

const useVisitorSocket = (): [
  Topic,
  boolean,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<VisitorAns>>
] => {
  const [topic, setTopic] = React.useState<Topic>();
  const [answer, setAnswer] = React.useState<VisitorAns>();
  const [init, setInit] = React.useState(false);
  const [id, setId] = React.useState('');
  const [isEnd, setIsEnd] = React.useState(false);
  const toast = useToast();

  const ref = React.useRef<VisitorSocket>();

  React.useEffect(() => {
    if (id) {
      const socket = new VisitorSocket();

      socket.error(() => {
        toast({
          title: 'エラーによりコネクションが切断されました',
          status: 'error',
          isClosable: true,
        });
      });

      socket.end(() => {
        setIsEnd(true);
        toast({
          title: 'コネクションが終了しました',
          status: 'info',
          isClosable: true,
        });
      });

      socket.get(data => {
        switch (data.type) {
          case '1':
            break;
          case '5':
            if (data.topic) {
              setTopic(JSON.parse(data.topic) as Topic);
            }
            break;
        }
      });

      socket.initSend({
        type: '1',
        id: id,
      });

      setInit(true);
      ref.current = socket;
    }
  }, [id]);

  React.useEffect(() => {
    if (ref.current && answer && init) {
      ref.current.sendAnswer(answer);
    }
  }, [answer]);

  return [topic, isEnd, setId, setAnswer];
};

export default useVisitorSocket;
