import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Drop, ResponsiveContext } from 'grommet';

import { isMinSize, isMaxSize } from 'utils/responsive';

import NavCountry from 'containers/Search/NavCountry';
import NavMetric from 'containers/Search/NavMetric';
import NavBottomButton from './NavBottomButton';

export function NavBottom({ active, onClick, type, activeCode }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <NavBottomButton
            active={active}
            open={open}
            onClick={() => {
              if (onClick) onClick();
              setOpen(!open);
            }}
            label={type}
            ref={buttonRef}
            windowSize={size}
          />
          {open && isMaxSize(size, 'sm') && type === 'metrics' && (
            <NavMetric
              size={size}
              onClose={() => setOpen(false)}
              activeCode={activeCode}
            />
          )}
          {open && isMaxSize(size, 'sm') && type === 'countries' && (
            <NavCountry
              size={size}
              onClose={() => setOpen(false)}
              activeCode={activeCode}
            />
          )}
          {open && isMinSize(size, 'medium') && (
            <Drop
              align={{ top: 'bottom', right: 'right' }}
              target={buttonRef.current}
              onClickOutside={e => {
                if (buttonRef.current && buttonRef.current.contains(e.target)) {
                  return;
                }
                setOpen(false);
              }}
            >
              {type === 'metrics' && (
                <NavMetric
                  size={size}
                  onClose={() => setOpen(false)}
                  activeCode={activeCode}
                />
              )}
              {type === 'countries' && (
                <NavCountry
                  size={size}
                  onClose={() => setOpen(false)}
                  activeCode={activeCode}
                />
              )}
            </Drop>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

NavBottom.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  activeCode: PropTypes.string,
};

export default NavBottom;
