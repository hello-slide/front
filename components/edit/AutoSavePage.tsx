/**********************************************************
 * Page auto save
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {useRouter} from 'next/router';
import React from 'react';
import useSavePage from '../../hooks/useSavePage';
import {removeBeforeUnLoad} from '../../utils/event/beforeUnLoad';

const AutoSave = () => {
  const router = useRouter();
  const [, setPage] = useSavePage();

  const [nowPath, setNowPath] = React.useState<string>(undefined);

  React.useEffect(() => {
    if (nowPath !== router.asPath) {
      if (nowPath && nowPath.substr(0, 5) === '/edit') {
        removeBeforeUnLoad();
        setPage();
      }

      setNowPath(router.asPath);
    }
  }, [router.asPath]);

  return <></>;
};

export default AutoSave;
