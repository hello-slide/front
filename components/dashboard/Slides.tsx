/**********************************************************
 * Slides
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Text,
  Wrap,
  Flex,
  WrapItem,
  Box,
  ChakraComponent,
} from '@chakra-ui/react';
import React from 'react';
import {IoAdd, IoTimeOutline} from 'react-icons/io5';
import Slide from '../../@types/slides';
import updateDate from '../../utils/updateDate';
import {
  ContextMenuTrigger,
  ContextMenuList,
  ContextMenuItem,
} from './ContextMenu';

const Slides: React.FC<{slides: Slide[]; onOpen: () => void}> = ({
  slides,
  onOpen,
}) => {
  const ListContents: ChakraComponent<'div', {}> = props => {
    return (
      <WrapItem>
        <Box
          width="250px"
          height="100px"
          borderWidth="1.5px"
          borderRadius="lg"
          {...props}
        >
          {props.children}
        </Box>
      </WrapItem>
    );
  };

  const DateInfo: React.FC<{createDate: Date; lastChangeDate: Date}> = ({
    createDate,
    lastChangeDate,
  }) => {
    const [update, setUpdate] = React.useState(false);

    // Re-render every minute to update the date and time.
    setTimeout(() => {
      setUpdate(!update);
    }, 61000);

    return (
      <Text marginLeft=".5rem">{updateDate(lastChangeDate, createDate)}</Text>
    );
  };

  const handleChange = (id: string) => {
    // TODO: Jump to edit page
    console.log(id);
  };

  return (
    <Wrap
      spacing="40px"
      marginX={{base: '5%', sm: '10%', md: '13%', lg: '17%'}}
    >
      {slides.map(value => {
        const createDate = new Date(value.createDate);
        const lastChangeDate = new Date(value.lastChange);
        return (
          <React.Fragment key={value.id}>
            <ContextMenuTrigger menuId={value.id}>
              <ListContents
                padding=".5rem"
                onClick={() => {
                  handleChange(value.id);
                }}
                cursor="pointer"
              >
                <Text fontWeight="bold" fontSize="1.2rem" marginBottom="1rem">
                  {value.title}
                </Text>
                <Flex alignItems="center" fontSize=".9rem">
                  <IoTimeOutline size="17" />
                  <DateInfo
                    createDate={createDate}
                    lastChangeDate={lastChangeDate}
                  />
                </Flex>
              </ListContents>
            </ContextMenuTrigger>
            <ContextMenuList menuId={value.id}>
              <Text p={2}>{value.title}</Text>
              <ContextMenuItem>Action</ContextMenuItem>
            </ContextMenuList>
          </React.Fragment>
        );
      })}
      <ListContents onClick={onOpen} cursor="pointer">
        <Flex
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          height="100%"
        >
          <IoAdd size="50" />
        </Flex>
      </ListContents>
    </Wrap>
  );
};

export default Slides;
