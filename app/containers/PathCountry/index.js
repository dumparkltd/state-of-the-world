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
  navigate,
  trackEvent,
  setAsideLayer,
} from 'containers/App/actions';
import {
  // INCOME_GROUPS,
  COUNTRY_FILTERS,
  PATHS,
  FAQS,
  IMAGE_PATH,
  BENCHMARKS,
  COLUMNS,
} from 'containers/App/constants';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import TabContainer from 'containers/TabContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';

import TabCountrySnapshot from 'components/TabCountrySnapshot';
import AsideBackground from 'components/AsideBackground';
import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import ContentContainer from 'styled/ContentContainer';
import MainColumn from 'styled/MainColumn';
import ButtonText from 'styled/ButtonText';

import getMetricDetails from 'utils/metric-details';
// import quasiEquals from 'utils/quasi-equals';
import { formatScore } from 'utils/scores';

import { isMinSize } from 'utils/responsive';
import { getMessageGrammar } from 'utils/narrative';
import { lowerCase } from 'utils/string';

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

const getMetricScore = (metric, rights, benchmark) => {
  const currentBenchmark = BENCHMARKS.find(s => s.key === benchmark);
  let currentMetric;
  if (rights) {
    currentMetric = rights[metric.key];
  }
  if (currentMetric && currentMetric.score) {
    if (metric.type === 'esr') {
      return currentMetric.score[currentBenchmark.column];
    }
    return currentMetric.score[COLUMNS.CPR.MEAN];
  }
  return null;
};

const getScoreMsg = (code, benchmark, rights, intl, messageValues) => {
  let countryScoreMsg;
  const aboutMetricDetails = getMetricDetails(code);
  const score = getMetricScore(aboutMetricDetails, rights, benchmark);
  if (aboutMetricDetails.type === 'esr') {
    // prettier-ignore
    countryScoreMsg = score
      ? intl.formatMessage(
        messages.countryScoreExplainer.esr[benchmark],
        ({
          ...messageValues,
          score: formatScore(score, 1, intl),
          metric: lowerCase(intl.formatMessage(rootMessages[aboutMetricDetails.metricType][code])),
        }),
      )
      : intl.formatMessage(
        messages.countryScoreExplainer.noData,
        messageValues,
      );
  }
  if (aboutMetricDetails.type === 'cpr') {
    // prettier-ignore
    countryScoreMsg = score
      ? <FormattedMessage
        {...messages.countryScoreExplainer.cpr}
        values={{
          ...messageValues,
          score: formatScore(score, 1, intl),
          metric: lowerCase(intl.formatMessage(rootMessages[aboutMetricDetails.metricType][code])),
          link: (
            <ButtonText
              as="a"
              href={intl.formatMessage(messages.countryScoreExplainer.cprLink.url)}
              target="_blank"
              inverse
            >
              {intl.formatMessage(messages.countryScoreExplainer.cprLink.anchor)}
            </ButtonText>
          ),
        }}
      />
      : intl.formatMessage(
        messages.countryScoreExplainer.noData,
        messageValues,
      );
  }
  return countryScoreMsg;
};

export function PathCountry({
  intl,
  onLoadData,
  onCategoryClick,
  match,
  rights,
  country,
  countryGrammar,
  benchmark,
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

  const onMetricClick = (code, dimension, dateRange) => {
    if (asideLayer && asideLayer.key === code) {
      onSetAsideLayer(false);
    } else {
      onSetAsideLayer({
        type: 'aboutMetric',
        background: `${dimension || code}Active`,
        showSources: dimension === 'esr' || code === 'esr',
        key: code,
        code,
        countryCode,
        dateRange,
        countryScoreMsg: getScoreMsg(
          code,
          benchmark,
          rights,
          intl,
          messageValues,
        ),
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
          <div style={{ position: 'relative' }}>
            {isMinSize(size, 'large') && <AsideBackground />}
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
                <MainColumn hasAside={isMinSize(size, 'large')} header hasLinks>
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
          </div>
          <TabContainer
            size={size}
            tabs={[
              {
                key: 'snapshot',
                title: intl.formatMessage(rootMessages.tabs.snapshot),
                content: props => (
                  <TabCountrySnapshot
                    {...props}
                    countryCode={countryCode}
                    onMetricClick={onMetricClick}
                    messageValues={messageValues}
                    activeCode={activeCode}
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
                      onCategoryClick={onCategoryClick}
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
  onCategoryClick: PropTypes.func,
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
    onCategoryClick: (key, value) => {
      const deleteParams = COUNTRY_FILTERS.ALL;
      dispatch(
        navigate(
          {
            pathname: `/${PATHS.COUNTRIES}`,
            search: key === 'all' ? '' : `?${key}=${value}`,
          },
          {
            replace: false,
            deleteParams: deleteParams.filter(p => p !== key),
            trackEvent: {
              category: 'Data',
              action: 'Country filter (Country, tags)',
              value: `${key}/${value}`,
            },
          },
        ),
      );
    },
    onTrackEvent: e => dispatch(trackEvent(e)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathCountry)));
