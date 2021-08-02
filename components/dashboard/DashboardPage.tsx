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
import {useRecoilState} from 'recoil';
import {UserDataState} from '../../utils/state/atom';

const DashboardPage = () => {
  const [userData] = useRecoilState(UserDataState);
  const router = useRouter();

  React.useEffect(() => {
    if (typeof userData.loginToken === 'undefined') {
      router.push('/');
    }
  });

  return <>Dashboard</>;
};

export default DashboardPage;
