/**********************************************************
 * Dashboard
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {GetServerSideProps} from 'next';
import Title from '../components/common/Title';
import DashboardPage from '../components/dashboard/DashboardPage';
import cookie from '../utils/cookie/cookie';

const Dashboard = () => {
  return (
    <>
      <Title title="ダッシュボード" />
      <DashboardPage />
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

export default Dashboard;
