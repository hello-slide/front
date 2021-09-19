/**********************************************************
 * Operation explanation slide contents.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, Heading, Kbd, Stack, Spacer, Text} from '@chakra-ui/react';
import React from 'react';
import Slide from '../../../../@types/slides';

const OpExplanation: React.FC<{slideData: Slide}> = ({slideData}) => {
  const KeyMap: React.FC<{text: string; keys: string[]}> = ({text, keys}) => {
    return (
      <Flex alignItems="center">
        <Text fontSize="1.5rem">{text}</Text>
        <Spacer />
        {keys.map((value, index) => {
          return (
            <Text key={value} fontSize="1.5rem" fontWeight="bold">
              <Kbd marginX=".2rem">{value}</Kbd>
              {index !== keys.length - 1 && '+'}
            </Text>
          );
        })}
      </Flex>
    );
  };

  const ExplanationContent: React.FC<{title: string}> = props => {
    return (
      <Stack direction="column" spacing="5px" width="20rem">
        <Heading marginBottom="2rem">{props.title}</Heading>
        {props.children}
      </Stack>
    );
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Stack direction="row" spacing="5rem">
        <ExplanationContent title="操作説明">
          <KeyMap text="次のページに移動する" keys={['→']} />
          <KeyMap text="前のページに戻る" keys={['←']} />
          <KeyMap text="終了する" keys={['Esc']} />
        </ExplanationContent>
        <ExplanationContent title="基本情報">
          <Text fontSize="1.5rem">スライド名: {slideData?.title}</Text>
        </ExplanationContent>
      </Stack>
    </Flex>
  );
};

export default OpExplanation;
