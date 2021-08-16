/**********************************************************
 * Page List
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Box,
  Menu,
  MenuList,
  MenuItem,
  useDisclosure,
  Flex,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import {ContextMenuTrigger, ContextMenu} from 'react-contextmenu';
import {IoAdd} from 'react-icons/io5';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {PagesState, CurrentPageState} from '../../utils/state/atom';
import DeletePage from './DeletePage';
import NewPage from './NewPage';
import PageListItem from './PageListItem';

const PageList = React.memo(() => {
  const [pages, setPages] = useRecoilState(PagesState);
  const createPageModel = useDisclosure();
  const deletePageModel = useDisclosure();
  const setCurrentPage = useSetRecoilState(CurrentPageState);
  const [deletePageId, setDeletePageId] = React.useState('');

  const newPage = (type: string, id: string) => {
    const newElement = {
      id: id,
      type: type,
    };
    setCurrentPage(newElement);

    setPages(value => {
      const a = [...value];
      a.push(newElement);
      return a;
    });
  };

  return (
    <>
      {pages.length === 0 ? (
        <Flex
          width="18rem"
          height="calc(100vh - 116px)"
          borderRightWidth="1px"
          borderRightColor="gray.300"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={createPageModel.onOpen}>新規作成</Button>
        </Flex>
      ) : (
        <Box
          width="18rem"
          height="100%"
          borderRightWidth="1px"
          borderRightColor="gray.300"
        >
          <ContextMenuTrigger id="pageList">
            <Box height="calc(100vh - 116px)">
              <Box
                width="100%"
                height="100%"
                overflowY="scroll"
                css={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {pages.map((value, index) => {
                  return (
                    <PageListItem
                      page={value}
                      index={index}
                      createModalOpen={createPageModel.onOpen}
                      key={value.id}
                      deleteHandler={id => {
                        setDeletePageId(id);
                        deletePageModel.onOpen();
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          </ContextMenuTrigger>
          <ContextMenu id="pageList">
            <Menu isOpen={true}>
              <MenuList padding={0}>
                <MenuItem
                  padding=".5rem 0 .5rem 1rem"
                  icon={<IoAdd size="18px" />}
                  onClick={createPageModel.onOpen}
                >
                  新規作成
                </MenuItem>
              </MenuList>
            </Menu>
          </ContextMenu>
        </Box>
      )}
      <NewPage
        isOpen={createPageModel.isOpen}
        onClose={createPageModel.onClose}
        handleChange={newPage}
      />
      <DeletePage
        isOpen={deletePageModel.isOpen}
        onClose={deletePageModel.onClose}
        pageId={deletePageId}
      />
    </>
  );
});

PageList.displayName = 'pageList';

export default PageList;
