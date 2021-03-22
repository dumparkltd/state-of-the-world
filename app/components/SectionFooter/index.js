/**
 *
 * SectionFooter
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Text } from 'grommet';
// import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';

// styles
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import { isMinSize } from 'utils/responsive';

// import rootMessages from 'messages';
import messages from './messages';

export function SectionFooter() {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <SectionContainer background="footer" pad={{ top: 'medium' }}>
          <ContentMaxWidth stretch direction="column">
            <Box
              basis={isMinSize(size, 'large') ? '1/2' : '1'}
              pad={{ left: isMinSize(size, 'large') ? 'ms' : '0' }}
              margin={{ bottom: 'large' }}
            >
              <Text size="small">
                <FormattedMessage {...messages.text} />
              </Text>
            </Box>
          </ContentMaxWidth>
        </SectionContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

// SectionFooter.propTypes = {
//   // nav: PropTypes.func,
//   locale: PropTypes.string,
//   intl: intlShape.isRequired,
// };

export default SectionFooter;
