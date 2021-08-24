/**********************************************************
 * slideshow display
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import React from 'react';
import NoSSR from 'react-no-ssr';
import {useSetRecoilState} from 'recoil';
import screenfull from 'screenfull';
import {ShowState} from '../../utils/state/atom';
import ShowController from './ShowController';

const ShowDisplay: React.FC<{id: string}> = ({id}) => {
  const fullScreenRef = React.useRef();
  const [isFull, setIsFull] = React.useState(true);
  const setShow = useSetRecoilState(ShowState);

  React.useEffect(() => {
    let isMounted = true;
    if (screenfull.isEnabled) {
      screenfull.request(fullScreenRef.current);
    }

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        if (isMounted) {
          setIsFull((screenfull as {isFullscreen: boolean}).isFullscreen);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

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
