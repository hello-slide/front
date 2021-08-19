/**********************************************************
 * Color palette.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Button, Box, useOutsideClick} from '@chakra-ui/react';
import React from 'react';
import {ChromePicker} from 'react-color';
import {IoColorPaletteOutline} from 'react-icons/io5';
import getFontColor from '../../../utils/theme/calColor';

const ColorPalette: React.FC<{
  onChange: (color: string) => void;
  text: string;
  color: string;
}> = ({onChange, text, color}) => {
  const [_color, setColor] = React.useState(color);
  const [show, setShow] = React.useState(false);
  const [isOpened, setIsOpened] = React.useState(false);
  const ref = React.useRef(null);

  useOutsideClick({
    ref: ref,
    handler: () => {
      setShow(false);
    },
  });

  React.useEffect(() => {
    if (show) {
      setIsOpened(true);
    } else if (!show && isOpened) {
      onChange(_color);
    }
  }, [show]);

  return (
    <Box>
      <Button
        size="sm"
        aria-label="select color"
        backgroundColor={color}
        color={getFontColor(color)}
        leftIcon={<IoColorPaletteOutline size="20px" />}
        onClick={() => setShow(true)}
      >
        {text}
      </Button>
      {show && (
        <Box ref={ref} position="relative">
          <Box position="absolute" zIndex="2">
            <ChromePicker
              color={_color}
              disableAlpha
              onChange={color => {
                setColor(color.hex);
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ColorPalette;
