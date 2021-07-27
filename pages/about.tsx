/**********************************************************
 * About
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {readFileSync} from 'fs';
import path from 'path';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import AboutPage from '../components/about/AboutPage';

const About: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  props => {
    return <AboutPage contents={props.contents} />;
  };

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'contents', 'about.md');
  const contents = readFileSync(filePath, 'utf8');

  return {
    props: {
      contents: contents,
    },
  };
};

export default About;
