/**********************************************************
 * Page title
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import Head from 'next/head';

const Title: React.FC<{title?: string}> = ({title}) => {
  return (
    <Head>
      <title>
        {typeof title !== 'undefined'
          ? `${title} | Hello Slide`
          : 'Hello Slide'}
      </title>
    </Head>
  );
};

export default Title;
