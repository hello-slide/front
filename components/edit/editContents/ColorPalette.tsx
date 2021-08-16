/**********************************************************
 * Color palette.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Button, Box} from '@chakra-ui/react';
import React from 'react';
import {ChromePicker} from 'react-color';
import {IoColorPaletteOutline} from 'react-icons/io5';
import {useRecoilState} from 'recoil';
import {ColorPaletteState} from '../../../utils/state/atom';
import getFontColor from '../../../utils/theme/calColor';

const ColorPalette: React.FC<{
  onChange: (color: string) => void;
  text: string;
  color: string;
  keyIndex: string;
}> = ({onChange, text, color, keyIndex}) => {
  const [openPalette, setOpenPalette] = useRecoilState(ColorPaletteState);
  const [_color, setColor] = React.useState(color);

  return (
    <Box>
      <Button
        size="sm"
        aria-label="select color"
        backgroundColor={color}
        color={getFontColor(color)}
        leftIcon={<IoColorPaletteOutline size="20px" />}
        onClick={() => {
          const value = {...openPalette};
          value[keyIndex] = value[keyIndex] ? !value[keyIndex] : true;
          setOpenPalette(value);
        }}
      >
        {text}
      </Button>
      {openPalette[keyIndex] ? (
        <>
          <Box position="relative" top="13px" left="-65px" zIndex="2">
            <Box
              position="absolute"
              zIndex="2"
              onMouseUp={() => onChange(_color)}
            >
              <ChromePicker
                color={_color}
                onChange={color => {
                  setColor(color.hex);
                }}
              />
            </Box>
          </Box>
          <Box
            position="absolute"
            zIndex="1"
            width="100%"
            height="100%"
            top="0px"
            left="0px"
            onClick={() => {
              const value = {...openPalette};
              value[keyIndex] = false;
              setOpenPalette(value);
              onChange(_color);
            }}
          ></Box>
        </>
      ) : null}
    </Box>
  );
};

export default ColorPalette;
