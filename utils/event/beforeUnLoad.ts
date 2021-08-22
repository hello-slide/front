/**********************************************************
 * BeforeUnLoad function
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

/**
 * beforeunload handler
 *
 * @param {BeforeUnloadEvent} event - handle event.
 */
function handleBeforeUnloadEvent(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = '';
}

/**
 * add beforeunload.
 */
export function addBeforeUnLoad() {
  window.addEventListener('beforeunload', handleBeforeUnloadEvent);
}

/**
 * remove beforeunload.
 */
export function removeBeforeUnLoad() {
  window.removeEventListener('beforeunload', handleBeforeUnloadEvent);
}
