/**********************************************************
 * Root page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useRecoilState} from 'recoil';
import Page from '../components/common/Page';
import {UserDataState} from '../utils/state/atom';

const Index = () => {
  const [userData] = useRecoilState(UserDataState);
  return <Page isLogin={typeof userData.token !== 'undefined'}>aa</Page>;
};

export default Index;
