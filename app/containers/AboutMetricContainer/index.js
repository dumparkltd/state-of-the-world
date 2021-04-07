/**
 *
 * AboutMetricContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Box, Heading } from 'grommet';

import { FAQS } from 'containers/App/constants';
import { selectMetric } from 'containers/App/actions';
import FAQs from 'containers/FAQs';
import ButtonHero from 'styled/ButtonHero';

import AboutMetric from 'components/AboutMetric';
import { lowerCase } from 'utils/string';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';
import messages from './messages';

export function AboutMetricContainer({
  metricCode,
  onSelectMetric,
  intl,
  showFAQs,
  showSources,
  dateRange,
  countryCode,
  showMetricLink,
}) {
  const metric = getMetricDetails(metricCode);
  const { metricType } = metric;

  let questions = [];
  if (metricType === 'rights') {
    questions = metric.type === 'cpr' ? FAQS.CPR_RIGHT : FAQS.ESR_RIGHT;
  }
  return (
    <Box
      direction="column"
      pad={{ horizontal: 'medium', bottom: 'medium', top: 'xlarge' }}
    >
      <Heading responsive={false} level={3}>
        <FormattedMessage {...rootMessages[metricType][metric.key]} />
      </Heading>
      <AboutMetric
        metric={metric}
        onSelectMetric={onSelectMetric}
        showSources={showSources}
        dateRange={dateRange}
        countryCode={countryCode}
      />
      {showMetricLink && (
        <ButtonHero onClick={() => onSelectMetric(metricCode)}>
          <FormattedMessage
            {...messages.metricLink}
            values={{
              metric: lowerCase(
                intl.formatMessage(rootMessages[metric.metricType][metricCode]),
              ),
            }}
          />
        </ButtonHero>
      )}
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
  intl: intlShape.isRequired,
  showTitle: PropTypes.bool,
  showMetricLink: PropTypes.bool,
  showFAQs: PropTypes.bool,
  showRelated: PropTypes.bool,
  showSources: PropTypes.bool,
  inverse: PropTypes.bool,
  countryCode: PropTypes.string,
  dateRange: PropTypes.object,
  showAboutMetric: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutMetricContainer));
