/**********************************************************
 * Based on https://github.com/chakra-ui/chakra-ui/issues/3013#issuecomment-841547885
 **********************************************************/
import {Button, Text, HStack, ButtonProps} from '@chakra-ui/react';
import React from 'react';
import {useRecoilState} from 'recoil';
import {contextMenusAtom} from './model';

type Props = {
  colorScheme?: string;
  disabled?: boolean;
  onClick?: ({event: MouseEvent}) => void;
  command?: string;
  icon?: React.ReactElement;
  buttonProps?: ButtonProps;
};

export const ContextMenuItem: React.FC<Props> = ({
  children,
  onClick,
  colorScheme,
  disabled,
  command,
  icon,
  ...buttonProps
}) => {
  const [contextMenusState, setContextMenusState] =
    useRecoilState(contextMenusAtom);

  return (
    <Button
      onClick={e => {
        e.preventDefault();

        // call the provided click handler with the event and the passthrough data from the trigger
        onClick && onClick({event: e});

        // TODO: make it more specific
        // close all menus
        setContextMenusState(oldState => {
          return {
            ...oldState,
            menus: oldState.menus.map(m => ({
              ...m,
              isOpen: false,
            })),
          };
        });
      }}
      borderRadius={0}
      w="full"
      justifyContent="space-between"
      size="sm"
      overflow="hidden"
      textOverflow="ellipsis"
      colorScheme={colorScheme}
      disabled={disabled}
      {...buttonProps}
    >
      {/* left */}
      <HStack spacing={2} alignItems="center" w="full" h="full">
        {/* icon */}
        {icon}
        {/* children */}
        <Text>{children}</Text>
      </HStack>
      {/* right */}
      <Text size="sm" opacity={0.5}>
        {command}
      </Text>
    </Button>
  );
};
