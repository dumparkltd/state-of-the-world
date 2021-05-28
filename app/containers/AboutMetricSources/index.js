/**
 *
 * AboutMetricSources
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import {
  Accordion,
  AccordionPanel,
  Box,
  Paragraph,
  Heading,
  Text,
} from 'grommet';

import { lowerCase } from 'utils/string';

// import LoadingIndicator from 'components/LoadingIndicator';
import AccordionHeader from 'components/AccordionHeader';
import { STANDARDS, INDICATORS } from 'containers/App/constants';

import { getESRIndicators, getStandardSearch } from 'containers/App/selectors';
import { loadDataIfNeeded } from 'containers/App/actions';

import rootMessages from 'messages';
import messages from './messages';

const DEPENDENCIES = ['esrIndicators'];

const expandSource = (source, intl) => {
  const sourcesAsArray = source.split(',');
  return sourcesAsArray.reduce((memo, s) => {
    const formatted = rootMessages.indicatorSources[s]
      ? intl.formatMessage(rootMessages.indicatorSources[s])
      : s;
    return memo === '' ? formatted : `${memo}, ${formatted}`;
  }, '');
};

export function AboutMetricSources({
  metric,
  allIndicators,
  onLoadData,
  intl,
  standard,
}) {
  const [actives, setActives] = useState([]);

  useEffect(() => {
    // kick off loading of data
    if (metric.type === 'esr') onLoadData(DEPENDENCIES);
  }, [metric]);

  useEffect(() => {
    // reset state
    setActives([]);
  }, [metric, standard]);

  if (metric.type === 'cpr') {
    return null;
  }

  const as = STANDARDS.find(s => s.key === standard);

  const indicators =
    allIndicators &&
    INDICATORS.reduce((memo, i) => {
      if (i.right !== metric.key) {
        return memo;
      }
      const indicator = allIndicators.find(ii => ii.metric_code === i.code);
      if (indicator.standard !== 'Both' && indicator.standard !== as.code) {
        return memo;
      }
      return [
        ...memo,
        {
          key: i.key,
          ...indicator,
        },
      ];
    }, []);
  if (!indicators) return null;
  return (
    <Box pad={{ vertical: 'small' }} flex={{ shrink: 0 }}>
      <Heading responsive={false} level={5} margin={{ bottom: 'xxsmall' }}>
        <FormattedMessage {...messages.title} />
      </Heading>
      <Paragraph size="small">
        <FormattedMessage
          {...messages.intro}
          values={{
            standard: lowerCase(
              intl.formatMessage(rootMessages.settings.standard[standard]),
            ),
          }}
        />
      </Paragraph>
      <Accordion
        multiple
        activeIndex={actives}
        onActive={newActive => setActives(newActive)}
      >
        {indicators.map((i, index) => (
          <AccordionPanel
            key={i.key}
            header={
              <AccordionHeader
                title={intl.formatMessage(
                  rootMessages['indicators-raw'][i.key],
                )}
                open={actives.includes(index)}
                level={2}
              />
            }
          >
            <Box pad={{ vertical: 'small' }} border="top">
              <div>
                <Paragraph size="xsmall">
                  <FormattedMessage
                    {...rootMessages['indicators-about'][i.key]}
                  />
                </Paragraph>
              </div>
              <div>
                <Text size="xsmall">
                  <FormattedMessage {...messages.titleSourceShort} />
                </Text>
                <Text size="xsmall">
                  {`: ${expandSource(i.source_codes, intl)}`}
                </Text>
              </div>
            </Box>
          </AccordionPanel>
        ))}
      </Accordion>
    </Box>
  );
}
// i.source_codes ? (

AboutMetricSources.propTypes = {
  metric: PropTypes.object,
  standard: PropTypes.string,
  onLoadData: PropTypes.func.isRequired,
  allIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  allIndicators: (state, { metric }) => {
    if (metric.type === 'esr') {
      return getESRIndicators(state);
    }
    return false;
  },
  standard: state => getStandardSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: deps => deps.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutMetricSources));
