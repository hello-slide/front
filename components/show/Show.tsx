/**********************************************************
 * Start slideshow
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useRecoilValue} from 'recoil';
import {ShowState} from '../../utils/state/atom';
import ShowDisplay from './ShowDisplay';

const Show = () => {
  const show = useRecoilValue(ShowState);
  return <>{show && <ShowDisplay id={show} />}</>;
};

export default Show;
