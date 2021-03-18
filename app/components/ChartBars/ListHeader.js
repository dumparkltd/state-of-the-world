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

import { COUNTRY_SORTS } from 'containers/App/constants';
import rootMessages from 'messages';
// import messages from './messages';
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
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" align="end" pad={{ bottom: 'xxsmall' }}>
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
                  size="small"
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
            pad={{ right: 'small' }}
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
                  size="small"
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
          <ColumnWrap
            width={chartColumnWidth(size, 'trend')}
            flex={{ shrink: 0 }}
          >
            <ColumnText size="small" style={{ fontWeight: 300 }}>
              <FormattedMessage {...rootMessages.labels.trend} />
            </ColumnText>
          </ColumnWrap>
          <BarWrap
            flex
            direction="row"
            style={{ position: 'relative' }}
            align="center"
          >
            {annotateMinMax && metric && (
              <Box direction="row" justify="between" width="100%">
                <Text size="xsmall" style={{ transform: 'translateX(-50%)' }}>
                  0
                </Text>
                {metric && (
                  <Text size="xsmall" weight={500} textAlign="center">
                    <FormattedMessage
                      {...rootMessages.labels.xAxis[
                        metric.type === 'esr' ? benchmark : 'cpr'
                      ]}
                    />
                  </Text>
                )}
                <Text size="xsmall" style={{ transform: 'translateX(50%)' }}>
                  {metric.type === 'esr' || metric.metricType === 'indicators'
                    ? '100%'
                    : '10'}
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
