/**
 *
 * Overview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Text, ResponsiveContext } from 'grommet';
import logoNorway from 'images/logos/logo_NorwegianMinistryFA.png';
import logoDenmark from 'images/logos/logo_PermanentMissionDenmark.png';
import logoHRMI from 'images/logos/logo_HRMI.png';
import logoSERF from 'images/logos/logo_SERF_www.png';
import logoVDEM from 'images/logos/logo_VDem.png';
import logoURG from 'images/logos/logo_URG.png';
import logoDumpark from 'images/logos/logo_dumpark.png';

import { isMinSize } from 'utils/responsive';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import messages from './messages';

const SectionTitleSecondary = styled.h4`
  font-size: 16px;
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;
const LabelCredit = styled(p => <Text size="xsmall" {...p} />)`
  color: ${({ theme }) => theme.global.colors['dark-3']};
`;

const ACredit = styled.a`
  &:hover {
    opacity: 0.85;
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

export function SectionCredits({ intl }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer pad={{ vertical: 'small' }} background="white">
          <ContentMaxWidth column>
            <SectionTitleSecondary>
              <FormattedMessage {...messages.title} />
            </SectionTitleSecondary>
            <div style={{ margin: '0 auto' }}>
              <Box margin={{ bottom: 'medium' }}>
                <LabelCredit>
                  <FormattedMessage {...messages.main} />
                </LabelCredit>
                <Box
                  direction={isMinSize(size, 'ms') ? 'row' : 'column'}
                  gap="medium"
                  basis="1/3"
                  justify="start"
                  fill={false}
                >
                  <Box>
                    <ACredit
                      href={intl.formatMessage(messages.link_urg)}
                      target="_blank"
                      title={intl.formatMessage(messages.link_urg_title)}
                    >
                      <Image
                        src={logoURG}
                        alt={intl.formatMessage(messages.link_urg_title)}
                      />
                    </ACredit>
                  </Box>
                </Box>
              </Box>
              <Box margin={{ bottom: 'medium' }}>
                <LabelCredit>
                  <FormattedMessage {...messages.data} />
                </LabelCredit>
                <Box
                  direction={isMinSize(size, 'ms') ? 'row' : 'column'}
                  gap="medium"
                  basis="1/3"
                >
                  <Box>
                    <ACredit
                      href={intl.formatMessage(messages.link_hrmi)}
                      target="_blank"
                      title={intl.formatMessage(messages.link_hrmi_title)}
                    >
                      <Image
                        src={logoHRMI}
                        alt={intl.formatMessage(messages.link_hrmi_title)}
                      />
                    </ACredit>
                  </Box>
                  <Box>
                    <ACredit
                      href={intl.formatMessage(messages.link_serf)}
                      target="_blank"
                      title={intl.formatMessage(messages.link_serf_title)}
                    >
                      <Image
                        src={logoSERF}
                        alt={intl.formatMessage(messages.link_serf_title)}
                      />
                    </ACredit>
                  </Box>
                  <Box>
                    <ACredit
                      href={intl.formatMessage(messages.link_vdem)}
                      target="_blank"
                      title={intl.formatMessage(messages.link_vdem_title)}
                    >
                      <Image
                        src={logoVDEM}
                        alt={intl.formatMessage(messages.link_vdem_title)}
                      />
                    </ACredit>
                  </Box>
                </Box>
              </Box>
              <Box
                direction={isMinSize(size, 'medium') ? 'row' : 'column'}
                gap="medium"
                margin={{ bottom: 'medium' }}
              >
                <Box>
                  <LabelCredit>
                    <FormattedMessage {...messages.funding} />
                  </LabelCredit>
                  <Box
                    direction={isMinSize(size, 'ms') ? 'row' : 'column'}
                    basis="1/2"
                    gap="medium"
                  >
                    <Box>
                      <ACredit
                        href={intl.formatMessage(messages.link_norway)}
                        target="_blank"
                        title={intl.formatMessage(messages.link_norway_title)}
                      >
                        <Image
                          src={logoNorway}
                          alt={intl.formatMessage(messages.link_norway_title)}
                        />
                      </ACredit>
                    </Box>
                    <Box>
                      <ACredit
                        href={intl.formatMessage(messages.link_denmark)}
                        target="_blank"
                        title={intl.formatMessage(messages.link_denmark_title)}
                      >
                        <Image
                          src={logoDenmark}
                          alt={intl.formatMessage(messages.link_denmark_title)}
                        />
                      </ACredit>
                    </Box>
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
                    <Image
                      src={logoDumpark}
                      alt={intl.formatMessage(messages.link_dumpark_title)}
                    />
                  </ACredit>
                </Box>
              </Box>
            </div>
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

SectionCredits.propTypes = {
  intl: intlShape,
};

export default injectIntl(SectionCredits);
