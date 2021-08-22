/**********************************************************
 * [Module description.]
 *
 * @author YourName <YourMailAddress>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import {SlideDesign} from '../../../../@types/pageItem';

const Design: React.FC<{data: SlideDesign}> = props => {
  switch (props.data?.designType || 'mono') {
    case 'mono':
      return (
        <Box
          height="100%"
          backgroundColor={props.data?.backgroundColor || '#F2F2F2'}
          color={props.data?.textColor || '#000000'}
        >
          {props.children}
        </Box>
      );
    case 'gradation':
      return (
        <Box
          height="100%"
          background={`linear-gradient(to bottom right, ${props.data.backgroundColorStart}, ${props.data.backgroundColorEnd})`}
          color={props.data.textColor}
        >
          {props.children}
        </Box>
      );
  }
};

export default Design;
