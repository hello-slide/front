/**********************************************************
 * visitor page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useRouter} from 'next/router';
import Title from '../components/common/Title';
import VisitorPage from '../components/visitor/VisitorPage';

const Visitor = () => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <>
      <Title title="視聴者" />
      <VisitorPage id={id} />
    </>
  );
};

export default Visitor;
