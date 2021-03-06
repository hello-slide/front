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
import Link from './Link';

const Footer = React.memo(() => {
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
            <Link href="/" _focus={{boxShadow: 'none'}}>
              <Box width="10rem">
                <Logo width="100%" />
              </Box>
            </Link>
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
                  {text: 'HelloSlideについて', links: '/about'},
                  {text: 'よくある質問', links: '/question'},
                  {text: '変更履歴', links: '/changelog'},
                  {text: '使い方', links: '/usage'},
                ]}
              />
            </Box>
            <Box>
              <FooterList
                title="Legal"
                elements={[
                  {text: '利用規約', links: '/terms'},
                  {text: 'プライバシーポリシー', links: '/privacy'},
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
});

Footer.displayName = 'footer';

export default Footer;
