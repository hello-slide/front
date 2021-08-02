/**********************************************************
 * Privacy policy page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Center} from '@chakra-ui/react';
import InfoText from '../common/InfoText';
import Markdown from '../markdown/Markdown';

const PrivacyPage: React.FC<{contents: string}> = ({contents}) => {
  return (
    <InfoText title="プライバシーポリシー">
      <Center>
        <Box width={{base: '90%', sm: '80%', md: '70%'}}>
          <Markdown text={contents} />
        </Box>
      </Center>
    </InfoText>
  );
};

export default PrivacyPage;
