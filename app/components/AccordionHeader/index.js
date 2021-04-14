import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { Up, Down } from 'grommet-icons';

function AccordionHeader({ title, open, level = 1 }) {
  // prettier-ignore
  return (
    <Box direction="row" gap="small" align="center">
      <Box>
        <Heading
          responsive={false}
          level={6}
          margin={{ vertical: 'xsmall' }}
          style={level === 2 ? { fontWeight: 400 } : {}}
        >
          {title}
        </Heading>
      </Box>
      <Box margin={{ left: 'auto' }}>
        {!open && <Down size="small" />}
        {open && <Up size="small" />}
      </Box>
    </Box>
  );
}

AccordionHeader.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  level: PropTypes.number,
};

export default AccordionHeader;
