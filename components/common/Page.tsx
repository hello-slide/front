/**********************************************************
 * Page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import Footer from './Footer';

const Page: React.FC = ({children}) => {
  return (
    <React.Fragment>
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default Page;
