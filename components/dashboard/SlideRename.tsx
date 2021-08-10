/**********************************************************
 * Slide rename.
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
  FormControl,
  FormErrorMessage,
  useToast,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Slide from '../../@types/slides';
import renameSlide from '../../utils/api/renameSlide';
import {SlideState, LoadState, UserDataState} from '../../utils/state/atom';

const SlideRename: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  slide: Slide;
}> = ({isOpen, onClose, slide}) => {
  const [title, setTitle] = React.useState('');
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [slides, setSlides] = useRecoilState(SlideState);
  const setIsLoad = useSetRecoilState(LoadState);
  const [userData, setUserData] = useRecoilState(UserDataState);
  const toast = useToast();

  // The slide name will be reset once the modal is closed.
  React.useEffect(() => {
    setTitle('');
    setIsEmpty(false);
  }, [isOpen]);

  const handleChange = () => {
    if (title.length === 0) {
      setIsEmpty(true);
      return;
    }

    setIsLoad(true);

    renameSlide(
      slide.id,
      title,
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
    )
      .then(() => {
        const newSlides = [...slides];
        const targetIndex = newSlides.findIndex(value => {
          return value.id === slide.id;
        });
        const buffer: Slide = {
          ...newSlides[targetIndex],
          title: title,
        };

        newSlides[targetIndex] = buffer;

        setSlides(newSlides);
        onClose();
        setIsLoad(false);
      })
      .catch(error => {
        toast({
          title: 'スライドの名前を変更できませんでした',
          description: `${error}`,
          status: 'error',
        });
        setIsLoad(false);
      });
  };

  const textInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (title.length !== 0) {
      setIsEmpty(false);
    }
    setTitle(event.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginTop=".5rem">
          「{slide?.title}」の名前を変更します
        </ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody>
          <FormControl isInvalid={isEmpty}>
            <Input
              placeholder="新しいスライド名"
              value={title}
              onChange={textInput}
              isInvalid={isEmpty}
            />
            <FormErrorMessage>スライド名を入力してください</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleChange}>
            作成
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SlideRename;
