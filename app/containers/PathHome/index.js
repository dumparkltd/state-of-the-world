/**
 *
 * Overview
 *
 */

import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Text, Paragraph, Button } from 'grommet';
import { Down } from 'grommet-icons';
import all from 'images/metrics/all.png';

import { getHeaderHeight } from 'utils/responsive';

import Search from 'containers/Search';
import SectionFooter from 'components/SectionFooter';
import SectionCredits from 'components/SectionCredits';
import ChartContainerRegion from 'containers/ChartContainerRegion';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentWrap from 'styled/ContentWrap';
import ButtonText from 'styled/ButtonText';
// import ButtonPlain from 'styled/ButtonPlain';

import rootMessages from 'messages';
import messages from './messages';

const IntroImg = styled.img`
  max-width: 700px;
  max-height: 40vh;
`;
// margin-top: -${({ theme }) => getHeaderHeight('small', theme)}px;
// justify="evenly"
const IntroUpper = styled(p => (
  <ContentMaxWidth column align="center" justify="center" flex="grow" {...p} />
))`
  padding-top: ${({ theme }) => theme.global.edgeSize.medium};
`;

const IntroSectionContainer = styled(p => (
  <SectionContainer background="brand" align="center" fill="vertical" {...p} />
))`
  min-height: 100vh;
  padding-top: 0;
  padding-bottom: ${({ theme }) => getHeaderHeight('small', theme)}px;
  &:focus {
    outline: none;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-bottom: ${({ theme }) => getHeaderHeight('medium', theme)}px;
  }
`;
/* margin-top: -${({ theme }) => getHeaderHeight('medium', theme)}px; */

const ButtonShortcut = styled(p => <ButtonText inverse {...p} />)`
  /* font-weight: normal; */
  font-size: ${({ theme }) => theme.text.xlarge.size};
  text-decoration: none;
  &:hover {
    opacity: 1;
  }
`;
// width: 180px;
// text-align: center;

const Title = styled.h1``;
const SectionTitle = styled.h2`
  font-size: 32px;
  color: ${({ theme, color }) => theme.global.colors[color || 'brand']};
`;

const SearchWrapper = styled.div`
  width: 70%;
  margin: 20px auto;
`;

const SectionIntro = styled(p => <Paragraph textAlign="center" {...p} />)``;
const SectionIntroText = styled(p => <Text size="medium" {...p} />)``;

const MetricSection = styled(p => (
  <SectionContainer pad={{ bottom: 'xsmall' }} {...p} />
))`
  padding-top: ${({ theme }) => getHeaderHeight('small', theme)}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: ${({ theme }) => getHeaderHeight('medium', theme)}px;
  }
`;

export function PathHome({ intl }) {
  const sectionESR = useRef(null);
  const sectionCPR = useRef(null);
  const sectionVDEM = useRef(null);

  return (
    <ContentWrap>
      <IntroSectionContainer>
        <IntroUpper>
          <IntroImg src={all} alt="" />
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Paragraph textAlign="center" size="large">
            <FormattedMessage
              {...messages.intro}
              values={{
                linkRightsTracker: (
                  <ButtonText
                    as="a"
                    target="_blank"
                    href={intl.formatMessage(
                      rootMessages.sources.urlRightsTracker,
                    )}
                    inverse
                  >
                    <FormattedMessage
                      {...rootMessages.sources.anchorRightsTracker}
                    />
                  </ButtonText>
                ),
              }}
            />
          </Paragraph>
        </IntroUpper>
        <ContentMaxWidth column flex={false}>
          <Box margin={{ top: 'medium' }} align="center" gap="xsmall">
            <Text size="medium">
              <FormattedMessage {...messages.jumpToSection} />
            </Text>
            <Box direction="row" gap="ml">
              <ButtonShortcut
                onClick={() => {
                  if (sectionESR && sectionESR.current)
                    sectionESR.current.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <FormattedMessage {...messages.titleESR} />
              </ButtonShortcut>
              <ButtonShortcut
                onClick={() => {
                  if (sectionCPR && sectionCPR.current)
                    sectionCPR.current.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <FormattedMessage {...messages.titleCPR} />
              </ButtonShortcut>
              <ButtonShortcut
                onClick={() => {
                  if (sectionVDEM && sectionVDEM.current)
                    sectionVDEM.current.scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
              >
                <FormattedMessage {...messages.titleVDEM} />
              </ButtonShortcut>
            </Box>
          </Box>
          <Box margin={{ top: 'xxsmall' }} align="center" gap="xsmall">
            <Button
              onClick={() => {
                if (sectionESR && sectionESR.current)
                  sectionESR.current.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<Down color="white" size="xxxlarge" />}
            />
          </Box>
        </ContentMaxWidth>
      </IntroSectionContainer>
      <div ref={sectionESR}>
        <MetricSection>
          <ContentMaxWidth column>
            <Box align="center">
              <SectionTitle>
                <FormattedMessage {...messages.titleESR} />
              </SectionTitle>
              <SectionIntro>
                <SectionIntroText>
                  <FormattedMessage
                    {...messages.introESR}
                    values={{
                      linkSERF: (
                        <a
                          target="_blank"
                          href={intl.formatMessage(
                            rootMessages.sources.urlSERF,
                          )}
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
            <ChartContainerRegion type="esr" />
          </ContentMaxWidth>
        </MetricSection>
      </div>
      <div ref={sectionCPR}>
        <MetricSection>
          <ContentMaxWidth column>
            <Box align="center">
              <SectionTitle>
                <FormattedMessage {...messages.titleCPR} />
              </SectionTitle>
              <SectionIntro>
                <SectionIntroText>
                  <FormattedMessage {...messages.introCPR} />
                </SectionIntroText>
              </SectionIntro>
            </Box>
            <ChartContainerRegion type="cpr" />
          </ContentMaxWidth>
        </MetricSection>
      </div>
      <div ref={sectionVDEM}>
        <MetricSection>
          <ContentMaxWidth column>
            <Box align="center">
              <SectionTitle>
                <FormattedMessage {...messages.titleVDEM} />
              </SectionTitle>
              <SectionIntro>
                <SectionIntroText>
                  <FormattedMessage {...messages.introVDEM} />
                </SectionIntroText>
              </SectionIntro>
            </Box>
            <ChartContainerRegion type="vdem" />
          </ContentMaxWidth>
        </MetricSection>
      </div>
      <SectionContainer background="brand">
        <ContentMaxWidth column>
          <SectionTitle color="white">
            <FormattedMessage {...messages.countrySearchTitle} />
          </SectionTitle>
          <SearchWrapper>
            <Search bordersize="small" bordercolor="brandDarker" stretch />
          </SearchWrapper>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionCredits />
      <SectionFooter />
    </ContentWrap>
  );
}
// <SectionFooter locale={locale} nav={nav} />

PathHome.propTypes = {
  // nav: PropTypes.func.isRequired,
  // onLoadData: PropTypes.func.isRequired,
  intl: intlShape,
};

// export function mapDispatchToProps(dispatch) {
//   return {
//     nav: location => {
//       dispatch(
//         navigate(location, {
//           keepTab: true,
//           trackEvent: {
//             category: 'Content',
//             action: 'Home: navigate',
//             value: typeof location === 'object' ? location.pathname : location,
//           },
//         }),
//       );
//     },
//   };
// }
//
// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(injectIntl(PathHome));
export default injectIntl(PathHome);
