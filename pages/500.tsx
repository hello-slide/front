/**********************************************************
 * 500 page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import Title from '../components/common/Title';
import InternalServerErrorPage from '../components/error/InternalServerErrorPage';

const InternalServerError = () => {
  return (
    <>
      <Title title="500" />
      <InternalServerErrorPage />
    </>
  );
};

export default InternalServerError;
