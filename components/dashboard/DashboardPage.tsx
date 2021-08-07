/**********************************************************
 * Dashboard page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import NoSSR from 'react-no-ssr';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import Slide from '../../@types/slides';
import listSlide from '../../utils/api/listSlide';
import {
  UserDataState,
  SlideState,
  IsInitializedState,
} from '../../utils/state/atom';
import SlideList from './SlideList';

const DashboardPage = () => {
  const userData = useRecoilValue(UserDataState);
  const router = useRouter();
  const toast = useToast();
  const setSlides = useSetRecoilState(SlideState);
  const isInitializedRef = useRecoilValue(IsInitializedState);

  React.useEffect(() => {
    // Since the component is updated every time Recoil is updated,
    // the initialization process is performed only once at the time of loading.
    // See more: https://zenn.dev/airtoxin/articles/7be9f0ffa5b90f#%E6%9C%80%E7%B5%82%E7%9A%84%E3%81%AA%E3%82%B3%E3%83%BC%E3%83%89
    if (isInitializedRef.value) return;
    isInitializedRef.value = true;

    let isMounted = true;

    if (typeof userData.refreshToken === 'undefined') {
      router.push('/');
    } else if (isMounted) {
      listSlide(userData.sessionToken)
        .then(response => {
          const newSlides: Slide[] = [];
          for (const element of response.slides) {
            newSlides.push({
              title: element.title,
              id: element.id,
              createDate: new Date(
                element.create_date.replace(
                  /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
                  '$4:$5:$6 $2/$3/$1'
                )
              ),
              lastChange: new Date(
                element.change_date.replace(
                  /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
                  '$4:$5:$6 $2/$3/$1'
                )
              ),
            });
          }
          setSlides(newSlides);
        })
        .catch(error => {
          toast({
            title: 'スライドを更新できませんでした',
            description: `${error}`,
            status: 'error',
          });
        });
    }

    return () => {
      isMounted = false;
    };
  });
  return (
    <NoSSR>
      <SlideList />
    </NoSSR>
  );
};

export default DashboardPage;
