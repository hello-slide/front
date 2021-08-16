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
import {useRecoilState} from 'recoil';
import {ColorPaletteState} from '../../../utils/state/atom';
import getFontColor from '../../../utils/theme/calColor';

const ColorPalette: React.FC<{
  onChange?: (color: string) => void;
  text: string;
  color: string;
  keyIndex: string;
}> = ({onChange, text, color, keyIndex}) => {
  const [openPalette, setOpenPalette] = useRecoilState(ColorPaletteState);

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
            <Box position="fixed" zIndex="2">
              <BlockPicker
                color={color}
                onChange={color => {
                  if (onChange) {
                    onChange(color.hex);
                  }
                }}
                colors={[
                  '#0031D4',
                  '#00D0FF',
                  '#FF55FB',
                  '#D9E3F0',
                  '#F47373',
                  '#697689',
                  '#37D67A',
                  '#2CCCE4',
                  '#555555',
                  '#dce775',
                  '#ff8a65',
                  '#ba68c8',
                  '#f2f2f2',
                  '#000000',
                ]}
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
            }}
          ></Box>
        </>
      ) : null}
    </Box>
  );
};

export default ColorPalette;
