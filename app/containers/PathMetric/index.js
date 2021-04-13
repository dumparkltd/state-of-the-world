/**
 *
 * Metric
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { ResponsiveContext, Box, Text } from 'grommet';
import styled, { withTheme } from 'styled-components';

import { setAsideLayer } from 'containers/App/actions';
import {
  getCloseTargetMetric,
  getAsideLayer,
  getAsideLayerActiveCode,
} from 'containers/App/selectors';
import { RIGHTS, FAQS } from 'containers/App/constants';
import ChartContainerMetricRanking from 'containers/ChartContainerMetricRanking';
import ChartContainerMetricRegion from 'containers/ChartContainerMetricRegion';

import TabContainer from 'containers/TabContainer';
import AboutMetricContainer from 'containers/AboutMetricContainer';

import Aside from 'components/Aside';

import ContentWrap from 'styled/ContentWrap';
import MainColumn from 'styled/MainColumn';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import PageTitle from 'styled/PageTitle';
import PageTop from 'styled/PageTop';

import getMetricDetails from 'utils/metric-details';
import { isMinSize } from 'utils/responsive';

import rootMessages from 'messages';

const SupTitle = styled(p => <Text {...p} />)`
  color: white;
  font-weight: 600;
`;

const getQuestions = (type, key) => {
  if (type === 'cpr') {
    return key === 'regions' ? FAQS.CPR_REGIONS : FAQS.CPR_RIGHT;
  }
  return key === 'regions' ? FAQS.ESR_REGIONS : FAQS.ESR_RIGHT;
};

export function PathMetric({
  match,
  intl,
  theme,
  onSetAsideLayer,
  asideLayer,
  activeCode,
}) {
  const metricCode = match.params.metric;
  const metric = getMetricDetails(metricCode);
  const metricTitle = intl.formatMessage(
    rootMessages[metric.metricType][metric.key],
  );
  let imageSrc;

  if (metric.metricType === 'rights') {
    const right = RIGHTS.find(r => r.key === metricCode);
    imageSrc = right.icon;
  }
  const onCountryClick = code => {
    if (!code || (asideLayer && asideLayer.key === code)) {
      onSetAsideLayer(false);
    } else {
      onSetAsideLayer({
        type: 'aboutCountry',
        key: code,
        code,
      });
    }
  };
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentWrap>
          <Helmet>
            <title>{metricTitle}</title>
            <meta name="description" content={metricTitle} />
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
                    <FormattedMessage
                      {...rootMessages.rightsTypes[metric.type]}
                    />
                  </SupTitle>
                  <PageTitle>{metricTitle}</PageTitle>
                </MainColumn>
                {isMinSize(size, 'large') && (
                  <Aside image>
                    <Box
                      align="center"
                      justify="center"
                      fill
                      margin={{ bottom: '-44px' }}
                    >
                      <img
                        src={imageSrc}
                        alt={metricTitle}
                        style={{
                          maxWidth: '200px',
                        }}
                      />
                    </Box>
                  </Aside>
                )}
              </ContentMaxWidth>
            </ContentContainer>
          </PageTop>
          <TabContainer
            size={size}
            tabs={[
              {
                key: 'regions',
                title: intl.formatMessage(rootMessages.tabs.regions),
                titleMobile: intl.formatMessage(
                  rootMessages.tabs.mobile.regions,
                ),
                content: p => (
                  <ChartContainerMetricRegion
                    {...p}
                    metricCode={metricCode}
                    onCountryClick={onCountryClick}
                    mode="regions"
                  />
                ),
              },
              {
                key: 'ranking',
                title: intl.formatMessage(rootMessages.tabs.ranking),
                titleMobile: intl.formatMessage(
                  rootMessages.tabs.mobile.ranking,
                ),
                content: p => (
                  <ChartContainerMetricRanking
                    {...p}
                    metric={metric}
                    onCountryClick={onCountryClick}
                    activeCode={activeCode}
                  />
                ),
              },
              {
                aside: true,
                key: 'about',
                title: intl.formatMessage(rootMessages.tabs.about),
                content: p => (
                  <AboutMetricContainer
                    metricCode={metricCode}
                    questions={getQuestions(metric.type, p.active)}
                    showRelated
                    {...p}
                  />
                ),
              },
            ]}
          />
        </ContentWrap>
      )}
    </ResponsiveContext.Consumer>
  );
}

PathMetric.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.object,
  theme: PropTypes.object,
  onSetAsideLayer: PropTypes.func,
  asideLayer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  activeCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  closeTarget: state => getCloseTargetMetric(state),
  asideLayer: state => getAsideLayer(state),
  activeCode: state => getAsideLayerActiveCode(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetAsideLayer: config => {
      dispatch(setAsideLayer(config));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(PathMetric)));
