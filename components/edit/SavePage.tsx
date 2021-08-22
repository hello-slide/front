/**********************************************************
 * page save
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Button, useToast, ButtonProps} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import SetPage from '../../utils/api/setPage';
import {
  removeBeforeUnLoad,
  addBeforeUnLoad,
} from '../../utils/event/beforeUnLoad';
import {
  CurrentPageState,
  PageDataState,
  UserDataState,
  NowPageDataState,
} from '../../utils/state/atom';

const SavePage: React.FC<ButtonProps> = props => {
  const currentPage = useRecoilValue(CurrentPageState);
  const [pageData, setPageData] = useRecoilState(PageDataState);
  const [userData, setUserData] = useRecoilState(UserDataState);
  const nowPageData = useRecoilValue(NowPageDataState);
  const [isLoad, setIsLoad] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    if (typeof pageData !== 'undefined') {
      addBeforeUnLoad();
    }
  }, [pageData]);

  React.useEffect(() => {
    setPage();
  }, [currentPage?.id]);

  const setPage = () => {
    if (typeof pageData !== 'undefined') {
      setIsLoad(true);
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

      setPageAPI
        .run(nowPageData?.id, pageId, pageData)
        .then(() => {
          setIsLoad(false);
          removeBeforeUnLoad();
        })
        .catch(error => {
          setIsLoad(false);
          toast({
            title: 'ページを保存できませんでした。',
            description: `${error}`,
            status: 'error',
          });
        });

      setPageData(undefined);
    }
  };
  return (
    <Button
      isLoading={isLoad}
      onClick={setPage}
      size="sm"
      variant="ghost"
      {...props}
    >
      保存
    </Button>
  );
};

export default SavePage;
