/**********************************************************
 * Edit page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import Title from '../../components/common/Title';
import EditPage from '../../components/edit/EditPage';

const Edit = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <>
      <Title title="編集" />
      <EditPage id={id} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      noFooter: true,
    },
  };
};

export default Edit;
