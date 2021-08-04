/**********************************************************
 * Based on https://github.com/chakra-ui/chakra-ui/issues/3013#issuecomment-841547885
 **********************************************************/
import {atom} from 'recoil';

type MousePosition = {
  x: number;
  y: number;
};

export interface IContextMenu {
  id: string;
  isOpen: boolean;
}

export type IContextMenus = {
  // where should the menu be shown
  position: MousePosition;
  // what menu should be shown?
  menus: IContextMenu[];
};

// Context Menus
export const contextMenusAtom = atom<IContextMenus>({
  key: 'contextMenusAtom',
  default: {
    position: {
      x: 0,
      y: 0,
    },
    menus: [],
  },
});
