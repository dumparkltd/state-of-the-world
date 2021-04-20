import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import styled from 'styled-components';

import Hint from 'styled/Hint';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled(Hint)`
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  font-size: 12px;
  line-height: 16px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  margin: 10px 0 20px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 14px;
    line-height: 20px;
  }
`;

function Source({ center = false, maxWidth = 'none', type, intl }) {
  return (
    <Styled center={center} maxWidth={maxWidth}>
      {type === 'esr' && (
        <FormattedMessage
          {...messages.sourceESR}
          values={{
            linkRightsTracker: (
              <a
                target="_blank"
                href={intl.formatMessage(rootMessages.sources.urlRightsTracker)}
              >
                <FormattedMessage
                  {...rootMessages.sources.anchorRightsTracker}
                />
              </a>
            ),
            linkSERF: (
              <a
                target="_blank"
                href={intl.formatMessage(rootMessages.sources.urlSERF)}
              >
                <FormattedMessage {...rootMessages.sources.anchorSERF} />
              </a>
            ),
          }}
        />
      )}
      {type === 'cpr' && (
        <FormattedMessage
          {...messages.sourceCPR}
          values={{
            linkRightsTracker: (
              <a
                target="_blank"
                href={intl.formatMessage(rootMessages.sources.urlRightsTracker)}
              >
                <FormattedMessage
                  {...rootMessages.sources.anchorRightsTracker}
                />
              </a>
            ),
          }}
        />
      )}
      {type === 'vdem' && (
        <FormattedMessage
          {...messages.sourceVDEM}
          values={{
            linkVDEM: (
              <a
                target="_blank"
                href={intl.formatMessage(rootMessages.sources.urlVDEM)}
              >
                <FormattedMessage {...rootMessages.sources.anchorVDEM} />
              </a>
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
