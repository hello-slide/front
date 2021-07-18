/**********************************************************
 * [Module description.]
 *
 * @author Yoshitsugu Tahara <arisahyper0000@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
export const GA_TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID || '';

export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
