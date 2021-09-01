/**********************************************************
 * Cookie utils.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

/**
 * Cookie parse and searcher.
 *
 * @param {string} _cookie - Cookie value.
 * @param {string[]} keys - Target cookie keys.
 * @param {boolean} isExist - If true The function returns true if there is a corresponding cookie.
 * @returns {boolean} - Whether the corresponding cookie exists. (or not)
 */
export default function cookie(
  _cookie: string,
  keys: string[],
  isExist: boolean
): boolean {
  if (typeof _cookie !== 'string') {
    return !isExist;
  }

  const cookies = _cookie.split('; ');
  let keysLength = 0;

  for (const cookieKeyValue of cookies) {
    const [key, _value] = cookieKeyValue.split('=');
    let value = _value;

    if ('"' === value[0]) {
      value = value.slice(1, -1);
    }

    if (keys.includes(key)) {
      if (!isExist && value) {
        // exist
        return false;
      } else if (isExist && value) {
        keysLength++;
      }
    }
  }

  return (keys.length === keysLength) === isExist;
}
