/**********************************************************
 * control slideshow
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast, Box, Flex} from '@chakra-ui/react';
import React from 'react';
import {useSetRecoilState} from 'recoil';
import Page from '../../@types/page';
import SlidePageData from '../../@types/pageItem';
import useShowClose from '../../hooks/useShowClose';
import GetPage from '../../utils/api/getPage';
import ListPages from '../../utils/api/listPage';
import {SlideshowDataState} from '../../utils/state/atom';
import Load from '../common/Load';
import ChangeContents from './ChangeContetns';

const ShowController: React.FC<{id: string}> = ({id}) => {
  const toast = useToast();
  const setSlideshowData = useSetRecoilState(SlideshowDataState);
  const [index, setIndex] = React.useState(0);
  const [pageList, setPageList] = React.useState<Page[]>([]);
  const [load, setIsLoad] = React.useState(false);
  const closeShow = useShowClose();
  let maxPage = 3; // header page * 2 and end page.

  const keyboardEvent = React.useCallback((event: KeyboardEvent) => {
    if (event.code === 'ArrowRight') {
      nextPage(false);
    } else if (event.code === 'ArrowLeft') {
      backPage();
    }
  }, []);

  const nextPage = (useJsx: boolean) => {
    setIndex(value => {
      if (!useJsx && value >= maxPage) {
        return value;
      } else if (useJsx && value >= pageList.length + 3) {
        return value;
      }
      return (value += 1);
    });
  };

  const backPage = () => {
    setIndex(value => {
      if (value > 0) {
        return (value -= 1);
      }
      return value;
    });
  };

  const getPage = async (
    getPage: GetPage,
    pageId: string
  ): Promise<SlidePageData> => {
    return await getPage.run(id, pageId);
  };

  React.useEffect(() => {
    if (index >= pageList.length + 3) {
      closeShow();
    }
  }, [index]);

  React.useEffect(() => {
    // reset state
    setSlideshowData(undefined);
    setIsLoad(true);

    const listPagesAPI = new ListPages();

    const getPageAPI = new GetPage();

    const api = async () => {
      try {
        const value = await listPagesAPI.run(id);

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
        });

        maxPage += pageLists.length;
        document.addEventListener('keydown', keyboardEvent, false);
      } catch (error) {
        toast({
          title: 'スライドを読み込めませんでした',
          description: `${error}`,
          status: 'error',
        });
      }

      setIsLoad(false);
    };
    api();

    return () => {
      document.removeEventListener('keydown', keyboardEvent, false);
    };
  }, []);

  return (
    <>
      <Load isLoad={load} />
      <Flex
        position="absolute"
        zIndex="1000"
        left="0"
        top="0"
        width="100%"
        height="100%"
      >
        <Box width="50%" height="100%" onClick={backPage} />
        <Box width="50%" height="100%" onClick={() => nextPage(true)} />
      </Flex>
      <ChangeContents index={index} pageList={pageList} />
    </>
  );
};

export default ShowController;
