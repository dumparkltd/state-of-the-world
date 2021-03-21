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

import { navigate } from 'containers/App/actions';

// import SectionIntro from 'components/Sections/SectionIntro';
import SectionFooter from 'components/SectionFooter';
import ChartContainerRightsMulti from 'containers/ChartContainerRightsMulti';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentWrap from 'styled/ContentWrap';

import rootMessages from 'messages';
import messages from './messages';

const Title = styled.h1``;
const SectionTitle = styled.h2``;
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
        pad={{ vertical: 'medium' }}
        align="center"
        justify="center"
      >
        <ContentMaxWidth stretch column align="center">
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
                      <FormattedMessage {...rootMessages.sources.anchorSERF} />
                    </a>
                  ),
                }}
              />
            </SectionIntroText>
          </SectionIntro>
        </Box>
        <ChartContainerRightsMulti type="esr" />
      </ContentMaxWidth>
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
