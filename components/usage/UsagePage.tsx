/**********************************************************
 * Usage Page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box, Center} from '@chakra-ui/react';
import InfoText from '../common/InfoText';
import Markdown from '../markdown/Markdown';

const UsagePage: React.FC<{contents: string}> = ({contents}) => {
  return (
    <InfoText title="使い方">
      <Center>
        <Box width={{base: '80%', sm: '80%', md: '700px'}}>
          <Markdown text={contents} />
        </Box>
      </Center>
    </InfoText>
  );
};
export default UsagePage;
