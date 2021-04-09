import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';
import styled from 'styled-components';

import { COLUMNS } from 'containers/App/constants';

import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import messages from './messages';

const getDefaultStandard = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'core';

const isDefaultStandard = (country, standard) =>
  getDefaultStandard(country) === standard;

const getIncomeCategory = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';

const StyledParagraph = styled(Paragraph)``;

function NarrativeESRStandardHint({ standard, country, intl, messageValues }) {
  const msgValues = {
    ...messageValues,
    otherStandard: lowerCase(
      intl.formatMessage(rootMessages.settings.standard[standard]),
    ),
    defaultStandard: lowerCase(
      intl.formatMessage(
        rootMessages.settings.standard[getDefaultStandard(country)],
      ),
    ),
    incomeCategory: lowerCase(
      intl.formatMessage(rootMessages.income[getIncomeCategory(country)]),
    ),
  };

  return isDefaultStandard(country, standard) ? null : (
    <StyledParagraph margin={{ bottom: 'medium' }}>
      <FormattedMessage
        {...messages.esr.changeStandardNote}
        values={msgValues}
      />
    </StyledParagraph>
  );
}

NarrativeESRStandardHint.propTypes = {
  country: PropTypes.object,
  messageValues: PropTypes.object,
  standard: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESRStandardHint);
