/**********************************************************
 * control slideshow
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Page from '../../@types/page';
import SlidePageData from '../../@types/pageItem';
import GetPage from '../../utils/api/getPage';
import ListPages from '../../utils/api/listPage';
import {UserDataState, SlideshowDataState} from '../../utils/state/atom';
import ChangeContents from './ChangeContetns';

const ShowController: React.FC<{id: string}> = ({id}) => {
  const [userData, setUserData] = useRecoilState(UserDataState);
  const toast = useToast();
  const setSlideshowData = useSetRecoilState(SlideshowDataState);
  const [index, setIndex] = React.useState(0);
  const [pageList, setPageList] = React.useState<Page[]>([]);

  const keyboardEvent = React.useCallback((event: KeyboardEvent) => {
    if (event.code === 'ArrowRight') {
      setIndex(value => (value += 1));
    } else if (event.code === 'ArrowLeft') {
      setIndex(value => {
        if (value > 0) {
          return (value -= 1);
        }
        return value;
      });
    }
  }, []);

  const getPage = async (
    getPage: GetPage,
    pageId: string
  ): Promise<SlidePageData> => {
    return await getPage.run(id, pageId);
  };

  React.useEffect(() => {
    // reset state
    setSlideshowData(undefined);

    const api = () => {
      const listPagesAPI = new ListPages(
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

      const getPageAPI = new GetPage(
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

      listPagesAPI
        .run(id)
        .then(async value => {
          const pageLists = [];
          const data: {key: string; value: SlidePageData}[] = [];
          for (const element of value.pages) {
            if (element.type === 'quiz') {
              pageLists.push({id: element.page_id, type: 'quiz1'});
              pageLists.push({id: element.page_id, type: 'quiz2'});
            } else if (element.type === 'question') {
              pageLists.push({id: element.page_id, type: 'question'});
            }

            try {
              data.push({
                key: element.page_id,
                value: await getPage(getPageAPI, element.page_id),
              });
            } catch (error) {
              toast({
                title: 'ページを読み込めませんでした。',
                description: `${error}`,
                status: 'error',
              });
            }
          }
          setPageList(pageLists);

          setSlideshowData({
            title: value.title,
            id: value.id,
            createDate: value.createDate,
            lastChange: value.lastChange,
            data: data,
            // TODO: session id create logic
            session: Math.floor(Math.random() * 100000).toString(),
          });
        })
        .catch(error => {
          toast({
            title: 'スライドを読み込めませんでした',
            description: `${error}`,
            status: 'error',
          });
        });
    };
    api();

    document.addEventListener('keydown', keyboardEvent, false);

    return () => {
      document.removeEventListener('keydown', keyboardEvent, false);
    };
  }, []);

  return <ChangeContents index={index} pageList={pageList}></ChangeContents>;
};

export default ShowController;
