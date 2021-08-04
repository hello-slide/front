/**********************************************************
 * Calculate update date
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

/**
 * Formats and returns how many days ago it was created or modified.
 *
 * @param {Date} targetDate - The target date and time of the slide. If you create a new one,
 *                            it will be the same time as createDate.
 * @param {Date} createDate - The date and time when the slide was created.
 * @returns {string} A formatted string.
 */
export default function updateDate(targetDate: Date, createDate: Date): string {
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  let updateOrCreate = '更新';
  if (createDate.getTime() === targetDate.getTime()) {
    updateOrCreate = '作成';
  }

  if (diffSec < 3600) {
    return `${Math.floor(diffSec / 60)}分前に${updateOrCreate}`;
  } else if (diffSec < 86400) {
    return `${Math.floor(diffSec / 3600)}時間前に${updateOrCreate}`;
  } else if (diffSec < 86400 * 7) {
    return `${Math.floor(diffSec / 86400)}日前に${updateOrCreate}`;
  } else {
    return `${targetDate.getFullYear()}年 ${targetDate.getMonth() + 1}月${
      targetDate.getDate() + 1
    }日 ${updateOrCreate}`;
  }
}
