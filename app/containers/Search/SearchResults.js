import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';

import { selectCountry, selectMetric } from 'containers/App/actions';
import Hint from 'styled/Hint';

import rootMessages from 'messages';
import messages from './messages';

import NavOptionGroup from './NavOptionGroup';

export function SearchResults({
  countries,
  rights,
  onSelectCountry,
  onSelectMetric,
  onSelect,
  intl,
  onClose,
  activeResult,
  setActiveResult,
  maxResult,
}) {
  const [focus, setFocus] = useState(false);
  const onKey = useCallback(
    event => {
      // UP
      if (event.keyCode === 38) {
        setActiveResult(Math.max(0, activeResult - 1));
        setFocus(true);
        event.preventDefault();
      }
      // DOWN
      if (event.keyCode === 40) {
        setActiveResult(Math.min(activeResult + 1, maxResult - 1));
        setFocus(true);
        event.preventDefault();
      }
    },
    [activeResult, maxResult],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKey, false);

    return () => {
      document.removeEventListener('keydown', onKey, false);
    };
  }, [activeResult, maxResult]);

  const hasMetrics = rights.length > 0;
  const hasCountries = countries && countries.length > 0;
  return (
    <Box flex overflow="auto" pad={{ top: 'medium' }}>
      {!hasCountries && !hasMetrics && (
        <Box pad="small">
          <Hint italic>
            <FormattedMessage {...messages.noResults} />
          </Hint>
        </Box>
      )}
      {rights.length > 0 && (
        <NavOptionGroup
          label={intl.formatMessage(rootMessages.metricTypes.rights)}
          options={rights}
          activeResult={activeResult}
          onClick={key => {
            onClose();
            onSelect();
            onSelectMetric(key);
          }}
          focus={focus}
          onFocus={index => setActiveResult(index)}
        />
      )}
      {hasCountries && (
        <NavOptionGroup
          label={intl.formatMessage(rootMessages.labels.countries)}
          options={countries}
          activeResult={activeResult - rights.length}
          onClick={key => {
            onClose();
            onSelect();
            onSelectCountry(key);
          }}
          focus={focus}
          onFocus={index => setActiveResult(index + rights.length)}
        />
      )}
    </Box>
  );
}

SearchResults.propTypes = {
  onSelectCountry: PropTypes.func,
  onSelectMetric: PropTypes.func,
  setActiveResult: PropTypes.func,
  countries: PropTypes.array,
  rights: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  search: PropTypes.string,
  intl: intlShape.isRequired,
  activeResult: PropTypes.number,
  maxResult: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: code => dispatch(selectMetric(code)),
    onSelectCountry: code => dispatch(selectCountry(code)),
    intl: intlShape.isRequired,
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SearchResults));
