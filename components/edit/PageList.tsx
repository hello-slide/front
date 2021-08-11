/**********************************************************
 * Page List
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Menu, MenuList, MenuItem} from '@chakra-ui/react';
import React from 'react';
import {ContextMenuTrigger, ContextMenu} from 'react-contextmenu';
import {IoAdd, IoOpenOutline, IoTrashOutline} from 'react-icons/io5';
import {useRecoilState} from 'recoil';
import Page from '../../@types/page';
import {PagesState} from '../../utils/state/atom';

interface Props {
  setCurrentPage: (page: Page) => void;
  nowPageId: string;
}

const PageList = React.memo<Props>(({setCurrentPage, nowPageId}) => {
  const [pages, setPages] = useRecoilState(PagesState);

  const newPage = () => {
    // TODO: new page
    setPages(value => {
      const a = [...value];
      a.push({
        id: `${Math.random()}`,
        type: 'hoge',
      });
      return a;
    });
  };

  const deletePage = (pageId: string) => {
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
  };

  const PageListItem: React.FC<{page: Page; selected: boolean}> = ({
    page,
    selected,
  }) => {
    const [, setRender] = React.useState(false);
    return (
      <>
        <ContextMenuTrigger id={page.id}>
          <Box
            margin=".5rem"
            padding="3rem"
            backgroundColor="white"
            borderRadius="10px"
            cursor="pointer"
            onClick={() => {
              setCurrentPage(page);
            }}
            borderWidth="1px"
            borderColor={selected ? 'red' : 'white'}
          >
            {page.type}
          </Box>
        </ContextMenuTrigger>
        <ContextMenu id={page.id}>
          <Menu isOpen={true}>
            <MenuList padding={0}>
              <MenuItem
                padding=".5rem 0 .5rem 1rem"
                icon={<IoOpenOutline size="18px" />}
                onClick={() => {
                  setCurrentPage(page);
                  setRender(value => !value);
                }}
              >
                開く
              </MenuItem>
              <MenuItem
                padding=".5rem 0 .5rem 1rem"
                icon={<IoAdd size="18px" />}
                onClick={() => {
                  newPage();
                }}
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
  };

  return (
    <Box width="18rem" height="100%" backgroundColor="gray.200">
      <ContextMenuTrigger id="pageList">
        <Box height="calc(100vh - 84px)">
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
            {pages.map(value => {
              return (
                <PageListItem
                  page={value}
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
              onClick={newPage}
            >
              新規作成
            </MenuItem>
          </MenuList>
        </Menu>
      </ContextMenu>
    </Box>
  );
});

PageList.displayName = 'pageList';

export default PageList;
