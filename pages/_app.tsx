/**********************************************************
 * App
 *
 * @author Yoshitsugu Tahara <arisahyper0000@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box} from '@chakra-ui/react';
import {ChakraProvider} from '@chakra-ui/react';
import {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import nprogress from 'nprogress';
import {useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {GA_TRACKING_ID, pageview} from '../utils/ga/gtag';
import 'nprogress/nprogress.css';

nprogress.configure({showSpinner: false, speed: 400, minimum: 0.25});

const App = ({Component, pageProps}: AppProps): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (process.browser) {
    nprogress.start();
  }

  useEffect(() => {
    nprogress.done();
  });

  return (
    <RecoilRoot>
      <ChakraProvider>
        <Box fontFamily="'Noto Sans JP', sans-serif;">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;
