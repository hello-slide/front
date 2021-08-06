/**********************************************************
 * Dashboard page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useRouter} from 'next/router';
import React from 'react';
import NoSSR from 'react-no-ssr';
import {useRecoilValue} from 'recoil';
import {UserDataState} from '../../utils/state/atom';
import SlideList from './SlideList';

const DashboardPage = () => {
  const userData = useRecoilValue(UserDataState);
  const router = useRouter();

  React.useEffect(() => {
    if (typeof userData.refreshToken === 'undefined') {
      router.push('/');
    }
  });

  return (
    <NoSSR>
      <SlideList />
    </NoSSR>
  );
};

export default DashboardPage;
