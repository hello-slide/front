/**********************************************************
 * Initialize user.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import React from 'react';
import {useSetRecoilState} from 'recoil';
import _User from '../../utils/api/user';
import {UserDataState} from '../../utils/state/atom';

const User = React.memo(() => {
  const setUserData = useSetRecoilState(UserDataState);

  React.useEffect(() => {
    const userAPI = new _User();
    userAPI.run().then(user => {
      if (user) {
        setUserData(user);
      }
    });
  }, []);

  return <></>;
});

User.displayName = 'user';

export default User;
