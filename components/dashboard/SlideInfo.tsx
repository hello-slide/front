/**********************************************************
 * Slide details.
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
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import Slide from '../../@types/slides';
import formatDate from '../../utils/date/formantDate';

const SlideInfo: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  slide?: Slide;
}> = ({isOpen, onClose, slide}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginTop=".5rem">
          「{slide?.title}」の詳細情報
        </ModalHeader>
        <ModalCloseButton size="lg" />
        <ModalBody>
          <List>
            <ListItem>
              <Text as="span" fontWeight="bold">
                タイトル:
              </Text>
              <Text as="span" margin=".2rem 0 .2rem .4rem" color="gray.600">
                {slide?.title}
              </Text>
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                ID:
              </Text>
              <Text as="span" margin=".2rem 0 .2rem .4rem" color="gray.600">
                {slide?.id}
              </Text>
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                作成日時:
              </Text>
              <Text as="span" margin=".2rem 0 .2rem .4rem" color="gray.600">
                {formatDate(new Date(slide?.createDate), true)}
              </Text>
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">
                変更日時:
              </Text>
              <Text as="span" margin=".2rem 0 .2rem .4rem" color="gray.600">
                {formatDate(new Date(slide?.lastChange), true)}
              </Text>
            </ListItem>
          </List>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SlideInfo;
