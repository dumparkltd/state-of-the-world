import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { Paragraph } from 'grommet';
import Hint from 'styled/Hint';
import messages from './messages';

function NarrativeCPRNoData({ messageValues }) {
  return (
    <Paragraph margin={{ bottom: 'medium', top: '0' }}>
      <Hint size="xsmall">
        <FormattedMessage {...messages.cpr.noData} values={messageValues} />
      </Hint>
    </Paragraph>
  );
}
// <ButtonTextIcon
// href={intl.formatMessage(messages.compAssessmentCPR.noDataLinkURL)}
// target="_blank"
// label={intl.formatMessage(messages.compAssessmentCPR.noDataLinkAnchor)}
// gap="xsmall"
// />

NarrativeCPRNoData.propTypes = {
  messageValues: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeCPRNoData);
