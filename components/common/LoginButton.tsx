/**********************************************************
 * Login page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useDisclosure, Button} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import Login from './Login';

const LoginButton = () => {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    router.events.on('routeChangeStart', onClose);
  });

  return (
    <React.Fragment>
      <Button colorScheme="blue" onClick={onOpen}>
        Login
      </Button>
      <Login isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};

export default LoginButton;
