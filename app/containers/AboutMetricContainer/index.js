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
import { Box, Heading, Text } from 'grommet';
import styled from 'styled-components';

import { selectMetric } from 'containers/App/actions';
import FAQs from 'containers/FAQs';
import ButtonHero from 'styled/ButtonHero';

import AboutMetric from 'components/AboutMetric';
import AboutMetricSources from 'containers/AboutMetricSources';
import { lowerCase } from 'utils/string';

import getMetricDetails from 'utils/metric-details';

import rootMessages from 'messages';
import messages from './messages';

const RightTitle = styled(p => <Heading level={3} responsive={false} {...p} />)`
  margin-top: 0;
  font-weight: 700;
`;

const PanelTitle = styled(p => <Text size="xsmall" {...p} />)`
  text-transform: uppercase;
  font-weight: 600;
`;
const HeadingBox = styled(p => <Box flex={{ shrink: 0 }} {...p} />)``;

export function AboutMetricContainer({
  metricCode,
  onSelectMetric,
  intl,
  dateRange,
  countryCode,
  showMetricLink,
  questions,
}) {
  const metric = getMetricDetails(metricCode);
  const { metricType } = metric;

  return (
    <Box
      direction="column"
      pad={{ horizontal: 'medium', bottom: 'medium', top: 'xlarge' }}
    >
      <HeadingBox>
        <PanelTitle>
          <FormattedMessage {...messages.title} />
        </PanelTitle>
        <RightTitle>
          <FormattedMessage {...rootMessages[metricType][metric.key]} />
        </RightTitle>
      </HeadingBox>
      <AboutMetric metric={metric} />
      <AboutMetricSources metric={metric} />
      {questions && questions.length > 0 && (
        <FAQs
          questions={questions}
          metric={intl.formatMessage(
            rootMessages[metric.metricType][metric.key],
          )}
          metrics={metric}
          onSelectMetric={onSelectMetric}
          dateRange={dateRange}
          countryCode={countryCode}
        />
      )}
      {showMetricLink && (
        <div>
          <ButtonHero onClick={() => onSelectMetric(metricCode)}>
            <FormattedMessage
              {...messages.metricLink}
              values={{
                metric: lowerCase(
                  intl.formatMessage(
                    rootMessages[metric.metricType][metricCode],
                  ),
                ),
              }}
            />
          </ButtonHero>
        </div>
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
  questions: PropTypes.array,
  showRelated: PropTypes.bool,
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
