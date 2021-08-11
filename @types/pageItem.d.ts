/**********************************************************
 * page items
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

export interface SlideDesign {
  designType: 'mono' | 'gradation';

  backgroundColor?: string;

  backgroundColorStart?: string;
  backgroundColorEnd?: string;
}

export interface Quiz {
  title: string;
  id: string;
  type: 'quiz';
  numberOfChoices: number;
  choices: {
    text: string;
    id: string;
  }[];
  slideDesign: SlideDesign;
  result?: {
    participant: number;
    choices: {
      id: string;
      people: number;
    };
  };
}

export interface Question {
  text: string;
  id: string;
  type: 'question';
  isAnonymous: boolean;
  slideDesign: SlideDesign;
  result?: {
    participant: number;
    questions: {
      text: string;
      author?: string;
    }[];
  };
}
