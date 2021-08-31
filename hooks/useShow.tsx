/**********************************************************
 * Start presentation custom hooks.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import React from 'react';
import {useSetRecoilState} from 'recoil';
import screenfull from 'screenfull';
import {ShowState} from '../utils/state/atom';

const useShow = (
  ref: React.MutableRefObject<undefined>
): ((id: string) => void) => {
  const setShow = useSetRecoilState(ShowState);
  const toast = useToast();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', openEvent);
      screenfull.on('error', errorEvent);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', openEvent);
        screenfull.off('error', errorEvent);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isOpen && screenfull.isEnabled) {
      setShow(undefined);
    }
  }, [isOpen]);

  const openEvent = () => {
    if (screenfull.isEnabled) {
      setIsOpen(screenfull.isFullscreen);
    }
    console.log('a');
  };

  const errorEvent = () => {
    toast({
      title: 'おっと、フルスクリーンにできませんでした。',
      status: 'error',
      isClosable: true,
    });
  };

  const open = (id: string) => {
    setShow(id);

    if (screenfull.isEnabled) {
      screenfull.request(ref.current);
    }
  };

  return open;
};

export default useShow;
