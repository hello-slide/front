/**********************************************************
 * show design
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Spacer, Flex, Text} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import {useRecoilValue} from 'recoil';
import {SlideDesign} from '../../../../@types/pageItem';
import {IsHostSocketState} from '../../../../utils/state/atom';

const Design: React.FC<{data: SlideDesign; link: string; visitor: number}> =
  props => {
    const isHostSocket = useRecoilValue(IsHostSocketState);

    switch (props.data?.designType || 'mono') {
      case 'mono':
        return (
          <Box
            height="100%"
            backgroundColor={props.data?.backgroundColor || '#F2F2F2'}
            color={props.data?.textColor || '#000000'}
          >
            <Box height="92%">{props.children}</Box>
            <Flex
              height="8%"
              alignItems="center"
              color={props.data?.textColor || '#000000'}
            >
              <Box marginX="1rem" filter={isHostSocket ? '' : 'blur(2px)'}>
                <QRCode
                  value={props.link}
                  size={70}
                  bgColor={props.data?.backgroundColor || '#F2F2F2'}
                  fgColor={props.data?.textColor || '#000000'}
                />
              </Box>
              <Text fontWeight="bold" fontSize="1.2rem">
                {props.link}
              </Text>
              <Spacer />
              <Text fontWeight="bold" fontSize="1.2rem" marginX="1rem">
                参加者数: {props.visitor}
              </Text>
            </Flex>
          </Box>
        );
      case 'gradation':
        return (
          <Box
            height="100%"
            background={`linear-gradient(to bottom right, ${props.data.backgroundColorStart}, ${props.data.backgroundColorEnd})`}
            color={props.data.textColor}
          >
            <Box height="92%">{props.children}</Box>
            <Flex height="8%" alignItems="center">
              <Box marginX="1rem" filter={isHostSocket ? '' : 'blur(2px)'}>
                <QRCode
                  value={props.link}
                  size={70}
                  bgColor={props.data.backgroundColorEnd}
                  fgColor={props.data.textColor}
                />
              </Box>
              <Text fontWeight="bold" fontSize="1.2rem">
                {props.link}
              </Text>
              <Spacer />
              <Text fontWeight="bold" fontSize="1.2rem" marginX="1rem">
                参加者数: {props.visitor}
              </Text>
            </Flex>
          </Box>
        );
    }
  };

export default Design;
