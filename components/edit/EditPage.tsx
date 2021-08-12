/**********************************************************
 * Edit page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Flex, useToast} from '@chakra-ui/react';
import React from 'react';
import NoSSR from 'react-no-ssr';
import {useSetRecoilState, useRecoilState} from 'recoil';
import Page from '../../@types/page';
import listPage from '../../utils/api/listPage';
import {PagesState, UserDataState, NowPageData} from '../../utils/state/atom';
import EditHeader from './EditHeader';
import PageList from './PageList';

const EditPage: React.FC<{id: string | string[]}> = ({id}) => {
  const [currentPage, setCurrentPage] = React.useState<Page | undefined>();
  const setPages = useSetRecoilState(PagesState);
  const [userData, setUserData] = useRecoilState(UserDataState);
  const setNowPageData = useSetRecoilState(NowPageData);
  const toast = useToast();

  React.useEffect(() => {
    if (
      typeof userData.refreshToken !== 'undefined' &&
      typeof id === 'string'
    ) {
      listPage(
        userData.sessionToken,
        userData.refreshToken,
        id,
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
  }, []);

  return (
    <NoSSR>
      <Box width="100%" height="calc(100vh - 84px)" margin="0" padding="0">
        <EditHeader />
        <Flex>
          <PageList
            setCurrentPage={page => {
              setCurrentPage(page);
            }}
            nowPageId={currentPage?.id}
          />
          <Box>
            * 現在のページID: {currentPage?.id}
            <br />* 現在のページタイプ: {currentPage?.type}
          </Box>
        </Flex>
      </Box>
    </NoSSR>
  );
};

export default EditPage;
