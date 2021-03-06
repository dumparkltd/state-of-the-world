/*
 * CC Messages
 *
 * This contains all the text for the CC container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.CookieConsent';

export default defineMessages({
  nonEssentialConsentInfo: {
    id: `${scope}.nonEssentialConsentInfo`,
    defaultMessage:
      "We'd like to store cookies and usage data to improve your experience.",
  },
  buttonAccept: {
    id: `${scope}.buttonAccept`,
    defaultMessage: "I'm ok with that",
  },
  buttonReject: {
    id: `${scope}.buttonReject`,
    defaultMessage: 'No thanks',
  },
  additionalInfo: {
    id: `${scope}.additionalInfo`,
    defaultMessage:
      'For any website to function, it is necessary to collect a small amount of user data, so by continuing to use this website, you are consenting to that. To find out more, please read our ',
  },
  linkPrivacyPolicy: {
    id: `${scope}.linkPrivacyPolicy`,
    defaultMessage: 'Privacy Policy',
  },
  linkDialogue: {
    id: `${scope}.linkDialogue`,
    defaultMessage: 'Privacy Settings',
  },
});
