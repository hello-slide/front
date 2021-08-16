/**********************************************************
 * [Module description.]
 *
 * @author YourName <YourMailAddress>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import {useRecoilValue} from 'recoil';
import {CurrentPageState} from '../../utils/state/atom';

const EditMain = () => {
  const currentPage = useRecoilValue(CurrentPageState);
  return (
    <Box>
      * 現在のページID: {currentPage?.id}
      <br />* 現在のページタイプ: {currentPage?.type}
    </Box>
  );
};

export default EditMain;
