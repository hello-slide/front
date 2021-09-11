/**********************************************************
 * realtime connection type.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
export default interface Socket {
  type: string;
}

export interface ReqSocket extends Socket {
  // used in type `1`
  id?: string;

  // used in type `4`
  topic?: string;

  // used in type `6`
  answer?: string;
  name?: string;
}

export interface ResSocket extends Socket {
  // used in type `0` and `1`
  version?: string;

  // used in type `0`
  id?: string;

  // used in type `2`
  visitors?: string;

  // used in type `3`
  answers?: Answer[];

  // used in type `5`
  topic?: string;
}

export interface Answer {
  id: string;
  user_id: string;
  name: string;
  answer: string;
}
