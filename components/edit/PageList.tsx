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
  Text,
  useToast,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import {ContextMenuTrigger, ContextMenu} from 'react-contextmenu';
import {IoAdd, IoOpenOutline, IoTrashOutline} from 'react-icons/io5';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import Page from '../../@types/page';
import _deletePage from '../../utils/api/deletePage';
import {
  PagesState,
  UserDataState,
  NowPageData,
  LoadState,
} from '../../utils/state/atom';
import ListTitle from './ListTitle';
import NewPage from './NewPage';

const PageList = React.memo<{
  setCurrentPage: (page: Page) => void;
  nowPageId: string;
}>(({setCurrentPage, nowPageId}) => {
  const [pages, setPages] = useRecoilState(PagesState);
  const createPageModel = useDisclosure();
  const [userData, setUserData] = useRecoilState(UserDataState);
  const nowPageData = useRecoilValue(NowPageData);
  const toast = useToast();
  const setLoad = useSetRecoilState(LoadState);

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

  const deletePage = (pageId: string) => {
    setLoad(true);
    _deletePage(
      userData.sessionToken,
      userData.refreshToken,
      nowPageData?.id,
      pageId,
      (sessionToken, refreshToken, isFailed) => {
        if (isFailed) {
          setUserData({
            name: '',
            image: '',
          });
        } else {
          setUserData(value => ({
            name: value.name,
            image: value.image,
            sessionToken: sessionToken,
            refreshToken: refreshToken,
          }));
        }
      }
    )
      .then(() => {
        const _pages = [...pages];
        const index = _pages.findIndex(value => value.id === pageId);

        if (pageId === nowPageId) {
          if (index !== _pages.length - 1) {
            setCurrentPage(pages[index + 1]);
          } else {
            setCurrentPage(pages[index - 1]);
          }
        }
        _pages.splice(index, 1);
        setPages(_pages);
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        toast({
          title: 'ページを削除できませんでした',
          description: `${error}`,
          status: 'error',
        });
      });
  };

  const PageListItem = React.memo<{
    page: Page;
    index: number;
    selected: boolean;
  }>(({page, index, selected}) => {
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
            borderColor={selected ? 'blue.400' : 'gray.100'}
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
                onClick={createPageModel.onOpen}
              >
                新規作成
              </MenuItem>
              <MenuItem
                padding=".5rem 0 .5rem 1rem"
                icon={<IoTrashOutline size="18px" />}
                onClick={() => {
                  deletePage(page.id);
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

  return (
    <>
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
                    selected={value.id === nowPageId}
                    key={value.id}
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
      <NewPage
        isOpen={createPageModel.isOpen}
        onClose={createPageModel.onClose}
        handleChange={newPage}
      />
    </>
  );
});

PageList.displayName = 'pageList';

export default PageList;
