/**********************************************************
 * page save
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Button, ButtonProps} from '@chakra-ui/react';
import React from 'react';
import {useRecoilValue} from 'recoil';
import useSavePage from '../../hooks/useSavePage';
import {addBeforeUnLoad} from '../../utils/event/beforeUnLoad';
import {CurrentPageState, PageDataState} from '../../utils/state/atom';

const SavePage: React.FC<ButtonProps> = props => {
  const currentPage = useRecoilValue(CurrentPageState);
  const pageData = useRecoilValue(PageDataState);
  const [isLoad, setPage] = useSavePage();

  React.useEffect(() => {
    if (typeof pageData !== 'undefined') {
      addBeforeUnLoad();
    }
  }, [pageData]);

  React.useEffect(() => {
    setPage();
  }, [currentPage?.id]);

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
