/**********************************************************
 * Page Footer
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box, SimpleGrid, Center} from '@chakra-ui/react';
import React from 'react';
import Logo from '../../assets/svgs/logo.svg';
import FooterList from './FooterList';

const Footer = () => {
  return (
    <Box width="100%" backgroundColor="#e3e3e3">
      <Center>
        <SimpleGrid
          columns={[1, null, 4]}
          spacing={[10, null, 40]}
          margin="0 1rem 0 1rem"
        >
          <Box margin="2rem 0 0 0">
            <Logo width="10rem" />
          </Box>
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
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default Footer;
