import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Hint from 'styled/Hint';
import A from 'styled/A';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled(Hint)`
  margin: 0 0 20px;
`;
const StyledA = styled(p => <A hint target="_blank" {...p} />)``;

function Source({ center = false, maxWidth = 'none', type, intl }) {
  return (
    <Styled center={center} maxWidth={maxWidth} size="xxsmall">
      {type === 'esr' && (
        <FormattedMessage
          {...messages.sourceESR}
          values={{
            linkRightsTracker: (
              <StyledA
                href={intl.formatMessage(rootMessages.sources.urlRightsTracker)}
              >
                <FormattedMessage
                  {...rootMessages.sources.anchorRightsTracker}
                />
              </StyledA>
            ),
            linkSERF: (
              <StyledA href={intl.formatMessage(rootMessages.sources.urlSERF)}>
                <FormattedMessage {...rootMessages.sources.anchorSERF} />
              </StyledA>
            ),
          }}
        />
      )}
      {type === 'cpr' && (
        <FormattedMessage
          {...messages.sourceCPR}
          values={{
            linkRightsTracker: (
              <StyledA
                href={intl.formatMessage(rootMessages.sources.urlRightsTracker)}
              >
                <FormattedMessage
                  {...rootMessages.sources.anchorRightsTracker}
                />
              </StyledA>
            ),
          }}
        />
      )}
      {type === 'vdem' && (
        <FormattedMessage
          {...messages.sourceVDEM}
          values={{
            linkVDEM: (
              <StyledA href={intl.formatMessage(rootMessages.sources.urlVDEM)}>
                <FormattedMessage {...rootMessages.sources.anchorVDEM} />
              </StyledA>
            ),
          }}
        />
      )}
    </Styled>
  );
}

Source.propTypes = {
  maxWidth: PropTypes.string,
  type: PropTypes.string, // esr or cpr
  center: PropTypes.bool,
  intl: intlShape,
};

export default injectIntl(Source);
