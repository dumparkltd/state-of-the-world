/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Text, Paragraph } from 'grommet';
import all from 'images/metrics/all.png';
import logoNorway from 'images/logos/logo_NorwegianMinistryFA.png';
import logoDenmark from 'images/logos/logo_PermanentMissionDenmark.png';
import logoHRMI from 'images/logos/logo_HRMI.png';
import logoSERF from 'images/logos/logo_SERF.png';
import logoURG from 'images/logos/logo_URG.png';
import logoDumpark from 'images/logos/logo_dumpark.png';

import { navigate } from 'containers/App/actions';

import Search from 'containers/Search';
import SectionFooter from 'components/SectionFooter';
import ChartContainerRightsMulti from 'containers/ChartContainerRightsMulti';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentWrap from 'styled/ContentWrap';

import rootMessages from 'messages';
import messages from './messages';

const Title = styled.h1``;
const SectionTitle = styled.h2`
  font-size: 32px;
  color: ${({ theme, color }) => theme.global.colors[color || 'brand']};
`;
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

const SearchWrapper = styled.div`
  width: 70%;
  margin: 20px auto;
`;

const Intro = styled(p => <Text size="large" {...p} />)``;
const SectionIntro = styled(p => <Paragraph textAlign="center" {...p} />)``;
const SectionIntroText = styled(p => <Text size="medium" {...p} />)``;
// const DEPENDENCIES = ['countries'];

export function PathHome({ nav, intl }) {
  // useInjectSaga({ key: 'app', saga });
  // useEffect(() => {
  //   // kick off loading of data
  //   onLoadData();
  // }, []);
  const { locale } = intl;
  // <SectionIntro />
  return (
    <ContentWrap>
      <SectionContainer
        background="brand"
        pad={{ vertical: 'large' }}
        align="center"
        justify="center"
      >
        <ContentMaxWidth stretch column align="center">
          <Box align="center" justify="center" fill>
            <img
              src={all}
              alt=""
              style={{
                maxWidth: '400px',
              }}
            />
          </Box>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Paragraph textAlign="center">
            <Intro>
              <FormattedMessage
                {...messages.intro}
                values={{
                  linkRightsTracker: (
                    <a
                      target="_blank"
                      href={intl.formatMessage(
                        rootMessages.sources.urlRightsTracker,
                      )}
                    >
                      <FormattedMessage
                        {...rootMessages.sources.anchorRightsTracker}
                      />
                    </a>
                  ),
                }}
              />
            </Intro>
          </Paragraph>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer pad={{ vertical: 'large' }}>
        <ContentMaxWidth column>
          <Box align="center">
            <SectionTitle>
              <FormattedMessage {...rootMessages['rights-types'].esr} />
            </SectionTitle>
            <SectionIntro>
              <SectionIntroText>
                <FormattedMessage
                  {...messages.introESR}
                  values={{
                    linkSERF: (
                      <a
                        target="_blank"
                        href={intl.formatMessage(rootMessages.sources.urlSERF)}
                      >
                        <FormattedMessage
                          {...rootMessages.sources.anchorSERF}
                        />
                      </a>
                    ),
                  }}
                />
              </SectionIntroText>
            </SectionIntro>
          </Box>
          <ChartContainerRightsMulti type="esr" />
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer pad={{ vertical: 'large' }}>
        <ContentMaxWidth column>
          <Box align="center">
            <SectionTitle>
              <FormattedMessage {...rootMessages['rights-types'].cpr} />
            </SectionTitle>
            <SectionIntro>
              <SectionIntroText>
                <FormattedMessage {...messages.introCPR} />
              </SectionIntroText>
            </SectionIntro>
          </Box>
          <ChartContainerRightsMulti type="cpr" />
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer>
        <ContentMaxWidth column>
          <SectionTitle color="black">
            <FormattedMessage {...messages.countrySearchTitle} />
          </SectionTitle>
          <SearchWrapper>
            <Search bordersize="small" bordercolor="dark" stretch />
          </SearchWrapper>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer pad={{ vertical: 'small' }} background="white">
        <ContentMaxWidth column>
          <SectionTitleSecondary>
            <FormattedMessage {...messages.credits_title} />
          </SectionTitleSecondary>
          <Box
            direction="row"
            justify="center"
            gap="small"
            margin={{ bottom: 'large' }}
          >
            <Box>
              <LabelCredit>
                <FormattedMessage {...messages.credit_main} />
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
                <FormattedMessage {...messages.credit_funding} />
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
          </Box>
          <Box
            direction="row"
            justify="center"
            gap="small"
            margin={{ bottom: 'medium' }}
          >
            <Box>
              <LabelCredit>
                <FormattedMessage {...messages.credit_data} />
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
            <Box>
              <LabelCredit>
                <FormattedMessage {...messages.credit_development} />
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
      <SectionFooter locale={locale} nav={nav} />
    </ContentWrap>
  );
}

PathHome.propTypes = {
  nav: PropTypes.func.isRequired,
  // onLoadData: PropTypes.func.isRequired,
  intl: intlShape,
};

export function mapDispatchToProps(dispatch) {
  return {
    // onLoadData: () => {
    //   DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    // },
    // navigate to location
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Home: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PathHome));
