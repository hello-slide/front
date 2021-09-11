/**********************************************************
 * Qr code slide contents
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, Text, Heading, Center} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import React from 'react';

const QrCode: React.FC<{link: string; visitor: number}> = ({link, visitor}) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Heading fontSize="3rem">一緒に参加しよう！</Heading>
      <Flex justifyContent="center" alignItems="center" marginTop="7rem">
        <QRCode value={link} size={300} />
        <Text fontSize="2.5rem" fontWeight="bold" marginLeft="4rem">
          {link}
        </Text>
      </Flex>
      <Center>
        <Text fontSize="1.5rem" fontWeight="bold">
          参加者数: {visitor}
        </Text>
      </Center>
    </Flex>
  );
};

export default QrCode;
