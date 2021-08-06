/**********************************************************
 * user Data type
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

export interface UserData {
  refreshToken?: string;
  sessionToken?: string;
  name: string;
  image: string;
}
