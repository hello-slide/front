/**********************************************************
 * Login page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Heading,
  Center,
  Flex,
  ModalContent,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {
  useGoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';
import {useRecoilState} from 'recoil';
import login from '../../utils/api/login';
import {IsCanLoginState, UserDataState} from '../../utils/state/atom';
import Link from './Link';

const LoginButton = () => {
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure();

  React.useEffect(() => {
    router.events.on('routeChangeStart', onClose);
  });

  const From = () => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const [, setUserData] = useRecoilState(UserDataState);
    const [isCanLogin, setIsCanLogin] = useRecoilState(IsCanLoginState);

    const handleGoogleLogin = (
      response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
      // TODO: Authentication process on the server
      if (response.code) {
        return;
      }

      const profile = (response as GoogleLoginResponse).getBasicProfile();
      const token = (response as GoogleLoginResponse).getAuthResponse();

      login(token.id_token)
        .then(response => {
          setUserData({
            loginToken: response.loginToken,
            sessionToken: response.sessionToken,
            name: profile.getName(),
            image: profile.getImageUrl(),
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    const {signIn, loaded} = useGoogleLogin({
      onSuccess: response => handleGoogleLogin(response),
      clientId: googleClientId,
      cookiePolicy: 'single_host_origin',
    });

    return (
      <React.Fragment>
        <Center margin="3rem 0 0 0">
          <Heading fontSize="1.7rem">HelloSlideにログインする</Heading>
        </Center>
        <Center>
          <Flex height="6rem" alignItems="center">
            <Button
              onClick={signIn}
              disabled={!(loaded && isCanLogin)}
              leftIcon={<FcGoogle />}
            >
              Googleでログイン
            </Button>
          </Flex>
        </Center>
        <Center margin="0 1rem 1.3rem 1rem">
          <Checkbox
            isChecked={isCanLogin}
            onChange={() => setIsCanLogin(!isCanLogin)}
          >
            <Link href="/terms" onClick={onClose} fontWeight="bold">
              利用規約
            </Link>
            と
            <Link href="/privacy" onClick={onClose} fontWeight="bold">
              プライバシーポリシー
            </Link>
            に同意する。
          </Checkbox>
        </Center>
      </React.Fragment>
    );
  };

  const NoForm = () => {
    return (
      <React.Fragment>
        <Center margin="3rem 0 2rem 0">
          <Heading fontSize="1.5rem">m(；∇；)mゴメンネ</Heading>
        </Center>
        <Center margin="0 1rem 1.3rem 1rem">
          <Text>スマートフォンからのログインはできません。</Text>
        </Center>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Button colorScheme="blue" onClick={onOpen}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton size="lg" />
          <ModalBody>
            {Math.min(window.parent.screen.width, window.parent.screen.height) <
            640 ? (
              <NoForm />
            ) : (
              <From />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default LoginButton;
