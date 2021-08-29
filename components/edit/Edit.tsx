/**********************************************************
 * Edit
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Flex, useToast} from '@chakra-ui/react';
import React from 'react';
import {useSetRecoilState, useRecoilValue} from 'recoil';
import ListPages from '../../utils/api/listPage';
import {
  PagesState,
  UserDataState,
  NowPageDataState,
  CurrentPageState,
} from '../../utils/state/atom';
import EditMain from './EditMain';
import PageList from './PageList';

const Edit: React.FC<{id: string | string[]}> = ({id}) => {
  const setPages = useSetRecoilState(PagesState);
  const userData = useRecoilValue(UserDataState);
  const setNowPageData = useSetRecoilState(NowPageDataState);
  const setCurrentPage = useSetRecoilState(CurrentPageState);
  const toast = useToast();

  React.useEffect(() => {
    if (userData && typeof id === 'string') {
      setPages([]);
      setCurrentPage(undefined);

      const listPagesAPI = new ListPages();
      listPagesAPI
        .run(id)
        .then(value => {
          const pages = [];
          for (const element of value.pages) {
            pages.push({
              id: element.page_id,
              type: element.type,
            });
          }
          setPages(pages);
          setNowPageData(value);
        })
        .catch(error => {
          toast({
            title: 'スライドを読み込めませんでした',
            description: `${error}`,
            status: 'error',
          });
        });
    }
  }, [userData]);

  return (
    <Flex>
      <PageList />
      <EditMain />
    </Flex>
  );
};

export default Edit;
