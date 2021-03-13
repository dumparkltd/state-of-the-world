import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import ButtonPrimary from 'styled/ButtonPrimary';

import rootMessages from 'messages';
// import messages from './messages';

const StyledButton = styled(ButtonPrimary)`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.global.edgeSize.xxsmall};
  margin-right: ${({ theme }) => theme.global.edgeSize.xxsmall};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
    padding: 4px 12px;
  }
`;
const StyledText = styled.span``;

const Styled = styled.div`
  padding-bottom: 16px;
`;

export function FilterOptions({
  unRegionFilterValue,
  onRemoveFilter,
  onAddFilter,
  filterValues,
  intl,
  config,
}) {
  const options =
    filterValues.unregion &&
    filterValues.unregion.map(option => {
      let active;
      if (config.unregion === 'all') {
        active = unRegionFilterValue
          ? unRegionFilterValue === option.key
          : !!option.default;
      } else {
        active =
          unRegionFilterValue && unRegionFilterValue !== 'all'
            ? unRegionFilterValue === option.key
            : !!option.default;
      }
      const regionOption = {
        key: 'unregion',
        value: option.key,
        color: active ? option.key : 'dark-4',
        active,
        label: intl.formatMessage(rootMessages.un_regions_short[option.key]),
        onClick: () => {
          // default
          if (option.default) {
            if (!active) {
              onRemoveFilter({
                key: 'unregion',
              });
            }
          }
          // standard
          else if (active) {
            onRemoveFilter({
              key: 'unregion',
              value: option.key,
            });
          } else {
            onAddFilter({
              key: 'unregion',
              value: option.key,
            });
          }
        },
      };
      // }
      return regionOption;
    });
  return (
    <Styled>
      <Box direction="row">
        {options &&
          options.map(option => (
            <StyledButton
              key={option.value}
              color={option.color}
              title={option.label}
              active={option.active}
              onClick={option.onClick}
            >
              <StyledText>{option.label}</StyledText>
            </StyledButton>
          ))}
      </Box>
    </Styled>
  );
}

FilterOptions.propTypes = {
  intl: intlShape.isRequired,
  unRegionFilterValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onRemoveFilter: PropTypes.func,
  onAddFilter: PropTypes.func,
  filterValues: PropTypes.object,
  config: PropTypes.object,
};

export default injectIntl(FilterOptions);
