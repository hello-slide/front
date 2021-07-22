/**********************************************************
 * Google Login
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {Button} from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';
import {FcGoogle} from 'react-icons/fc';
import {useRecoilState} from 'recoil';
import {UserDataState} from '../../utils/state/atom';

const Login = () => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const [, setUserData] = useRecoilState(UserDataState);

  const handleGoogleLogin = response => {
    // TODO: Authentication process on the server
    setUserData({
      token: response.accessToken,
      name: response.profileObj.name,
      image: response.profileObj.imageUrl,
    });
  };

  return (
    <GoogleLogin
      clientId={googleClientId}
      render={renderProps => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          leftIcon={<FcGoogle />}
        >
          Googleでログイン
        </Button>
      )}
      buttonText="Login"
      onSuccess={response => handleGoogleLogin(response)}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default Login;
