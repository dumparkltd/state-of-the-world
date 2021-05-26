import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paragraph } from 'grommet';

import { COLUMNS } from 'containers/App/constants';
import Hint from 'styled/Hint';

import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import messages from './messages';

const getDefaultStandard = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'core';

const isDefaultStandard = (country, standard) =>
  getDefaultStandard(country) === standard;

const getIncomeCategory = country =>
  country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';

function NarrativeESRStandardHint({ standard, country, intl, messageValues }) {
  const msgValues = {
    ...messageValues,
    incomeCategory: lowerCase(
      intl.formatMessage(rootMessages.income[getIncomeCategory(country)]),
    ),
  };

  return isDefaultStandard(country, standard) ? null : (
    <Paragraph margin={{ bottom: 'medium', top: '0' }}>
      <Hint size="xsmall">
        <FormattedMessage
          {...messages.esr.changeStandardNote}
          values={{
            ...msgValues,
            otherStandard: (
              <strong>
                {lowerCase(
                  intl.formatMessage(rootMessages.settings.standard[standard]),
                )}
              </strong>
            ),
            defaultStandard: (
              <strong>
                {lowerCase(
                  intl.formatMessage(
                    rootMessages.settings.standard[getDefaultStandard(country)],
                  ),
                )}
              </strong>
            ),
          }}
        />
      </Hint>
    </Paragraph>
  );
}

NarrativeESRStandardHint.propTypes = {
  country: PropTypes.object,
  messageValues: PropTypes.object,
  standard: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(NarrativeESRStandardHint);
