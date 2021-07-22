/**********************************************************
 * Change log
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {readFileSync} from 'fs';
import path from 'path';
import {GetStaticProps} from 'next';
import {InferGetStaticPropsType} from 'next';
import ChangeLogType from '../@types/changelog';
import ChangelogPage from '../components/changelog/ChangelogPage';

const Changelog: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  props => {
    return <ChangelogPage logData={props.logData} />;
  };

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'contents', 'changelog.json');
  const contents = JSON.parse(
    readFileSync(filePath, 'utf8')
  ) as ChangeLogType[];

  return {
    props: {
      logData: contents.reverse(),
    },
  };
};

export default Changelog;
