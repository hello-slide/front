/**********************************************************
 * control slideshow
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box, Flex} from '@chakra-ui/react';
import React from 'react';
import {useSetRecoilState} from 'recoil';
import Page from '../../@types/page';
import {PageDetails} from '../../@types/slideshow';
import useShowClose from '../../hooks/useShowClose';
import useShowControl from '../../hooks/useShowControl';
import {SlideshowDataState} from '../../utils/state/atom';
import Load from '../common/Load';
import ChangeContents from './ChangeContetns';

const ShowController: React.FC<{id: string}> = ({id}) => {
  const setSlideshowData = useSetRecoilState(SlideshowDataState);
  const [index, setIndex] = React.useState(0);
  const closeShow = useShowClose();
  const [isLoad, setIsLoad] = React.useState(false);
  const [maxIndex, setMaxIndex] = React.useState(0);
  const [isEndGetPage, setIsEndGetPage] = React.useState(false);
  const [slideData, pageData, load, pageList, setSlideId, getPage] =
    useShowControl();

  const numberOfPageRef = React.useRef<number>();
  const pageRef = React.useRef<AsyncGenerator<PageDetails>>();
  const pageDataRef = React.useRef<Page[]>();
  const pageLockRef = React.useRef<boolean>();

  const keyboardEvent = React.useCallback((event: KeyboardEvent) => {
    if (event.code === 'ArrowRight') {
      nextPage();
    } else if (event.code === 'ArrowLeft') {
      backPage();
    }
  }, []);

  const nextPage = () => {
    // The move is locked until the next page is loaded.
    if (!pageLockRef.current) {
      setIndex(value => {
        if (numberOfPageRef.current && value >= numberOfPageRef.current) {
          return value;
        }

        return (value += 1);
      });
    }
  };

  const backPage = () => {
    // The move is locked until the next page is loaded.
    if (!pageLockRef.current) {
      setIndex(value => {
        if (value > 0) {
          return (value -= 1);
        }
        return value;
      });
    }
  };

  React.useEffect(() => {
    // The slide show ends when you move to the next page on the last page.
    if (numberOfPageRef.current && index >= numberOfPageRef.current) {
      closeShow();
    }

    if (index >= 2 && maxIndex < index && !isEndGetPage) {
      switch (pageData[index - 2]?.type) {
        case 'quiz2':
        case 'question':
          pageLockRef.current = true;
          pageRef.current.next().then(value => {
            if (value.done) {
              setIsEndGetPage(true);
              pageLockRef.current = false;
              return;
            }
            // Get page data async.
            const result = value.value as PageDetails;
            setSlideshowData(value => {
              return [result, ...value];
            });

            pageLockRef.current = false;
          });
          break;
        default:
          break;
      }
      setMaxIndex(index);
    }
  }, [index]);

  React.useEffect(() => {
    setSlideshowData(undefined);
    setIsLoad(true);

    if (id.length !== 0) {
      setSlideId(id);
    }

    return () => {
      document.removeEventListener('keydown', keyboardEvent, false);
    };
  }, []);

  React.useEffect(() => {
    if (typeof pageList !== 'undefined' && typeof pageData !== 'undefined') {
      numberOfPageRef.current = pageData.length + 3;

      const getter = getPage();
      // Load only the first page.
      getter.next().then(value => {
        const result = value.value as PageDetails;
        setSlideshowData([result]);
      });

      pageRef.current = getter;
      pageDataRef.current = pageData;

      document.addEventListener('keydown', keyboardEvent, false);
      setIsLoad(false);
    }
  }, [pageList, pageData]);

  return (
    <>
      <Load isLoad={load || isLoad} />
      <Flex
        position="absolute"
        zIndex="1000"
        left="0"
        top="0"
        width="100%"
        height="100%"
      >
        <Box width="50%" height="100%" onClick={backPage} />
        <Box width="50%" height="100%" onClick={() => nextPage()} />
      </Flex>
      <ChangeContents index={index} pageList={pageData} slideData={slideData} />
    </>
  );
};

export default ShowController;
