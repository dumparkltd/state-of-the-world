import React from 'react';
import PropTypes from 'prop-types';

import NavCountry from 'containers/Search/NavCountry';
import NavMetric from 'containers/Search/NavMetric';

const NavBottomContent = ({ type, size, setOpen }) => {
  if (type === 'metrics') {
    return <NavMetric size={size} onClose={() => setOpen(false)} />;
  }
  if (type === 'countries') {
    return <NavCountry size={size} onClose={() => setOpen(false)} />;
  }
  return null;
};

NavBottomContent.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  setOpen: PropTypes.func,
};

export default NavBottomContent;
