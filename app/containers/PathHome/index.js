/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Text, Paragraph } from 'grommet';

import { getLocale } from 'containers/App/selectors';
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

export function PathHome({ nav, locale }) {
  // useInjectSaga({ key: 'app', saga });
  // useEffect(() => {
  //   // kick off loading of data
  //   onLoadData();
  // }, []);

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
              <FormattedMessage {...messages.intro} />
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
              <FormattedMessage {...messages.introESR} />
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
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: state => getLocale(state),
});

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
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathHome);
