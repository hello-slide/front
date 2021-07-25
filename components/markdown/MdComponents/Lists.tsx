/**********************************************************
 * md lists
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {UnorderedList, ListItem, OrderedList} from '@chakra-ui/react';

export const Ul: React.FC = ({children}) => {
  return <UnorderedList paddingLeft="1.75rem">{children}</UnorderedList>;
};

export const Ol: React.FC = ({children}) => {
  return <OrderedList paddingLeft="1.75rem">{children}</OrderedList>;
};

export const Li: React.FC = ({children}) => {
  return <ListItem>{children}</ListItem>;
};
