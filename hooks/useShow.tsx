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
import {ShowState, IsHostSocketState} from '../utils/state/atom';

const useShow = (
  ref: React.MutableRefObject<undefined>
): ((id: string, isFull?: boolean) => void) => {
  const setShow = useSetRecoilState(ShowState);
  const setIsHostSocket = useSetRecoilState(IsHostSocketState);
  const toast = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFull, setIsFull] = React.useState(true);
  const isFullRef = React.useRef<boolean>();

  // Set and delete
  // - full-screen change events,
  // - full-screen error events,
  // - and keyboard events.
  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', openEvent);
      screenfull.on('error', errorEvent);
    }

    document.addEventListener('keydown', escEvent, false);

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', openEvent);
        screenfull.off('error', errorEvent);
      }

      document.removeEventListener('keydown', escEvent, false);
    };
  }, []);

  // Since state cannot be read in the event, it is stored in ref.
  // See also: https://qiita.com/impl_s/items/0c9f326c90052ebd77da
  React.useEffect(() => {
    isFullRef.current = isFull;
  }, [isFull]);

  // When the full screen is finished, the presentation screen will also be closed.
  React.useEffect(() => {
    if (!isOpen && screenfull.isEnabled) {
      setShow(undefined);
      setIsHostSocket(false);
    }
  }, [isOpen]);

  const openEvent = () => {
    if (screenfull.isEnabled) {
      setIsOpen(screenfull.isFullscreen);
    }
  };

  const errorEvent = () => {
    toast({
      title: 'おっと、フルスクリーンにできませんでした。',
      status: 'error',
      isClosable: true,
    });
    setShow(undefined);
    setIsHostSocket(false);
  };

  const escEvent = (event: KeyboardEvent) => {
    if (event.code === 'Escape' && !isFullRef.current) {
      setShow(undefined);
      setIsHostSocket(false);
    }
  };

  const open = (id: string, isFull = true) => {
    setShow(id);
    setIsHostSocket(true);

    if (!isFull) {
      setIsFull(false);
      return;
    }

    if (screenfull.isEnabled) {
      screenfull.request(ref.current);
    }
  };

  return open;
};

export default useShow;
