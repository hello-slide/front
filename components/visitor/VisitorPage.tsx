/**********************************************************
 * Visitor page.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Box} from '@chakra-ui/react';
import React from 'react';
import VisitorController from './VisitorController';

const VisitorPage: React.FC<{id: string | string[]}> = ({id}) => {
  const ref = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <Box ref={ref} width="100%" height="100vh">
      <VisitorController id={id} />
    </Box>
  );
};

export default VisitorPage;
