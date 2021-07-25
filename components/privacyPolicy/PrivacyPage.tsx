/**********************************************************
 * Privacy policy page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Center} from '@chakra-ui/react';
import Markdown from '../markdown/Markdown';

const PrivacyPage: React.FC<{contents: string}> = ({contents}) => {
  return (
    <Center>
      <Box>
        <Markdown text={contents} />
      </Box>
    </Center>
  );
};

export default PrivacyPage;
