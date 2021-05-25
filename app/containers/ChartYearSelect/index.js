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
import { Box, DropButton, Text, ResponsiveContext } from 'grommet';
import { Next, Previous } from 'grommet-icons';

import quasiEquals from 'utils/quasi-equals';
import { isMinSize } from 'utils/responsive';

import {
  getESRYear,
  getCPRYear,
  getVDEMYear,
  getESRYearRange,
  getCPRYearRange,
  getVDEMYearRange,
} from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';
import DropOption from 'styled/DropOption';
import ButtonPlain from 'styled/ButtonPlain';

import messages from './messages';

const StyledDropButton = styled(DropButton)`
  font-weight: bold;
  font-size: ${({ theme }) => theme.text.small.size};
  line-height: ${({ theme }) => theme.text.small.height};
  border-bottom: 2px solid;
  color: ${({ theme }) => theme.global.colors['dark-3']};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.ms}) {
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid;
    }
    font-size: ${({ theme }) => theme.text.medium.size};
    line-height: ${({ theme }) => theme.text.medium.height};
    margin-bottom: -2px;
  }
`;

export function ChartYearSelect({
  yesr,
  ycpr,
  yvdem,
  yesrRange,
  ycprRange,
  yvdemRange,
  onSelectYear,
  metricType,
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  // TODO move to selector
  let year;
  if (metricType === 'esr') year = yesr;
  if (metricType === 'cpr') year = ycpr;
  if (metricType === 'vdem') year = yvdem;
  let yearMin;
  if (metricType === 'esr') yearMin = yesrRange.min;
  if (metricType === 'cpr') yearMin = ycprRange.min;
  if (metricType === 'vdem') yearMin = yvdemRange.min;
  let yearMax;
  if (metricType === 'esr') yearMax = yesrRange.max;
  if (metricType === 'cpr') yearMax = ycprRange.max;
  if (metricType === 'vdem') yearMax = yvdemRange.max;
  let param;
  if (metricType === 'esr') param = 'yesr';
  if (metricType === 'cpr') param = 'ycpr';
  if (metricType === 'vdem') param = 'yvdem';

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
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          direction="column"
          flex={{ shrink: 0 }}
          responsive={false}
          align="center"
          margin={{ bottom: 'small', top: 'xsmall' }}
        >
          <Box direction="row" align="center">
            <Box pad={{ bottom: 'xsmall' }} direction="row">
              <Text size="xsmall" color="hint">
                <FormattedMessage {...messages.selectYear} />
              </Text>
            </Box>
          </Box>
          <Box direction="row" align="center" gap="small">
            {isMinSize(size, 'ms') && (
              <ButtonPlain
                onClick={() => onSelectYear(yearPrevious, param)}
                disabled={quasiEquals(year, yearPrevious)}
              >
                <Previous
                  size="medium"
                  color={
                    quasiEquals(year, yearPrevious) ? 'disabled' : 'dark-3'
                  }
                />
              </ButtonPlain>
            )}
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
                        onClick={() => onSelectYear(option.year, param)}
                        active={option.active}
                        disabled={option.active}
                      >
                        {option.year}
                      </DropOption>
                    ))}
                </Box>
              }
            />
            {isMinSize(size, 'ms') && (
              <ButtonPlain
                onClick={() => onSelectYear(yearNext, param)}
                disabled={quasiEquals(year, yearNext)}
              >
                <Next
                  size="medium"
                  color={quasiEquals(year, yearNext) ? 'disabled' : 'dark-3'}
                />
              </ButtonPlain>
            )}
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ChartYearSelect.propTypes = {
  onSelectYear: PropTypes.func,
  yesr: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  ycpr: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  yvdem: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  yesrRange: PropTypes.object,
  ycprRange: PropTypes.object,
  yvdemRange: PropTypes.object,
  metricType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  yesr: state => getESRYear(state),
  ycpr: state => getCPRYear(state),
  yvdem: state => getVDEMYear(state),
  yesrRange: state => getESRYearRange(state),
  ycprRange: state => getCPRYearRange(state),
  yvdemRange: state => getVDEMYearRange(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectYear: (value, param) =>
      dispatch(
        navigate(
          { search: `?${param}=${value}` },
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
