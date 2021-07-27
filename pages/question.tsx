/**********************************************************
 * Question
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {readFileSync} from 'fs';
import path from 'path';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import QuestionPage from '../components/question/QuestionPage';

const Question: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  props => {
    return <QuestionPage contents={props.contents} />;
  };

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'contents', 'question.md');
  const contents = readFileSync(filePath, 'utf8');

  return {
    props: {
      contents: contents,
    },
  };
};
export default Question;
