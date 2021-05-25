/**
 *
 * Overview
 *
 */

import React, { useRef, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import {
  ResponsiveContext,
  Box,
  Text,
  Paragraph,
  Button,
  Heading,
} from 'grommet';
import { Down } from 'grommet-icons';

import all from 'images/metrics/all.png';

import { getHeaderHeight, isMinSize } from 'utils/responsive';

import Search from 'containers/Search';
import SectionFooter from 'components/SectionFooter';
import SectionCredits from 'components/SectionCredits';
import ChartContainerRegion from 'containers/ChartContainerRegion';
import ChartFilters from 'containers/ChartFilters';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentWrap from 'styled/ContentWrap';
import ButtonText from 'styled/ButtonText';
// import ButtonPlain from 'styled/ButtonPlain';

import rootMessages from 'messages';
import messages from './messages';

const IntroImg = styled.img`
  max-width: 280px;
  max-height: 40vh;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    max-width: 500px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    max-width: 700px;
  }
`;
// margin-top: -${({ theme }) => getHeaderHeight('small', theme)}px;
// justify="evenly"
const IntroUpper = styled(p => (
  <ContentMaxWidth column align="center" justify="center" flex="grow" {...p} />
))`
  padding-bottom: ${({ theme }) => theme.global.edgeSize.small};
  padding-top: ${({ theme }) => theme.global.edgeSize.medium};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-bottom: 0;
  }
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
  font-size: ${({ theme }) => theme.text.small.size};
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-weight: 700;
    font-size: ${({ theme }) => theme.text.large.size};
  }
  &:hover {
    opacity: 1;
  }
`;
// width: 180px;
// text-align: center;

const Title = styled(p => (
  <Heading level={1} color="white" {...p} textAlign="center" />
))`
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 0.2em;
  font-weight: bold;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 38px;
    line-height: 42px;
  }
`;
const SectionTitle = styled(p => <Heading level={2} {...p} size="large" />)`
  font-weight: bold;
  color: ${({ theme, color }) => theme.global.colors[color || 'brand']};
  margin-bottom: 0.3em;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 36px;
    line-height: 42px;
  }
`;

const SearchWrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: 70%;
  }
`;

const SectionIntro = styled(p => <Paragraph textAlign="center" {...p} />)`
  margin-bottom: 20px;
`;
const SectionIntroText = styled(Text)`
  color: ${({ theme, color }) => theme.global.colors[color || 'dark-3']};
`;

const MetricSection = styled(p => (
  <SectionContainer pad={{ bottom: 'xsmall' }} {...p} />
))`
  padding-top: ${({ theme }) => getHeaderHeight('small', theme)}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-top: ${({ theme }) => getHeaderHeight('medium', theme)}px;
  }
`;

const FilterWrap = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.global.colors.bgTrans};
  z-index: 9;
  left: 0;
  right: 0;
  padding: 5px 0;
  top: ${({ theme }) => getHeaderHeight('small', theme)}px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    top: ${({ theme }) => getHeaderHeight('medium', theme)}px;
  }
`;

const INVIEW_OFFSET_BOTTOM = 180;
const INVIEW_OFFSET_TOP = 5;

