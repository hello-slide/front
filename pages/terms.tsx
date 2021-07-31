/**********************************************************
 * terms of use
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
import TermsPage from '../components/terms/TermsPage';

const Terms: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  props => {
    return (
      <>
        <Title title="利用規約" />
        <TermsPage contents={props.contents} />
      </>
    );
  };

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'contents', 'terms.md');
  const contents = readFileSync(filePath, 'utf8');

  return {
    props: {
      contents: contents,
    },
  };
};

export default Terms;
