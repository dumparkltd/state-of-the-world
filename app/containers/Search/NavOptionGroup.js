import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text } from 'grommet';

import NavOption from './NavOption';

const NavOptionWrap = styled(Box)`
  padding-top: 10px;
  padding-bottom: 30px;
`;
const StyledText = styled(Text)`
  padding: 0 10px 0 16px;
  margin-bottom: 5px;
`;

export function NavOptionGroup({
  label,
  options,
  onClick,
  subject,
  focusOption,
  focus,
  onFocus,
  activeCode,
}) {
  const myRefs = useRef([]);
  const onEnter = useCallback(
    event => {
      // on enter
      if (event.keyCode === 13) {
        event.preventDefault();
        if (options[focusOption]) onClick(options[focusOption].code);
      }
    },
    [options, focusOption],
  );

  useEffect(() => {
    document.addEventListener('keydown', onEnter, false);

    return () => {
      document.removeEventListener('keydown', onEnter, false);
    };
  }, [options, focusOption]);

  useEffect(() => {
    if (focus && myRefs && myRefs.current && myRefs.current[focusOption]) {
      myRefs.current[focusOption].focus();
    }
  }, [options, focusOption, focus]);
  return (
    <div>
      <NavOptionWrap>
        {label && (
          <StyledText color="dark-3" size="small">
            {label}
          </StyledText>
        )}
        {options.map((m, index) => (
          <NavOption
            key={m.code}
            onClick={() => onClick(m.code)}
            special={m.special}
            ref={el => {
              myRefs.current[index] = el;
            }}
            onFocus={() => onFocus && onFocus(index)}
            inFocus={index === focusOption}
            isActive={m.code === activeCode}
          >
            <Box direction="row" align="end" fill="horizontal" width="100%">
              <Text color={subject}>{m.label}</Text>
            </Box>
          </NavOption>
        ))}
      </NavOptionWrap>
    </div>
  );
}

NavOptionGroup.propTypes = {
  label: PropTypes.string,
  subject: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  focusOption: PropTypes.number,
  activeCode: PropTypes.string,
  focus: PropTypes.bool,
};

export default NavOptionGroup;
