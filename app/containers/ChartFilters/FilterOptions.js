import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import ButtonPrimary from 'styled/ButtonPrimary';

import rootMessages from 'messages';
import messages from './messages';

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
  onAddFilter,
  filterValues,
  intl,
  config,
}) {
  let options;
  if (config.attribute === 'unregion') {
    options =
      filterValues.unregion &&
      filterValues.unregion.map(option => {
        let active;
        if (config.all) {
          active = unRegionFilterValue
            ? unRegionFilterValue === option.key ||
              unRegionFilterValue === 'all'
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
          disabled: unRegionFilterValue === option.key,
          onClick: () =>
            onAddFilter({
              key: 'unregion',
              value: option.key,
            }),
        };
        // }
        return regionOption;
      });
  }
  return (
    <Styled>
      {config.attribute === 'unregion' && (
        <Box pad={{ bottom: 'xsmall' }} direction="row">
          <Text size="small">
            {config.type === 'filter' && config.all && (
              <FormattedMessage {...messages.unregionFilterAll} />
            )}
            {config.type === 'filter' && !config.all && (
              <FormattedMessage {...messages.unregionFilter} />
            )}
            {config.type === 'highlight' && (
              <FormattedMessage {...messages.unregionHighlight} />
            )}
          </Text>
        </Box>
      )}
      <Box direction="row">
        {options &&
          options.map(option => (
            <StyledButton
              key={option.value}
              color={option.color}
              title={option.label}
              active={option.active}
              onClick={option.onClick}
              disabled={option.disabled}
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
  onAddFilter: PropTypes.func,
  filterValues: PropTypes.object,
  config: PropTypes.object,
};

export default injectIntl(FilterOptions);
