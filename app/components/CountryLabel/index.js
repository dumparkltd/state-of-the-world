import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { isCountryHighIncome, hasCountryGovRespondents } from 'utils/countries';

import rootMessages from 'messages';

const StyledMarks = styled.span`
  font-weight: normal !important;
`;

export function CountryLabel({
  country,
  name,
  showHILabel = true,
  showGovRespondentsLabel = true,
}) {
  if (!country) return null;

  const hiLabel = showHILabel && isCountryHighIncome(country);
  const respondentsLabel =
    showGovRespondentsLabel && hasCountryGovRespondents(country);

  return (
    <span>
      {name}
      <StyledMarks>
        {` `}
        {hiLabel && <FormattedMessage {...rootMessages.labels.hiCountry} />}
        {respondentsLabel && (
          <sup>
            <FormattedMessage {...rootMessages.labels.govResponseCountry} />
          </sup>
        )}
      </StyledMarks>
    </span>
  );
}

CountryLabel.propTypes = {
  showHILabel: PropTypes.bool,
  showGovRespondentsLabel: PropTypes.bool,
  country: PropTypes.object,
  name: PropTypes.string,
};

export default CountryLabel;
