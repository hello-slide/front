/**********************************************************
 * [Module description.]
 *
 * @author YourName <YourMailAddress>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useRecoilValue} from 'recoil';
import {CurrentPageState} from '../../utils/state/atom';
import QuizEdit from './editContents/QuizEdit';

const EditMain = () => {
  const currentPage = useRecoilValue(CurrentPageState);

  switch (currentPage?.type) {
    case 'quiz':
      return <QuizEdit id={currentPage?.type} />;

    default:
      return <></>;
  }
};

export default EditMain;
