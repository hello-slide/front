/**********************************************************
 * [Module description.]
 *
 * @author YourName <YourMailAddress>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue, useRecoilState} from 'recoil';
import SetPage from '../../utils/api/setPage';
import {
  CurrentPageState,
  PageDataState,
  UserDataState,
  NowPageDataState,
} from '../../utils/state/atom';
import QuestionEdit from './editContents/QuestionEdit';
import QuizEdit from './editContents/QuizEdit';

const EditMain = () => {
  const currentPage = useRecoilValue(CurrentPageState);
  const [pageData, setPageData] = useRecoilState(PageDataState);
  const [userData, setUserData] = useRecoilState(UserDataState);
  const nowPageData = useRecoilValue(NowPageDataState);
  const toast = useToast();

  React.useEffect(() => {
    setPage();
  }, [currentPage?.id]);

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

  switch (currentPage?.type) {
    case 'quiz':
      return <QuizEdit id={currentPage?.id} />;

    case 'question':
      return <QuestionEdit id={currentPage?.id} />;

    default:
      return <></>;
  }
};

export default EditMain;
