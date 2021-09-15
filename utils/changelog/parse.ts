/**********************************************************
 * changelog parser.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import * as fs from 'fs';

export interface ChangelogIndex {
  version: string;
  date: string;
}

export interface ChangelogData extends ChangelogIndex {
  // A description of the version written in markdown format.
  details: string;
}

export default class Changelog {
  private indexPath: string;
  private dirPath: string;

  /**
   * Create changelog parse class.
   *
   * @param {string} indexPath - index json path.
   * @param {string} dir - details text dir path.
   */
  constructor(indexPath: string, dir: string) {
    if (fs.existsSync(indexPath)) {
      this.indexPath = indexPath;
    } else {
      throw new Error('indexPath is not exist.');
    }

    if (fs.existsSync(dir)) {
      this.dirPath = dir;
    } else {
      throw new Error('dir is not exist.');
    }
  }

  /**
   * Get the changelogs.
   *
   * @returns {ChangelogData[]} - changelog data.
   */
  public getChangelog(): ChangelogData[] {
    const changelogIndexBin = fs.readFileSync(this.indexPath, 'utf-8');
    const changelogIndex = JSON.parse(changelogIndexBin) as ChangelogIndex[];
    const changelogData: ChangelogData[] = [];

    for (const element of changelogIndex) {
      const detailsPath = this.getTextPath(element.version);
      const detailsBin = fs.readFileSync(detailsPath, 'utf-8');

      changelogData.push({
        details: detailsBin,
        ...element,
      });
    }

    return changelogData;
  }

  /**
   * Get the details text of version.
   *
   * @param {string} version - version
   * @returns {string} - text file path.
   */
  private getTextPath(version: string): string {
    const textPath = `${this.dirPath}/${version}.md`;
    if (fs.existsSync(textPath)) {
      return `${this.dirPath}/${version}.md`;
    }
    throw new Error('text file is not exist');
  }
}
