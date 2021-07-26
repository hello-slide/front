/**********************************************************
 * Terms page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Box, Center} from '@chakra-ui/react';
import InfoText from '../common/InfoText';
import Markdown from '../markdown/Markdown';

const TermsPage: React.FC<{contents: string}> = ({contents}) => {
  return (
    <InfoText title="利用規約">
      <Center>
        <Box width={{base: '90%', sm: '70%', md: '50%'}}>
          <Markdown text={contents} />
        </Box>
      </Center>
    </InfoText>
  );
};
export default TermsPage;
