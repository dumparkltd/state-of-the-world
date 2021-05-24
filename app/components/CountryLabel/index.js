import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { isCountryHighIncome, hasCountryGovRespondents } from 'utils/countries';

import rootMessages from 'messages';

const StyledMarks = styled.span`
  font-weight: normal !important;
  position: relative;
`;

const Sup = styled.sup`
  position: absolute;
  right: -5px;
  top: -3px;
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
        {hiLabel && (
          <Sup>
            <small>
              <FormattedMessage {...rootMessages.labels.hiCountry} />
            </small>
          </Sup>
        )}
        {respondentsLabel && (
          <Sup>
            <small>
              <FormattedMessage {...rootMessages.labels.govResponseCountry} />
            </small>
          </Sup>
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
