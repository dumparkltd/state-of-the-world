/**
 *
 * Country
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { ResponsiveContext, Image as GImage } from 'grommet';
import styled, { withTheme } from 'styled-components';

import rootMessages from 'messages';

import {
  getRightsForCountry,
  getCountry,
  getStandardSearch,
  getBenchmarkSearch,
  getDependenciesReady,
  getCountryGrammar,
  getAsideLayer,
  getAsideLayerActiveCode,
} from 'containers/App/selectors';

import {
  loadDataIfNeeded,
  trackEvent,
  setAsideLayer,
} from 'containers/App/actions';
import { FAQS, IMAGE_PATH } from 'containers/App/constants';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import TabContainer from 'containers/TabContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';

import ChartContainerCountry from 'containers/ChartContainerCountry';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import PageTop from 'styled/PageTop';
import ContentContainer from 'styled/ContentContainer';
import MainColumn from 'styled/MainColumn';
import SupTitle from 'styled/SupTitle';

import { isMinSize } from 'utils/responsive';
import { getMessageGrammar } from 'utils/narrative';

import messages from './messages';

const TitleWrapper = styled.div``;

const StyledPageTitle = styled(PageTitle)`
  @media print {
    font-size: 40px;
    line-height: 43px;
  }
`;

const DEPENDENCIES = [
  'countries',
  'countriesGrammar',
  'cprScores',
  'esrScores',
  'auxIndicators',
];

export function PathCountry({
  intl,
  onLoadData,
  match,
  country,
  countryGrammar,
  theme,
  onSetAsideLayer,
  asideLayer,
  activeCode,
}) {
  // const [activeCode, setActiveCode] = useState();
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);

  const countryCode = match.params.country;

  /* eslint-disable no-console */
  if (!rootMessages.countries[countryCode]) {
    console.log('Country code not in language files:', countryCode);
  }
  /* eslint-enable no-console */
  const countryTitle =
    countryCode && rootMessages.countries[countryCode]
      ? intl.formatMessage(rootMessages.countries[countryCode])
      : countryCode;

  // prettier-ignore
  const messageValues = {
    ...getMessageGrammar(
      intl,
      countryCode,
      country.region_code,
      countryGrammar,
    ),
  };

  const onMetricClick = code => {
    if (asideLayer && asideLayer.key === code) {
      onSetAsideLayer(false);
    } else {
      onSetAsideLayer({
        type: 'aboutMetric',
        key: code,
        code,
        countryCode,
      });
    }
  };
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{countryTitle}</title>
            <meta name="description" content="Description of Country page" />
          </Helmet>
          <PageTop>
            <ContentContainer direction="column" header>
              <ContentMaxWidth
                header
                height={
                  isMinSize(size, 'large')
                    ? `${theme.sizes.top.height}px`
                    : 'auto'
                }
                hasAside={isMinSize(size, 'large')}
              >
                <MainColumn
                  hasAside={isMinSize(size, 'large')}
                  header
                  justify="center"
                >
                  <SupTitle>
                    <FormattedMessage {...messages.supTitle} />
                  </SupTitle>
                  <TitleWrapper>
                    <StyledPageTitle>{countryTitle}</StyledPageTitle>
                  </TitleWrapper>
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
                    <GImage
                      src={`${IMAGE_PATH}/country_${countryCode}.png`}
                      fit="cover"
                    />
                  </Aside>
                )}
              </ContentMaxWidth>
            </ContentContainer>
          </PageTop>
          <TabContainer
            size={size}
            tabs={[
              {
                key: 'country',
                title: intl.formatMessage(rootMessages.tabs.snapshot),
                content: props => (
                  <ChartContainerCountry
                    {...props}
                    countryCode={countryCode}
                    onSelectMetric={onMetricClick}
                    messageValues={messageValues}
                    activeMetricCode={activeCode}
                  />
                ),
              },
              {
                aside: true,
                key: 'about',
                title: intl.formatMessage(rootMessages.tabs.about),
                content: props => {
                  const faqs = FAQS.COUNTRY_SNAPSHOT;
                  // TODO check about tab
                  return (
                    <AboutCountryContainer
                      {...props}
                      countryCode={countryCode}
                      showFAQs={faqs}
                      messageValues={messageValues}
                    />
                  );
                },
              },
            ]}
          />
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathCountry.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onLoadData: PropTypes.func.isRequired,
  activeCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  match: PropTypes.object,
  rights: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  country: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  countryGrammar: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // standard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  theme: PropTypes.object,
  onSetAsideLayer: PropTypes.func,
  asideLayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  country: (state, { match }) => getCountry(state, match.params.country),
  dataReady: state => getDependenciesReady(state, DEPENDENCIES),
  rights: (state, { match }) =>
    getRightsForCountry(state, match.params.country),
  standard: state => getStandardSearch(state),
  benchmark: state => getBenchmarkSearch(state),
  countryGrammar: (state, { match }) =>
    getCountryGrammar(state, match.params.country),
  asideLayer: state => getAsideLayer(state),
  activeCode: state => getAsideLayerActiveCode(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetAsideLayer: config => {
      dispatch(setAsideLayer(config));
    },
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
    onTrackEvent: e => dispatch(trackEvent(e)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathCountry)));
