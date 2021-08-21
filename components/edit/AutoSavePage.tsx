/**********************************************************
 * Page auto save
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import SetPage from '../../utils/api/setPage';
import {removeBeforeUnLoad} from '../../utils/beforeUnLoad/beforeUnLoad';
import {
  PageDataState,
  UserDataState,
  NowPageDataState,
} from '../../utils/state/atom';

const AutoSave = () => {
  const [pageData, setPageData] = useRecoilState(PageDataState);
  const [userData, setUserData] = useRecoilState(UserDataState);
  const nowPageData = useRecoilValue(NowPageDataState);
  const toast = useToast();
  const router = useRouter();

  const [nowPath, setNowPath] = React.useState<string>(undefined);

  React.useEffect(() => {
    if (nowPath !== router.asPath) {
      if (nowPath && nowPath.substr(0, 5) === '/edit') {
        removeBeforeUnLoad();
        setPage();
      }

      setNowPath(router.asPath);
    }
  }, [router.asPath]);

  const setPage = () => {
    if (typeof pageData !== 'undefined') {
      const pageId = pageData.id;
      const setPageAPI = new SetPage(
        userData.sessionToken,
        userData.refreshToken,
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
      );

      setPageAPI.run(nowPageData?.id, pageId, pageData).catch(error => {
        toast({
          title: 'ページを保存できませんでした。',
          description: `${error}`,
          status: 'error',
        });
      });

      setPageData(undefined);
    }
  };

  return <></>;
};

export default AutoSave;
