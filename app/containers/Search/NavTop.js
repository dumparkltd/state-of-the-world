import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import { Close, Search } from 'grommet-icons';
import { isMinSize, isMaxSize } from 'utils/responsive';

import ButtonIcon from 'styled/ButtonIcon';

import TextInput from './TextInput';

const StyledButtonIcon = styled(ButtonIcon)`
  background: transparent;
  &:hover {
    background: transparent;
  }
  &:active {
    background: transparent;
  }
  &:focus {
    background: transparent;
  }
`;
const Top = styled.div`
  background-color: ${({ theme }) => theme.global.colors['dark-4']};
  width: 100%;
  height: ${({ theme }) => theme.navTop};
`;

export function NavTop({
  search,
  onClose,
  onSearch,
  placeholder = 'search',
  size,
}) {
  const textInputRef = useRef(null);
  useEffect(() => {
    if (textInputRef && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  return (
    <Top>
      <Box
        pad={{
          horizontal: 'small',
          vertical: 'small',
        }}
        direction="row"
        fill="vertical"
        align="center"
        responsive={false}
      >
        <Box
          background="white"
          direction="row"
          align="center"
          round="xlarge"
          height={isMaxSize(size, 'ms') ? '26px' : '32px'}
          pad={{ horizontal: 'ms', vertical: 'xsmall' }}
          fill="horizontal"
        >
          <TextInput
            plain
            value={search}
            onChange={evt => evt && evt.target && onSearch(evt.target.value)}
            placeholder={placeholder}
            ref={isMinSize(size, 'medium') ? textInputRef : null}
          />
          {search && search.length > 0 && (
            <Button
              onClick={() => onSearch('')}
              icon={
                <Close
                  color="dark-3"
                  size={isMaxSize(size, 'ms') ? 'small' : 'medium'}
                />
              }
              style={{ padding: '0' }}
            />
          )}
          {(!search || search.length === 0) && <Search color="dark-3" />}
        </Box>
        {isMaxSize(size, 'ms') && (
          <Box
            pad={{ vertical: 'xsmall' }}
            flex={{ shrink: 0 }}
            margin={{ left: 'small' }}
          >
            <StyledButtonIcon onClick={() => onClose()}>
              <Close color="white" size="large" />
            </StyledButtonIcon>
          </Box>
        )}
      </Box>
    </Top>
  );
}

NavTop.propTypes = {
  onClose: PropTypes.func,
  onSearch: PropTypes.func,
  search: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
};

export default NavTop;
