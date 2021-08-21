/**********************************************************
 * slideshow display
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Button} from '@chakra-ui/react';
import ReactFullScreen from 'react-easyfullscreen';
import NoSSR from 'react-no-ssr';

const ShowDisplay: React.FC<{id: string}> = ({id}) => {
  return (
    <NoSSR>
      <ReactFullScreen>
        {({ref, onRequest, onExit}) => (
          <Box
            ref={ref}
            backgroundColor="black"
            position="absolute"
            width="100%"
            height="100%"
            left="0"
            top="0"
            zIndex="10000"
          >
            {id}
            <Button
              onClick={() => {
                onRequest();
              }}
            >
              フルスクリーン
            </Button>
            <Button
              onClick={() => {
                onExit();
              }}
            >
              終了
            </Button>
          </Box>
        )}
      </ReactFullScreen>
    </NoSSR>
  );
};

export default ShowDisplay;
