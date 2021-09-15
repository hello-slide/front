/**********************************************************
 * Spinner
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useRecoilValue} from 'recoil';
import {LoadState} from '../../utils/state/atom';
import Load from './Load';

const Loading = () => {
  const isLoad = useRecoilValue(LoadState);

  return <Load isLoad={isLoad} />;
};

export default Loading;
