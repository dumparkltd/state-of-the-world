/**
 *
 * Overview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import logoNorway from 'images/logos/logo_NorwegianMinistryFA.png';
import logoDenmark from 'images/logos/logo_PermanentMissionDenmark.png';
import logoHRMI from 'images/logos/logo_HRMI.png';
import logoSERF from 'images/logos/logo_SERF_www.png';
import logoURG from 'images/logos/logo_URG.png';
import logoDumpark from 'images/logos/logo_dumpark.png';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import messages from './messages';

const SectionTitleSecondary = styled.h4`
  font-size: 16px;
  text-transform: uppercase;
`;
const LabelCredit = styled(p => <Text size="small" {...p} />)`
  color: ${({ theme }) => theme.global.colors['dark-4']};
`;

const ACredit = styled.a`
  &:hover {
    opacity: 0.85;
  }
`;

export function SectionCredits({ intl }) {
  return (
    <SectionContainer pad={{ vertical: 'small' }} background="white">
      <ContentMaxWidth column>
        <SectionTitleSecondary>
          <FormattedMessage {...messages.title} />
        </SectionTitleSecondary>
        <Box
          direction="row"
          justify="center"
          gap="small"
          margin={{ bottom: 'large' }}
        >
          <Box>
            <LabelCredit>
              <FormattedMessage {...messages.main} />
            </LabelCredit>
            <ACredit
              href={intl.formatMessage(messages.link_urg)}
              target="_blank"
              title={intl.formatMessage(messages.link_urg_title)}
            >
              <img
                src={logoURG}
                alt={intl.formatMessage(messages.link_urg_title)}
              />
            </ACredit>
          </Box>
          <Box>
            <LabelCredit>
              <FormattedMessage {...messages.data} />
            </LabelCredit>
            <Box direction="row">
              <ACredit
                href={intl.formatMessage(messages.link_hrmi)}
                target="_blank"
                title={intl.formatMessage(messages.link_hrmi_title)}
              >
                <img
                  src={logoHRMI}
                  alt={intl.formatMessage(messages.link_hrmi_title)}
                />
              </ACredit>
              <ACredit
                href={intl.formatMessage(messages.link_serf)}
                target="_blank"
                title={intl.formatMessage(messages.link_serf_title)}
              >
                <img
                  src={logoSERF}
                  alt={intl.formatMessage(messages.link_serf_title)}
                />
              </ACredit>
            </Box>
          </Box>
        </Box>
        <Box
          direction="row"
          justify="center"
          gap="small"
          margin={{ bottom: 'medium' }}
        >
          <Box>
            <LabelCredit>
              <FormattedMessage {...messages.funding} />
            </LabelCredit>
            <Box direction="row">
              <ACredit
                href={intl.formatMessage(messages.link_norway)}
                target="_blank"
                title={intl.formatMessage(messages.link_norway_title)}
              >
                <img
                  src={logoNorway}
                  alt={intl.formatMessage(messages.link_norway_title)}
                />
              </ACredit>
              <ACredit
                href={intl.formatMessage(messages.link_denmark)}
                target="_blank"
                title={intl.formatMessage(messages.link_denmark_title)}
              >
                <img
                  src={logoDenmark}
                  alt={intl.formatMessage(messages.link_denmark_title)}
                />
              </ACredit>
            </Box>
          </Box>
          <Box>
            <LabelCredit>
              <FormattedMessage {...messages.development} />
            </LabelCredit>
            <ACredit
              href={intl.formatMessage(messages.link_dumpark)}
              target="_blank"
              title={intl.formatMessage(messages.link_dumpark_title)}
            >
              <img
                src={logoDumpark}
                alt={intl.formatMessage(messages.link_dumpark_title)}
              />
            </ACredit>
          </Box>
        </Box>
      </ContentMaxWidth>
    </SectionContainer>
  );
}

SectionCredits.propTypes = {
  intl: intlShape,
};

export default injectIntl(SectionCredits);
