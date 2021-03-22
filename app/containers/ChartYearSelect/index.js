/**
 *
 * ChartContainerMetricRanking
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, DropButton, Text } from 'grommet';
import { Next, Previous } from 'grommet-icons';

import quasiEquals from 'utils/quasi-equals';

import {
  getESRYear,
  getCPRYear,
  getESRYearRange,
  getCPRYearRange,
} from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';
import DropOption from 'styled/DropOption';
import ButtonPlain from 'styled/ButtonPlain';

import messages from './messages';

const StyledDropButton = styled(DropButton)`
  border-bottom: 2px solid transparent;
  font-weight: bold;
  &:hover {
    border-bottom: 2px solid;
  }
`;

export function ChartYearSelect({
  yesr,
  ycpr,
  yesrRange,
  ycprRange,
  onSelectYear,
  metricType,
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const year = metricType === 'esr' ? yesr : ycpr;
  const yearMin = metricType === 'esr' ? yesrRange.min : ycprRange.min;
  const yearMax = metricType === 'esr' ? yesrRange.max : ycprRange.max;
  const yearNext = Math.min(parseInt(year, 10) + 1, yearMax);
  const yearPrevious = Math.max(parseInt(year, 10) - 1, yearMin);
  const options = [];

  /* eslint-disable no-plusplus */
  for (let i = yearMax; i >= yearMin; i--) {
    options.push({
      year: i,
      active: quasiEquals(i, year),
    });
  }
  /* eslint-enable no-plusplus */
  return (
    <Box
      direction="column"
      flex={{ shrink: 0 }}
      responsive={false}
      align="center"
    >
      <Box direction="row" align="center">
        <Box pad={{ bottom: 'xsmall' }} direction="row">
          <Text size="xsmall">
            <FormattedMessage {...messages.selectYear} />
          </Text>
        </Box>
      </Box>
      <Box direction="row" align="center" gap="small">
        <ButtonPlain
          onClick={() => onSelectYear(yearPrevious, metricType)}
          disabled={quasiEquals(year, yearPrevious)}
        >
          <Previous
            size="medium"
            color={quasiEquals(year, yearPrevious) ? 'disabled' : 'dark'}
          />
        </ButtonPlain>
        <StyledDropButton
          plain
          reverse
          gap="xxsmall"
          alignSelf="end"
          label={year}
          onClose={() => setOptionsOpen(false)}
          onOpen={() => setOptionsOpen(true)}
          open={optionsOpen}
          dropProps={{
            align: { top: 'bottom' },
            stretch: false,
          }}
          dropContent={
            <Box pad="none">
              {options &&
                options.map(option => (
                  <DropOption
                    key={option.year}
                    onClick={() => onSelectYear(option.year, metricType)}
                    active={option.active}
                    disabled={option.active}
                  >
                    {option.year}
                  </DropOption>
                ))}
            </Box>
          }
        />
        <ButtonPlain
          onClick={() => onSelectYear(yearNext, metricType)}
          disabled={quasiEquals(year, yearNext)}
        >
          <Next
            size="medium"
            color={quasiEquals(year, yearNext) ? 'disabled' : 'dark'}
          />
        </ButtonPlain>
      </Box>
    </Box>
  );
}

ChartYearSelect.propTypes = {
  onSelectYear: PropTypes.func,
  yesr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ycpr: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  yesrRange: PropTypes.object,
  ycprRange: PropTypes.object,
  metricType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  yesr: state => getESRYear(state),
  ycpr: state => getCPRYear(state),
  yesrRange: state => getESRYearRange(state),
  ycprRange: state => getCPRYearRange(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectYear: (value, type) =>
      dispatch(
        navigate(
          { search: type === 'esr' ? `?yesr=${value}` : `?ycpr=${value}` },
          {
            replace: false,
            trackEvent: {
              category: 'Data',
              action: 'Set year',
              value,
            },
          },
        ),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChartYearSelect);
