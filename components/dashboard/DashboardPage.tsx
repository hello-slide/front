/**********************************************************
 * Dashboard page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast, IconButton, Flex} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';
import {IoReload} from 'react-icons/io5';
import NoSSR from 'react-no-ssr';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Slide from '../../@types/slides';
import ListSlides from '../../utils/api/listSlide';
import {UserDataState, SlideState} from '../../utils/state/atom';
import Show from '../show/Show';
import SlideList from './SlideList';

const DashboardPage = () => {
  const [userData, setUserData] = useRecoilState(UserDataState);
  const router = useRouter();
  const toast = useToast();
  const setSlides = useSetRecoilState(SlideState);
  const [update, setUpdate] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);

  React.useEffect(() => {
    if (typeof userData.refreshToken === 'undefined') {
      router.push('/');
    }
  }, [userData]);

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted && typeof userData.refreshToken !== 'undefined') {
      setIsLoad(true);
      const listSlidesAPI = new ListSlides(
        userData.sessionToken,
        userData.refreshToken,
        (sessionToken, refreshToken, isFailed) => {
          if (isFailed) {
            setUserData({
              name: '',
              image: '',
            });
          } else {
            setUserData(value => ({
              name: value.name,
              image: value.image,
              sessionToken: sessionToken,
              refreshToken: refreshToken,
            }));
          }
        }
      );
      listSlidesAPI
        .run()
        .then(response => {
          const newSlides: Slide[] = [];
          for (const element of response.slides) {
            newSlides.push({
              title: element.title,
              id: element.id,
              createDate: new Date(
                element.create_date.replace(
                  /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
                  '$1/$2/$3 $4:$5:$6'
                )
              ),
              lastChange: new Date(
                element.change_date.replace(
                  /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
                  '$1/$2/$3 $4:$5:$6'
                )
              ),
            });
          }
          setSlides(newSlides);
          setIsLoad(false);
        })
        .catch(error => {
          toast({
            title: 'スライドを更新できませんでした',
            description: `${error}`,
            status: 'error',
          });
          setIsLoad(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [update]);

  return (
    <>
      <NoSSR>
        <Flex justifyContent="flex-end" margin=".5rem 3.2rem .5rem 0">
          <IconButton
            variant="outline"
            aria-label="Reload"
            fontSize="20px"
            icon={<IoReload />}
            isLoading={isLoad}
            onClick={() => {
              setUpdate(value => !value);
            }}
          />
        </Flex>
        <SlideList />
      </NoSSR>
      <Show />
    </>
  );
};

export default DashboardPage;
