/**********************************************************
 * Changelog page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Center, Text, Flex, Spacer, Divider} from '@chakra-ui/react';
import ChangeLogType from '../../@types/changelog';
import InfoText from '../common/InfoText';

const ChangelogPage: React.FC<{logData: ChangeLogType[]}> = ({logData}) => {
  return (
    <InfoText title="変更履歴">
      {logData.map(value => {
        return (
          <Center key={value.version}>
            <Box
              width={{base: '90%', sm: '80%', md: '70%'}}
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
              <Box margin=".5rem 1rem 0 1rem">{value.text}</Box>
            </Box>
          </Center>
        );
      })}
    </InfoText>
  );
};

export default ChangelogPage;
