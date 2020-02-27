import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { injectIntl, intlShape } from 'react-intl';

import { Box, DropButton, ResponsiveContext, Text } from 'grommet';
import { FormDown, FormUp, Ascend, Descend } from 'grommet-icons';

import ButtonIcon from 'styled/ButtonIcon';
import { isMinSize, isMaxSize } from 'utils/responsive';

import messages from './messages';
import SortOptions from './SortOptions';

const StyledDropButton = styled(DropButton)`
  &:hover {
    color: ${({ theme }) => theme.global.colors.highlight3};
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  width: 30px;
  height: 30px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    width: 35px;
    height: 35px;
  }
`;

export function ChartSettingSort({
  sort,
  options,
  order,
  onSortSelect,
  onOrderToggle,
  intl,
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <ResponsiveContext.Consumer>
      {size => {
        // prettier-ignore
        const label = size !== 'small'
          ? (
            <Text style={{ whiteSpace: 'nowrap' }}>
              {`${intl.formatMessage(messages.sortBy)} ${intl.formatMessage(messages.sortOptions[sort])}`}
            </Text>
          )
          : (
            <Text size="xsmall">
              {`${intl.formatMessage(messages.sortOptions[sort])}`}
            </Text>
          );
        return (
          <Box
            direction="row"
            pad={
              isMaxSize(size, 'medium')
                ? { top: 'small' }
                : { vertical: '10px', left: 'small' }
            }
            align="center"
            responsive={false}
            flex={{ shrink: 0 }}
          >
            <Box flex={{ shrink: 0 }}>
              <StyledDropButton
                plain
                reverse
                gap="xxsmall"
                alignSelf="end"
                margin={
                  isMinSize(size, 'large')
                    ? { horizontal: 'xsmall' }
                    : { horizontal: 'hair' }
                }
                icon={optionsOpen ? <FormUp /> : <FormDown />}
                label={label}
                onClose={() => setOptionsOpen(false)}
                onOpen={() => setOptionsOpen(true)}
                open={optionsOpen}
                dropProps={{
                  align: { top: 'bottom', right: 'right' },
                  stretch: false,
                }}
                dropContent={
                  <SortOptions
                    options={options}
                    active={sort}
                    onSelect={value => {
                      setOptionsOpen(false);
                      onSortSelect(value);
                    }}
                  />
                }
              />
            </Box>
            <Box flex={{ shrink: 0 }}>
              <StyledButtonIcon
                subtle
                onClick={() => onOrderToggle(order === 'asc' ? 'desc' : 'asc')}
              >
                {order === 'asc' && (
                  <Ascend size={size === 'small' ? 'small' : 'large'} />
                )}
                {order === 'desc' && (
                  <Descend size={size === 'small' ? 'small' : 'large'} />
                )}
              </StyledButtonIcon>
            </Box>
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
}

ChartSettingSort.propTypes = {
  intl: intlShape.isRequired,
  sort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  options: PropTypes.array,
  order: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onSortSelect: PropTypes.func,
  onOrderToggle: PropTypes.func,
};

export default injectIntl(ChartSettingSort);