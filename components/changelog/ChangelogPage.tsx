/**********************************************************
 * Changelog page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Center, Text, Flex, Spacer, Divider} from '@chakra-ui/react';
import {ChangelogData} from '../../utils/changelog/parse';
import InfoText from '../common/InfoText';
import Markdown from '../markdown/Markdown';

const ChangelogPage: React.FC<{logData: ChangelogData[]}> = ({logData}) => {
  return (
    <InfoText title="変更履歴">
      {logData.map(value => {
        return (
          <Center key={value.version}>
            <Box
              width={{base: '80%', sm: '80%', md: '700px'}}
              margin="1rem 0 1rem 0"
            >
              <Flex>
                <Flex
                  as="p"
                  marginLeft="1%"
                  alignItems="flex-end"
                  fontSize=".75rem"
                  marginBottom=".3rem"
                  display={{base: 'none', sm: 'flex'}}
                  fontWeight="bold"
                >
                  ver.
                </Flex>
                <Text fontSize="1.5rem" fontWeight="bold" marginLeft="1%">
                  {value.version}
                </Text>
                <Spacer />
                <Flex as="p" alignItems="center" marginRight="1%">
                  {value.date}
                </Flex>
              </Flex>
              <Divider borderWidth="1px" />
              <Box margin="0 1rem 0 1rem">
                <Markdown text={value.details} />
              </Box>
            </Box>
          </Center>
        );
      })}
    </InfoText>
  );
};

export default ChangelogPage;
