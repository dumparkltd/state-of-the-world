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
  white-space: nowrap;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
    padding: 4px 12px;
  }
`;
const StyledText = styled.span``;
const ButtonWrapperInner = styled(p => (
  <Box direction="row" justify="start" {...p} />
))`
  overflow-x: auto;
`;
const ButtonWrapper = styled.div`
  position: relative;
  &:after {
    content: '';
    box-shadow: inset -15px 0px 10px -10px
      ${({ theme }) => theme.global.colors['light-0']};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20px;
    pointer-events: none;
  }
`;

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
          <Text size="xsmall">
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
      <ButtonWrapper>
        <ButtonWrapperInner>
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
        </ButtonWrapperInner>
      </ButtonWrapper>
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
