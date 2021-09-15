/**********************************************************
 * Change log
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import path from 'path';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import ChangelogPage from '../components/changelog/ChangelogPage';
import Title from '../components/common/Title';
import ChangelogParse from '../utils/changelog/parse';

const Changelog: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  props => {
    return (
      <>
        <Title title="変更履歴" />
        <ChangelogPage logData={props.logData} />
      </>
    );
  };

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'contents');
  const indexPath = path.join(filePath, 'changelog.json');
  const dirPath = path.join(filePath, 'changelogs');

  const changelog = new ChangelogParse(indexPath, dirPath);
  const contents = changelog.getChangelog();

  return {
    props: {
      logData: contents.reverse(),
    },
  };
};

export default Changelog;
