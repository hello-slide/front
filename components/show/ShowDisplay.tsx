/**********************************************************
 * slideshow display
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, useToast} from '@chakra-ui/react';
import React from 'react';
import NoSSR from 'react-no-ssr';
import {useSetRecoilState} from 'recoil';
import screenfull from 'screenfull';
import {ShowState} from '../../utils/state/atom';
import ShowController from './ShowController';

const ShowDisplay: React.FC<{id: string}> = ({id}) => {
  const fullScreenRef = React.useRef();
  const [isFull, setIsFull] = React.useState(true);
  const [safari, setSafari] = React.useState(false);
  const setShow = useSetRecoilState(ShowState);
  const toast = useToast();

  const escEvent = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      setIsFull(false);
    }
  };

  React.useEffect(() => {
    let isMounted = true;
    if (screenfull.isEnabled) {
      screenfull.request(fullScreenRef.current);

      screenfull.on('change', () => {
        if (isMounted) {
          setIsFull((screenfull as {isFullscreen: boolean}).isFullscreen);
        }
      });

      screenfull.on('error', () => {
        setSafari(true);
      });
    }

    return () => {
      document.removeEventListener('keydown', escEvent, false);
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (safari) {
      toast({
        title: 'お使いのブラウザは手動でフルスクリーンにする必要があります',
        description: 'Control+Command+Fを押してフルスクリーンにしてください。',
        status: 'info',
        isClosable: true,
      });
      document.addEventListener('keydown', escEvent, false);
    }
  }, [safari]);

  React.useEffect(() => {
    if (!isFull) {
      setShow(undefined);
    }
  }, [isFull]);

  return (
    <NoSSR>
      <Box
        ref={fullScreenRef}
        backgroundColor="white"
        position="absolute"
        width="100%"
        height="100%"
        left="0"
        top="0"
        zIndex="1000"
      >
        <ShowController id={id} />
      </Box>
    </NoSSR>
  );
};

export default ShowDisplay;
