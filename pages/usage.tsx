/**********************************************************
 * Usage
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {readFileSync} from 'fs';
import path from 'path';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Title from '../components/common/Title';
import UsagePage from '../components/usage/UsagePage';

const Usage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  props => {
    return (
      <>
        <Title title="使い方" />
        <UsagePage contents={props.contents} />
      </>
    );
  };

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'contents', 'usage.md');
  const contents = readFileSync(filePath, 'utf8');

  return {
    props: {
      contents: contents,
    },
  };
};

export default Usage;
