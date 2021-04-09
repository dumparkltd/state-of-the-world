import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { Paragraph } from 'grommet';
// import ButtonTextIcon from 'styled/ButtonTextIcon';

import messages from './messages';

function NarrativeCPRNoData({ messageValues }) {
  return (
    <Paragraph margin={{ bottom: 'medium' }}>
      <FormattedMessage {...messages.cpr.noData} values={messageValues} />
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
