/**********************************************************
 * Based on https://github.com/chakra-ui/chakra-ui/issues/3013#issuecomment-841547885
 **********************************************************/
import {chakra, HTMLChakraProps} from '@chakra-ui/react';
import {HTMLMotionProps, motion} from 'framer-motion';
import React from 'react';

type Merge<P, T> = Omit<P, keyof T> & T;

export type MotionBoxProps = Merge<
  HTMLChakraProps<'div'>,
  HTMLMotionProps<'div'>
>;

export const MotionBox: React.FC<MotionBoxProps & { ref?: any }> = motion(
  chakra.div
);
