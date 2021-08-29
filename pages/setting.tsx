/**********************************************************
 * setting page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {parse} from 'cookie';
import {GetServerSideProps} from 'next';
import Title from '../components/common/Title';
import SettingPage from '../components/setting/SettingPage';

const Setting = () => {
  return (
    <>
      <Title title="設定" />
      <SettingPage />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  if (
    !context.req.headers.cookie ||
    typeof parse(context.req.headers.cookie)['session_token'] === 'undefined'
  ) {
    return {
      redirect: {
        statusCode: 301,
        destination: '/',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Setting;
