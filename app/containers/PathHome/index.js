/**
 *
 * Overview
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Text, Paragraph } from 'grommet';
import all from 'images/metrics/all.png';

// import { navigate } from 'containers/App/actions';

import Search from 'containers/Search';
import SectionFooter from 'components/SectionFooter';
import SectionCredits from 'components/SectionCredits';
import ChartContainerRightsMulti from 'containers/ChartContainerRightsMulti';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentWrap from 'styled/ContentWrap';
import ButtonText from 'styled/ButtonText';

import rootMessages from 'messages';
import messages from './messages';

const Title = styled.h1``;
const SectionTitle = styled.h2`
  font-size: 32px;
  color: ${({ theme, color }) => theme.global.colors[color || 'brand']};
`;

const SearchWrapper = styled.div`
  width: 70%;
  margin: 20px auto;
`;

const Intro = styled(p => <Text size="large" {...p} />)``;
const SectionIntro = styled(p => <Paragraph textAlign="center" {...p} />)``;
const SectionIntroText = styled(p => <Text size="medium" {...p} />)``;
// const DEPENDENCIES = ['countries'];

export function PathHome({ intl }) {
  // export function PathHome({ nav, intl }) {
  // useInjectSaga({ key: 'app', saga });
  // useEffect(() => {
  //   // kick off loading of data
  //   onLoadData();
  // }, []);
  // const { locale } = intl;
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
                maxWidth: '700px',
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
            </Intro>
          </Paragraph>
        </ContentMaxWidth>
      </SectionContainer>
      <SectionContainer pad={{ vertical: 'large' }}>
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
              <FormattedMessage {...messages.titleCPR} />
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
      <SectionContainer pad={{ vertical: 'large' }}>
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
          <ChartContainerRightsMulti type="vdem" />
        </ContentMaxWidth>
      </SectionContainer>
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
