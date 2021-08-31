/**********************************************************
 * Delete page
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import _DeletePage from '../../utils/api/deletePage';
import {
  PagesState,
  NowPageDataState,
  LoadState,
  CurrentPageState,
} from '../../utils/state/atom';

const DeletePage: React.FC<{
  pageId: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({pageId, isOpen, onClose}) => {
  const [pages, setPages] = useRecoilState(PagesState);
  const nowPageData = useRecoilValue(NowPageDataState);
  const toast = useToast();
  const setLoad = useSetRecoilState(LoadState);
  const [currentPage, setCurrentPage] = useRecoilState(CurrentPageState);

  const handleChange = () => {
    setLoad(true);
    onClose();

    const deletePageAPI = new _DeletePage();
    deletePageAPI
      .run(nowPageData?.id, pageId)
      .then(() => {
        const _pages = [...pages];
        const index = _pages.findIndex(value => value.id === pageId);

        if (pageId === currentPage?.id) {
          if (index !== _pages.length - 1) {
            setCurrentPage(pages[index + 1]);
          } else {
            setCurrentPage(pages[index - 1]);
          }
        }
        _pages.splice(index, 1);
        setPages(_pages);
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        toast({
          title: 'ページを削除できませんでした',
          description: `${error}`,
          status: 'error',
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>削除しますか？</ModalHeader>
        <ModalCloseButton size="lg" />

        <ModalFooter>
          <Button onClick={onClose} marginRight=".5rem">
            キャンセル
          </Button>
          <Button colorScheme="blue" onClick={handleChange}>
            削除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeletePage;
