/**********************************************************
 * 404 page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import Title from '../components/common/Title';
import NotFoundPage from '../components/error/NotFoundPage';

const NotFound = () => {
  return (
    <>
      <Title title="404" />
      <NotFoundPage />
    </>
  );
};

export default NotFound;
