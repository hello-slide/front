/**********************************************************
 * Visitor home.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Heading, Center, Box} from '@chakra-ui/react';
import React from 'react';

const Home = () => {
  const texts = [
    '(=ﾟωﾟ)ﾉぃょぅ',
    '(´・ω・｀)やあ',
    'ヾ(*´∀｀*)ﾉｷｬｯｷｬ',
    '(ﾟДﾟ)ﾉ ｧｨ',
    '(  ﾟдﾟ)ｳﾑ',
    '( ･`ω･´)ﾅﾝ…ﾀﾞﾄ!?',
    'v(￣Д￣)v ﾌﾞｲｯ',
    'ｷﾀ━(ﾟ∀ﾟ)━!',
  ];

  const [text, setText] = React.useState('Hello Slide');

  React.useEffect(() => {
    setText(texts[Math.floor(Math.random() * texts.length)]);
  }, []);

  return (
    <Center height="100%">
      <Box>
        <Heading>{text}</Heading>
      </Box>
    </Center>
  );
};

export default Home;
