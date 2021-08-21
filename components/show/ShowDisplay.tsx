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

const ShowDisplay: React.FC<{id: string}> = ({id}) => {
  const fullScreenRef = React.useRef();
  const [isFull, setIsFull] = React.useState(true);
  const setShow = useSetRecoilState(ShowState);

  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.request(fullScreenRef.current);
    }

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        setIsFull((screenfull as {isFullscreen: boolean}).isFullscreen);
      });
    }
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
        backgroundColor="black"
        position="absolute"
        width="100%"
        height="100%"
        left="0"
        top="0"
        zIndex="10000"
        color="white"
      >
        {isFull ? 'full' : 'no full'}
        {id}
      </Box>
    </NoSSR>
  );
};

export default ShowDisplay;
