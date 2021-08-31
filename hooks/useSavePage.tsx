/**********************************************************
 * Save page hooks.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import SetPage from '../utils/api/setPage';
import {removeBeforeUnLoad} from '../utils/event/beforeUnLoad';
import {PageDataState, NowPageDataState} from '../utils/state/atom';

const useSavePage = (): [boolean, () => void] => {
  const [isLoad, setIsLoad] = React.useState(false);
  const [pageData, setPageData] = useRecoilState(PageDataState);
  const toast = useToast();
  const nowPageData = useRecoilValue(NowPageDataState);

  const setPage = () => {
    if (typeof pageData !== 'undefined') {
      setIsLoad(true);
      const pageId = pageData.id;
      const setPageAPI = new SetPage();

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

  return [isLoad, setPage];
};

export default useSavePage;
