/**********************************************************
 * Page list Item
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Flex, Text, Menu, MenuItem, MenuList} from '@chakra-ui/react';
import React from 'react';
import {ContextMenuTrigger, ContextMenu} from 'react-contextmenu';
import {IoAdd, IoOpenOutline, IoTrashOutline} from 'react-icons/io5';
import {useRecoilState} from 'recoil';
import Page from '../../@types/page';
import {CurrentPageState} from '../../utils/state/atom';
import ListTitle from './ListTitle';

const PageListItem = React.memo<{
  page: Page;
  index: number;
  createModalOpen: () => void;
  deleteHandler: (id: string) => void;
}>(({page, index, createModalOpen, deleteHandler}) => {
  const [currentPage, setCurrentPage] = useRecoilState(CurrentPageState);

  return (
    <>
      <ContextMenuTrigger id={page.id}>
        <Flex
          margin=".5rem"
          padding="0 1.5rem 0"
          backgroundColor="gray.100"
          borderRadius="10px"
          cursor="pointer"
          onClick={() => {
            setCurrentPage(page);
          }}
          borderWidth="4px"
          borderColor={page.id === currentPage?.id ? 'blue.400' : 'gray.100'}
          justifyContent="space-between"
        >
          <Text as="span" fontWeight="bold" fontSize="3rem" color="gray.600">
            {index + 1}
          </Text>
          <ListTitle type={page.type} color="gray.500" />
        </Flex>
      </ContextMenuTrigger>
      <ContextMenu id={page.id}>
        <Menu isOpen={true}>
          <MenuList padding={0}>
            <MenuItem
              padding=".5rem 0 .5rem 1rem"
              icon={<IoOpenOutline size="18px" />}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              開く
            </MenuItem>
            <MenuItem
              padding=".5rem 0 .5rem 1rem"
              icon={<IoAdd size="18px" />}
              onClick={createModalOpen}
            >
              新規作成
            </MenuItem>
            <MenuItem
              padding=".5rem 0 .5rem 1rem"
              icon={<IoTrashOutline size="18px" />}
              onClick={() => {
                deleteHandler(page.id);
              }}
            >
              削除
            </MenuItem>
          </MenuList>
        </Menu>
      </ContextMenu>
    </>
  );
});

PageListItem.displayName = 'pageListItem';

export default PageListItem;
