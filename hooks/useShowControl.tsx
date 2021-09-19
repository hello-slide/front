/**********************************************************
 * show controller hooks.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useToast} from '@chakra-ui/react';
import React from 'react';
import Page from '../@types/page';
import {GetAPIPageData} from '../@types/page';
import SlidePageData from '../@types/pageItem';
import Slide from '../@types/slides';
import {PageDetails} from '../@types/slideshow';
import GetPage from '../utils/api/getPage';
import ListPages from '../utils/api/listPage';

const useShowControl = (): [
  Slide,
  Page[],
  boolean,
  GetAPIPageData[],
  React.Dispatch<React.SetStateAction<string>>,
  () => AsyncGenerator<PageDetails>
] => {
  const [slideId, setSlideId] = React.useState('');
  const [slideData, setSlideData] = React.useState<Slide>();
  const [pageData, setPageData] = React.useState<Page[]>();
  const [isLoad, setIsLoad] = React.useState(false);
  const [pageList, setPageList] = React.useState<GetAPIPageData[]>([]);

  const toast = useToast();

  React.useEffect(() => {
    if (slideId.length !== 0) {
      setIsLoad(true);
      const listPagesAPI = new ListPages();

      const api = async () => {
        try {
          const value = await listPagesAPI.run(slideId);

          const pageLists = [];
          setPageList(value.pages);

          for (const element of value.pages) {
            if (element.type === 'quiz') {
              pageLists.push({id: element.page_id, type: 'quiz1'});
              pageLists.push({id: element.page_id, type: 'quiz2'});
            } else if (element.type === 'question') {
              pageLists.push({id: element.page_id, type: 'question'});
            }
          }
          setPageData(pageLists);

          setSlideData({
            title: value.title,
            id: value.id,
            createDate: value.createDate,
            lastChange: value.lastChange,
          });

          setIsLoad(false);
        } catch (error) {
          setIsLoad(false);
          toast({
            title: 'スライドを読み込めませんでした',
            description: `${error}`,
            status: 'error',
          });
        }
      };
      api();
    }
  }, [slideId]);

  /**
   * get page details.
   *
   * @yields {{key: string;value: SlidePageData}} - page data.
   */
  async function* getPage(): AsyncGenerator<{
    key: string;
    value: SlidePageData;
  }> {
    const getPageAPI = new GetPage();

    for (const element of pageList) {
      try {
        const pageDetails = getPageAPI.run(slideId, element.page_id);
        yield {
          key: element.page_id,
          value: await pageDetails,
        };
      } catch (error) {
        toast({
          title: 'ページを読み込めませんでした。',
          description: `${error}`,
          status: 'error',
        });
        yield undefined;
      }
    }
  }

  return [slideData, pageData, isLoad, pageList, setSlideId, getPage];
};

export default useShowControl;
