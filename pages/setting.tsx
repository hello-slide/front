/**********************************************************
 * setting page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {GetServerSideProps} from 'next';
import Title from '../components/common/Title';
import SettingPage from '../components/setting/SettingPage';
import cookie from '../utils/cookie/cookie';

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
    cookie(
      context.req.headers.cookie,
      ['session_token', 'refresh_token'],
      false
    )
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
