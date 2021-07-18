// lib/gtag.ts
export const GA_TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID || '';

export const pageview = (url: string): void => {
  if (!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
