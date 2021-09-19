/**********************************************************
 * Login logic
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
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
import {FcGoogle} from 'react-icons/fc';
import {domain as apiDomain} from '../../utils/api/links';
import Link from './Link';

const Login: React.FC<{isOpen: boolean; onClose: () => void}> = ({
  isOpen,
  onClose,
}) => {
  const From = () => {
    const [isCanLogin, setIsCanLogin] = React.useState(false);
    const router = useRouter();

    const handleChange = () => {
      router.push(`https://${apiDomain}/account/login`);
    };

    return (
      <React.Fragment>
        <Center margin="3rem 0 0 0">
          <Heading fontSize="1.7rem">HelloSlideにログインする</Heading>
        </Center>
        <Center>
          <Flex height="6rem" alignItems="center">
            <Button
              onClick={handleChange}
              disabled={!isCanLogin}
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
  );
};

export default Login;
