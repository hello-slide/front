/**********************************************************
 * Delete slide
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Slide from '../../@types/slides';
import deleteSlide from '../../utils/api/deleteSlide';
import {SlideState, LoadState, UserDataState} from '../../utils/state/atom';

const DeleteSlide: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  slide?: Slide;
}> = ({isOpen, onClose, slide}) => {
  const [slides, setSlides] = useRecoilState(SlideState);
  const setIsLoad = useSetRecoilState(LoadState);
  const [userData, setUserData] = useRecoilState(UserDataState);
  const toast = useToast();

  const handleChange = () => {
    setIsLoad(true);
    deleteSlide(
      userData.sessionToken,
      slide?.id,
      userData.refreshToken,
      (sessionToken, refreshToken) => {
        setUserData(value => ({
          name: value.name,
          image: value.image,
          sessionToken: sessionToken,
          refreshToken: refreshToken,
        }));
      }
    )
      .then(() => {
        const _slides = [...slides];
        const index = _slides.findIndex(value => value.id === slide?.id);
        _slides.splice(index, 1);
        setSlides(_slides);
        onClose();
        setIsLoad(false);
      })
      .catch(error => {
        toast({
          title: 'スライドを削除できませんでした',
          description: `${error}`,
          status: 'error',
        });
        setIsLoad(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>「{slide?.title}」を削除しますか？</ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody>この操作は戻すことはできません。</ModalBody>

        <ModalFooter marginBottom=".3rem">
          <Button variant="blue" mr={3} onClick={onClose}>
            キャンセル
          </Button>
          <Button colorScheme="blue" onClick={handleChange}>
            削除する
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSlide;
