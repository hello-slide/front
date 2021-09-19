/**********************************************************
 * Root page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>, Yoshitsugu Tahara <arisahyper0000@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {GetServerSideProps} from 'next';
import Title from '../components/common/Title';
import RootPage from '../components/root/RootPage';
import cookie from '../utils/cookie/cookie';

const Index = () => {
  return (
    <>
      <Title />
      <RootPage />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  if (cookie(context.req.headers.cookie, ['refresh_token'], true)) {
    return {
      redirect: {
        statusCode: 301,
        destination: '/dashboard',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Index;
