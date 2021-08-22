/**********************************************************
 * Qr code slide contents
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, Text, Heading} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {sessionApiLink} from '../../../../utils/api/links';
import {SlideshowDataState} from '../../../../utils/state/atom';

const QrCode = () => {
  const slideshowData = useRecoilValue(SlideshowDataState);
  const link = `${sessionApiLink}${slideshowData?.session}`;
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
    </Flex>
  );
};

export default QrCode;
