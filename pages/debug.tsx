/**********************************************************
 * [Module description.]
 *
 * @author YourName <YourMailAddress>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Button} from '@chakra-ui/react';
import {useSetRecoilState} from 'recoil';
import {UserDataState, LoadState} from '../utils/state/atom';

const Debug = () => {
  const setUserData = useSetRecoilState(UserDataState);
  const setIsLoad = useSetRecoilState(LoadState);

  return (
    <>
      <Button
        onClick={() => {
          setUserData({
            name: 'test太郎',
            image:
              'https://cateiru.com/_next/image?url=%2FmyIcon.png&w=1080&q=75',
            refreshToken: 'hoge',
            sessionToken: 'hoge',
          });
        }}
      >
        ログイン
      </Button>
      <Button onClick={() => setIsLoad(value => !value)}>ロード</Button>
    </>
  );
};

export default Debug;
