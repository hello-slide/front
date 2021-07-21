/**********************************************************
 * Page Footer
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box, StackDivider, Stack, Text, Center} from '@chakra-ui/react';
import React from 'react';
import Logo from '../../assets/svgs/logo.svg';
import FooterList from './FooterList';

const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      py="12"
      px={{base: '4', md: '8'}}
    >
      <Stack spacing="10" divider={<StackDivider />}>
        <Stack
          direction={{base: 'column', lg: 'row'}}
          spacing={{base: '10', lg: '28'}}
        >
          <Box flex="1">
            <Logo width="10rem" />
          </Box>
          <Stack
            direction={{
              base: 'column',
              sm: 'row',
              md: 'row',
              lg: 'row',
            }}
            spacing={{base: '10', lg: '28'}}
          >
            <Box>
              <FooterList
                title="About"
                elements={[
                  {text: 'HelloSlideについて', links: '/'},
                  {text: 'よくある質問', links: '/'},
                  {text: '変更履歴', links: '/'},
                  {text: '使い方', links: '/'},
                ]}
              />
            </Box>
            <Box>
              <FooterList
                title="Legal"
                elements={[
                  {text: '利用規約', links: '/'},
                  {text: 'プライバシーポリシー', links: '/'},
                ]}
              />
            </Box>
            <Box>
              <FooterList
                title="Links"
                elements={[
                  {
                    text: 'GitHub',
                    links: 'https://github.com/hello-slide',
                    isExternal: true,
                  },
                ]}
              />
            </Box>
          </Stack>
        </Stack>
        <Center>
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} hello-slide
          </Text>
        </Center>
      </Stack>
    </Box>
  );
};

export default Footer;
