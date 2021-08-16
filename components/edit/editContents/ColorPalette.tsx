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
import {BlockPicker} from 'react-color';
import {IoColorPaletteOutline} from 'react-icons/io5';
import getFontColor from '../../../utils/theme/calColor';

const ColorPalette: React.FC<{
  onChange?: (color: string) => void;
  text: string;
  defaultColor?: string;
}> = ({onChange, text, defaultColor}) => {
  const [openPalette, setOpenPalette] = React.useState(false);
  const [color, setColor] = React.useState(defaultColor || '#ffffff');

  return (
    <>
      <Button
        size="sm"
        aria-label="select color"
        backgroundColor={color}
        color={getFontColor(color)}
        leftIcon={<IoColorPaletteOutline size="20px" />}
        onClick={() => {
          setOpenPalette(value => !value);
        }}
      >
        {text}
      </Button>

      {openPalette ? (
        <>
          <Box position="relative" top="13px" left="-65px" zIndex="2">
            <Box position="fixed" zIndex="2">
              <BlockPicker
                color={color}
                onChange={color => {
                  setColor(color.hex);
                  if (onChange) {
                    onChange(color.hex);
                  }
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
              setOpenPalette(false);
            }}
          ></Box>
        </>
      ) : null}
    </>
  );
};

export default ColorPalette;
