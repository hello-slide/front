/**********************************************************
 * Format date.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

/**
 * Format Date.
 *
 * @param {Date} date - Date
 * @param {boolean} isDetail - Display up to minutes.
 * @returns {string} - formatted date.
 */
export default function formatDate(date: Date, isDetail?: boolean): string {
  const formattedDate = `${date.getFullYear()}年 ${
    date.getMonth() + 1
  }月${date.getDate()}日`;

  if (isDetail) {
    return `${formattedDate} ${date.getHours()}時${date.getMinutes()}分`;
  }
  return formattedDate;
}
