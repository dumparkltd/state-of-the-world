/**
 *
 * ListHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Text, ResponsiveContext, Button } from 'grommet';
import { Ascend, Descend } from 'grommet-icons';
import styled from 'styled-components';

import { isMinSize } from 'utils/responsive';

import { COUNTRY_SORTS } from 'containers/App/constants';
import Tooltip from 'components/Tooltip';
import ChartNotes from 'components/ChartNotes';

import rootMessages from 'messages';
import messages from './messages';
import { chartColumnWidth } from './chart-utils';

// prettier-ignore
const ColumnText = styled(Text)`
  padding: 0;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0;
  }
`;

const ColumnSort = styled(p => <Button reverse plain gap="xxsmall" {...p} />)``;

const BarWrap = styled(Box)``;
// prettier-ignore
const ColumnWrap = styled(Box)`
`;
// border-right: 1px solid;
// border-color: ${({ theme, noBorder }) => noBorder ? 'transparent' : theme.global.colors.dark};

const renderSortIcon = dir =>
  dir === 'asc' ? <Ascend size="small" /> : <Descend size="small" />;

export function ListHeader({
  metric,
  benchmark,
  commonLabel,
  labelColor = 'dark',
  annotateMinMax = true,
  sort,
}) {
  let maxValue = '100%';
  if (metric.type === 'cpr') maxValue = '10';
  if (metric.type === 'vdem') maxValue = '1';
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="center" pad={{ bottom: 'xxsmall' }}>
          <ColumnWrap
            width={chartColumnWidth(size, 'rank')}
            flex={{ shrink: 0 }}
          />
          <ColumnWrap
            width={chartColumnWidth(size, 'label')}
            noBorder
            align="start"
            flex={{ shrink: 0 }}
            pad={{ right: 'small' }}
          >
            <ColumnSort
              onClick={() => {
                // reverse order if already sorted by score
                if (sort.sort === 'name') {
                  return sort.onOrderToggle && sort.onOrderToggle();
                }
                // else sort by score
                return sort.onSortSelect('name', COUNTRY_SORTS.name.order);
              }}
              icon={sort.sort === 'name' ? renderSortIcon(sort.order) : null}
              label={
                <ColumnText
                  size={isMinSize(size, 'sm') ? 'small' : 'xxsmall'}
                  style={{ fontWeight: 300 }}
                  color={labelColor}
                >
                  {commonLabel || (
                    <FormattedMessage {...rootMessages.labels.countries} />
                  )}
                </ColumnText>
              }
            />
          </ColumnWrap>
          <ColumnWrap
            width={chartColumnWidth(size, 'score')}
            noBorder
            align="start"
            flex={{ shrink: 0 }}
            pad={{
              right: !isMinSize(size, 'sm') ? 'small' : 'edge',
            }}
          >
            <ColumnSort
              onClick={() => {
                // reverse order if already sorted by score
                if (sort.sort === 'score') {
                  return sort.onOrderToggle && sort.onOrderToggle();
                }
                // else sort by score
                return sort.onSortSelect('score', COUNTRY_SORTS.score.order);
              }}
              icon={sort.sort === 'score' ? renderSortIcon(sort.order) : null}
              label={
                <ColumnText
                  size={isMinSize(size, 'sm') ? 'small' : 'xxsmall'}
                  style={{ fontWeight: 300 }}
                  color={labelColor}
                >
                  {commonLabel || (
                    <FormattedMessage {...rootMessages.labels.score} />
                  )}
                </ColumnText>
              }
            />
          </ColumnWrap>
          {isMinSize(size, 'sm') && (
            <ColumnWrap
              width={chartColumnWidth(size, 'trend')}
              flex={{ shrink: 0 }}
              pad={{ right: 'small' }}
            >
              <ColumnText size="small" style={{ fontWeight: 300 }}>
                <FormattedMessage {...rootMessages.labels.trend} />
              </ColumnText>
            </ColumnWrap>
          )}
          <BarWrap
            flex
            direction="row"
            style={{ position: 'relative' }}
            align="center"
          >
            {annotateMinMax && metric && (
              <Box direction="row" justify="between" width="100%">
                <Text
                  size={isMinSize(size, 'sm') ? 'xsmall' : 'xxsmall'}
                  style={{ transform: 'translateX(-50%)' }}
                >
                  0
                </Text>
                {metric && isMinSize(size, 'sm') && (
                  <Box direction="row" gap="xsmall">
                    <Text size="xsmall" weight={500} textAlign="center">
                      <FormattedMessage
                        {...rootMessages.labels.xAxis[
                          metric.type === 'esr' ? benchmark : 'cpr'
                        ]}
                      />
                    </Text>
                    <Tooltip
                      large
                      margin={{}}
                      iconSize="small"
                      component={
                        <Box gap="small">
                          <Text size="xsmall">
                            {metric.type === 'esr' && (
                              <FormattedMessage {...messages.infoESRintro} />
                            )}
                            {metric.type === 'cpr' && (
                              <FormattedMessage {...messages.infoCPRintro} />
                            )}
                            {metric.type === 'vdem' && (
                              <FormattedMessage {...messages.infoVDEMintro} />
                            )}
                          </Text>
                          <Text size="xsmall">
                            {metric.type === 'esr' && (
                              <FormattedMessage
                                {...messages.infoESRadditional}
                              />
                            )}
                            {metric.type === 'cpr' && (
                              <FormattedMessage
                                {...messages.infoCPRadditional}
                              />
                            )}
                            {metric.type === 'vdem' && (
                              <FormattedMessage
                                {...messages.infoVDEMadditional}
                              />
                            )}
                          </Text>
                          <ChartNotes
                            notes={{
                              gradesESR: metric.type === 'esr',
                              gradesCPR: metric.type === 'cpr',
                            }}
                          />
                        </Box>
                      }
                    />
                  </Box>
                )}
                <Text
                  size={isMinSize(size, 'sm') ? 'xsmall' : 'xxsmall'}
                  style={
                    isMinSize(size, 'sm')
                      ? { transform: 'translateX(50%)' }
                      : { transform: 'translateX(25%)' }
                  }
                >
                  {maxValue}
                </Text>
              </Box>
            )}
          </BarWrap>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

ListHeader.propTypes = {
  metric: PropTypes.object,
  benchmark: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  commonLabel: PropTypes.string,
  labelColor: PropTypes.string,
  annotateBetter: PropTypes.bool,
  hasAside: PropTypes.bool,
  annotateMinMax: PropTypes.bool,
  sort: PropTypes.object,
};

export default ListHeader;
