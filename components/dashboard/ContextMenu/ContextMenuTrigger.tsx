/**********************************************************
 * Based on https://github.com/chakra-ui/chakra-ui/issues/3013#issuecomment-841547885
 **********************************************************/
import {Box} from '@chakra-ui/react';
import React, {MouseEvent} from 'react';
import {useSetRecoilState} from 'recoil';
import {contextMenusAtom} from './model';

type Props = {
  menuId: string;
  onTrigger?: Function; // run an optional function on right click trigger
};

export const ContextMenuTrigger: React.FC<Props> = ({
  children,
  menuId,
  onTrigger = () => {},
}) => {
  const setContextMenusState = useSetRecoilState(contextMenusAtom);

  // when the trigger is right clicked,
  // we want to add a menu in our context or update it if it already exists
  return (
    <Box
      onContextMenu={(event: MouseEvent) => {
        // dont show the browser menu
        event.preventDefault();

        // run an optional action on trigger
        onTrigger();

        // update the position where the ContextMenuList should be shown
        setContextMenusState(oldState => ({
          ...oldState,
          // update the mouse position
          position: {
            x: event.clientX,
            y: event.clientY,
          },
          // update which menu should be showing
          menus: oldState.menus.find(m => m.id === menuId)
            ? // open the menu if it exists and close all others
              oldState.menus.map(m => {
                if (m.id === menuId) {
                  return {
                    ...m,
                    isOpen: true,
                  };
                }
                return {
                  ...m,
                  isOpen: false,
                };
              })
            : // create the menu if it doesnt exist and close all others
              [
                {
                  id: menuId,
                  isOpen: true,
                },
                ...oldState.menus.map(m => {
                  return {
                    ...m,
                    isOpen: false,
                  };
                }),
              ],
        }));
      }}
    >
      {children}
    </Box>
  );
};
