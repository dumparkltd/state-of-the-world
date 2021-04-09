import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Paragraph } from 'grommet';
import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import messages from './messages';

function NarrativeESRNoData({
  messageValues,
  isRecommendedStandard,
  hasScoreForOtherStandard,
  otherStandard,
  intl,
}) {
  // {!hasOtherESR && (
  //   <div>no ESR data available</div>
  // )}
  // {otherStandard && hasOtherESR && (
  //   <div>no data available for current (not recommended) standard</div>
  // )}
  // {!otherStandard && hasOtherESR && (
  //   <div>no data available for current (recommended) standard</div>
  // )}
  return (
    <Paragraph margin={{ bottom: 'medium' }}>
      {!hasScoreForOtherStandard && (
        <FormattedMessage {...messages.esr.noData} values={messageValues} />
      )}
      {hasScoreForOtherStandard && !isRecommendedStandard && (
        <FormattedMessage
          {...messages.esr.dataOnlyForRecommendedStandard}
          values={{
            ...messageValues,
            otherStandard: lowerCase(
              intl.formatMessage(rootMessages.settings.standard[otherStandard]),
            ),
          }}
        />
      )}
      {hasScoreForOtherStandard && isRecommendedStandard && (
        <FormattedMessage
          {...messages.esr.dataOnlyForOtherStandard}
          values={{
            ...messageValues,
            otherStandard: lowerCase(
              intl.formatMessage(rootMessages.settings.standard[otherStandard]),
            ),
          }}
        />
      )}
    </Paragraph>
  );
}

NarrativeESRNoData.propTypes = {
  messageValues: PropTypes.object,
  hasScoreForOtherStandard: PropTypes.bool,
  isRecommendedStandard: PropTypes.bool,
  otherStandard: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESRNoData);
