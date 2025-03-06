import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // Get all files depending on naming
  const globalTranslation = (await import(`../../messages/${locale}/global.json`)).default;

  // Inputs
  const inputsTranslation = (await import(`../../messages/${locale}/inputs.json`)).default;

  // Header
  const headerTranslation = (await import(`../../messages/${locale}/header.json`)).default;

  // Footer
  const footerTranslation = (await import(`../../messages/${locale}/footer.json`)).default;

  // Home page components
  const homeHeroTranslation = (await import(`../../messages/${locale}/home/hero.json`)).default;
  const homeHowItWorksTranslation = (await import(`../../messages/${locale}/home/howItWorks.json`)).default;
  const homeWhyChooseUsTranslation = (await import(`../../messages/${locale}/home/whyChooseUs.json`)).default;
  const homeCategoriesTranslation = (await import(`../../messages/${locale}/home/categories.json`)).default;

  // The object that will hold all the translations
  const messages = {
    global: {
      ...globalTranslation,
    },
    inputs: {
      ...inputsTranslation,
    },
    header: {
      ...headerTranslation,
    },
    footer: {
      ...footerTranslation,
    },

    // Root Pages
    home: {
      ...homeHeroTranslation,
      ...homeHowItWorksTranslation,
      ...homeWhyChooseUsTranslation,
      ...homeCategoriesTranslation,
    },
  };

  return {
    locale,
    messages,
  };
});
