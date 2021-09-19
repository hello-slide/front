/**********************************************************
 * Edit page header.
 *
 * @author YutoWatanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Button,
  Flex,
  Text,
  Box,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import React from 'react';
import {
  IoArrowBackOutline,
  IoPlayCircleOutline,
  IoChevronDownOutline,
  IoTvOutline,
} from 'react-icons/io5';
import {useRecoilValue} from 'recoil';
import useSavePage from '../../hooks/useSavePage';
import useShow from '../../hooks/useShow';
import {NowPageDataState} from '../../utils/state/atom';
import Link from '../common/Link';
import Show from '../show/Show';
import SavePage from './SavePage';

const EditHeader: React.FC<{id: string | string[]}> = ({id}) => {
  const nowPageData = useRecoilValue(NowPageDataState);
  const ref = React.useRef();
  const open = useShow(ref);
  const [isLoad, setPage] = useSavePage();

  return (
    <>
      <Flex justifyContent="space-between" margin="0 .5rem 0">
        <Flex>
          <Link href="/dashboard" borderRadius="5px">
            <IoArrowBackOutline size="29px" />
          </Link>
          <Text
            fontWeight="bold"
            fontSize="1.2rem"
            overflow="hidden"
            height="30px"
            marginLeft="2rem"
          >
            {nowPageData?.title}
          </Text>
        </Flex>
        <Flex>
          <Menu>
            <SavePage marginRight="1rem" />
            <ButtonGroup isAttached size="sm" colorScheme="blue">
              <Button
                onClick={() => {
                  if (typeof id === 'string') {
                    setPage();
                    open(id);
                  }
                }}
                isLoading={isLoad}
              >
                プレゼンテーションを開始
              </Button>
              <MenuButton
                as={IconButton}
                icon={<IoChevronDownOutline size="18px" />}
              />
            </ButtonGroup>
            <MenuList width="380px">
              <MenuItem
                padding=".5rem 0 .5rem 1rem"
                icon={<IoPlayCircleOutline size="18px" />}
                onClick={() => {
                  if (typeof id === 'string') {
                    setPage();
                    open(id);
                  }
                }}
              >
                プレゼンテーションを開始
              </MenuItem>
              <MenuItem
                padding=".5rem 0 .5rem 1rem"
                icon={<IoTvOutline size="18px" />}
                onClick={() => {
                  if (typeof id === 'string') {
                    setPage();
                    open(id, false);
                  }
                }}
              >
                全画面にしないでプレゼンテーションを開始
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Box ref={ref}>
        <Show />
      </Box>
    </>
  );
};

export default EditHeader;
