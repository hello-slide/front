/**********************************************************
 * Slide Create
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
  Input,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import CreateSlide from '../../utils/api/createSlide';
import {SlideState, LoadState} from '../../utils/state/atom';

const NewSlide: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({isOpen, onClose}) => {
  const [title, setTitle] = React.useState('');
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [slides, setSlides] = useRecoilState(SlideState);
  const setIsLoad = useSetRecoilState(LoadState);
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
    const createSlideAPI = new CreateSlide();

    createSlideAPI
      .run(title)
      .then(slideId => {
        setSlides([
          ...slides,
          {
            id: slideId,
            title: title,
            createDate: new Date(),
            lastChange: new Date(),
          },
        ]);
        onClose();
        setIsLoad(false);
      })
      .catch(error => {
        toast({
          title: 'スライドを作成できませんでした',
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
        <ModalHeader textAlign="center" marginTop=".5rem">
          新しいスライドを作成する
        </ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody>
          <FormControl isInvalid={isEmpty}>
            <Input
              placeholder="スライド名"
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

export default NewSlide;
