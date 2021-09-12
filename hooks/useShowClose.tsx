/**********************************************************
 * show close hooks
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useSetRecoilState} from 'recoil';
import screenfull from 'screenfull';
import {ShowState, IsHostSocketState, AnswersState} from '../utils/state/atom';

const useShowClose = (): (() => void) => {
  const setShow = useSetRecoilState(ShowState);
  const setIsHostSocket = useSetRecoilState(IsHostSocketState);
  const setAnswers = useSetRecoilState(AnswersState);

  const close = () => {
    if (screenfull.isEnabled && screenfull.isFullscreen) {
      screenfull.exit();
    } else {
      setShow(undefined);
      setIsHostSocket(false);
      setAnswers([]);
    }
  };

  return close;
};

export default useShowClose;
