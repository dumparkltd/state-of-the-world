/**
 *
 * AboutMetricContainer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, Heading, Text } from 'grommet';

import { FAQS } from 'containers/App/constants';
import { loadDataIfNeeded, selectMetric } from 'containers/App/actions';
import FAQs from 'containers/FAQs';

import AboutMetric from 'components/AboutMetric';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';

const DEPENDENCIES_INDICATORS = ['esrIndicators'];

export function AboutMetricContainer({
  metricCode,
  onLoadData,
  onSelectMetric,
  intl,
  showFAQs,
  showSources,
  countryScoreMsg,
  inverse,
  dateRange,
  countryCode,
}) {
  useEffect(() => {
    // kick off loading of data
    onLoadData(metric);
  }, [metric]);

  const metric = getMetricDetails(metricCode);
  const { metricType } = metric;

  let questions = [];
  if (metricType === 'rights' && metric.type === 'cpr') {
    questions = FAQS.CPR_RIGHT;
  }
  return (
    <Box
      direction="column"
      pad={{ horizontal: 'medium', bottom: 'medium', top: 'xlarge' }}
    >
      <Heading responsive={false} level={3}>
        <FormattedMessage {...rootMessages[metricType][metric.key]} />
      </Heading>
      {countryScoreMsg && (
        <div>
          <Text color={inverse ? 'white' : 'dark'}>{countryScoreMsg}</Text>
        </div>
      )}
      <AboutMetric
        metric={metric}
        onSelectMetric={onSelectMetric}
        showSources={showSources}
        dateRange={dateRange}
        countryCode={countryCode}
      />
      {showFAQs && (
        <FAQs
          questions={questions}
          metric={intl.formatMessage(
            rootMessages[metric.metricType][metric.key],
          )}
          metrics={metric}
          onSelectMetric={onSelectMetric}
          showSources={showSources}
          dateRange={dateRange}
          countryCode={countryCode}
        />
      )}
    </Box>
  );
}

AboutMetricContainer.propTypes = {
  metricCode: PropTypes.string,
  onSelectMetric: PropTypes.func,
  onLoadData: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  showTitle: PropTypes.bool,
  showMetricLink: PropTypes.bool,
  showFAQs: PropTypes.bool,
  showRelated: PropTypes.bool,
  showSources: PropTypes.bool,
  inverse: PropTypes.bool,
  countryScoreMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  countryCode: PropTypes.string,
  dateRange: PropTypes.object,
  showAboutMetric: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: metric => {
      if (metric.metricType === 'indicators') {
        return DEPENDENCIES_INDICATORS.forEach(key =>
          dispatch(loadDataIfNeeded(key)),
        );
      }
      return false;
    },
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutMetricContainer));