export function PathHome({ intl }) {
  const sectionESR = useRef(null);
  const sectionCPR = useRef(null);
  const sectionVDEM = useRef(null);
  const ccESR = useRef(null);
  const ccCPR = useRef(null);
  const ccVDEM = useRef(null);

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const esrInView =
        ccESR &&
        ccESR.current &&
        sectionESR &&
        sectionESR.current &&
        sectionESR.current.offsetTop +
          INVIEW_OFFSET_TOP +
          ccESR.current.offsetTop <
          currentScrollY &&
        sectionESR.current.offsetTop +
          ccESR.current.offsetTop +
          ccESR.current.clientHeight -
          INVIEW_OFFSET_BOTTOM >
          currentScrollY;
      const cprInView =
        ccCPR &&
        ccCPR.current &&
        sectionCPR &&
        sectionCPR.current &&
        sectionCPR.current.offsetTop +
          INVIEW_OFFSET_TOP +
          ccCPR.current.offsetTop <
          currentScrollY &&
        sectionCPR.current.offsetTop +
          ccCPR.current.offsetTop +
          ccCPR.current.clientHeight -
          INVIEW_OFFSET_BOTTOM >
          currentScrollY;
      const vdemInView =
        ccVDEM &&
        ccVDEM.current &&
        sectionVDEM &&
        sectionVDEM.current &&
        sectionVDEM.current.offsetTop +
          INVIEW_OFFSET_TOP +
          ccVDEM.current.offsetTop <
          currentScrollY &&
        sectionVDEM.current.offsetTop +
          ccVDEM.current.offsetTop +
          ccVDEM.current.clientHeight -
          INVIEW_OFFSET_BOTTOM >
          currentScrollY;
      // const belowEnd = false;
      if (esrInView || cprInView || vdemInView) {
        setShowFilters(true);
      } else {
        setShowFilters(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showFilters]);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <FilterWrap show={showFilters}>
            <ContentMaxWidth column flex={false}>
              <ChartFilters
                key="unregion"
                config={{
                  attribute: 'unregion',
                  type: 'highlight',
                }}
              />
            </ContentMaxWidth>
          </FilterWrap>
          <IntroSectionContainer>
            <IntroUpper>
              <IntroImg src={all} alt="" />
              <Title>
                <FormattedMessage {...messages.title} />
              </Title>
              <Paragraph
                textAlign="center"
                size={isMinSize(size, 'sm') ? 'xlarge' : 'large'}
              >
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
              <Box align="center" gap="small">
                <Box
                  direction={isMinSize(size, 'ms') ? 'row' : 'column'}
                  gap={isMinSize(size, 'ms') ? 'ml' : 'xsmall'}
                >
                  <ButtonShortcut
                    onClick={() => {
                      if (sectionESR && sectionESR.current)
                        sectionESR.current.scrollIntoView({
                          behavior: 'smooth',
                        });
                    }}
                  >
                    <FormattedMessage {...messages.titleESR} />
                  </ButtonShortcut>
                  <ButtonShortcut
                    onClick={() => {
                      if (sectionCPR && sectionCPR.current)
                        sectionCPR.current.scrollIntoView({
                          behavior: 'smooth',
                        });
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
              <Box margin={{ top: 'xsmall' }} align="center">
                <Button
                  onClick={() => {
                    if (sectionESR && sectionESR.current)
                      sectionESR.current.scrollIntoView({ behavior: 'smooth' });
                  }}
                  icon={
                    <Down
                      color="white"
                      size={isMinSize(size, 'ms') ? 'xxxlarge' : 'xxlarge'}
                    />
                  }
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
                    <SectionIntroText
                      size={isMinSize(size, 'ms') ? 'large' : 'small'}
                    >
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
                <span ref={ccESR}>
                  <ChartContainerRegion type="esr" />
                </span>
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
                    <SectionIntroText
                      size={isMinSize(size, 'ms') ? 'medium' : 'small'}
                    >
                      <FormattedMessage {...messages.introCPR} />
                    </SectionIntroText>
                  </SectionIntro>
                </Box>
                <span ref={ccCPR}>
                  <ChartContainerRegion type="cpr" />
                </span>
              </ContentMaxWidth>
            </MetricSection>
          </div>
          <div ref={sectionVDEM}>
            <MetricSection margin={{ bottom: 'large' }}>
              <ContentMaxWidth column>
                <Box align="center">
                  <SectionTitle>
                    <FormattedMessage {...messages.titleVDEM} />
                  </SectionTitle>
                  <SectionIntro>
                    <SectionIntroText
                      size={isMinSize(size, 'ms') ? 'medium' : 'small'}
                    >
                      <FormattedMessage {...messages.introVDEM} />
                    </SectionIntroText>
                  </SectionIntro>
                </Box>
                <span ref={ccVDEM}>
                  <ChartContainerRegion type="vdem" />
                </span>
              </ContentMaxWidth>
            </MetricSection>
          </div>
          <SectionContainer background="dark-4">
            <ContentMaxWidth column align="center">
              <SectionTitle color="white">
                <FormattedMessage {...messages.countrySearchTitle} />
              </SectionTitle>
              <SearchWrapper>
                <Search stretch />
              </SearchWrapper>
            </ContentMaxWidth>
          </SectionContainer>
          <SectionCredits />
          <SectionFooter />
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
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
