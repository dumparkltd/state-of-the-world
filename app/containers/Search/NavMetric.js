import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';
import { withTheme } from 'styled-components';

import { RIGHTS } from 'containers/App/constants';
import { selectMetric } from 'containers/App/actions';

import { getHeaderHeight } from 'utils/responsive';

import rootMessages from 'messages';

import { prepMetrics } from './search';

import NavWrapper from './NavWrapper';
import NavTop from './NavTop';
import NavScroll from './NavScroll';
import NavOptionGroup from './NavOptionGroup';

import messages from './messages';

export function NavMetric({ onSelectMetric, intl, onClose, size, theme }) {
  const [search, setSearch] = useState('');
  const [activeResult, setActiveResult] = useState(0);
  // const [focus, setFocus] = useState(false);
  const onKey = useCallback(
    event => {
      // UP
      if (event.keyCode === 38) {
        setActiveResult(Math.max(0, activeResult - 1));
        // setFocus(true);
        event.preventDefault();
      }
      // DOWN
      if (event.keyCode === 40) {
        setActiveResult(activeResult + 1);
        // setFocus(true);
        event.preventDefault();
      }
    },
    [activeResult, search],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKey, false);

    return () => {
      document.removeEventListener('keydown', onKey, false);
    };
  }, [activeResult]);
  const esr = prepMetrics(
    RIGHTS.filter(r => r.type === 'esr'),
    'rights',
    search,
    intl,
  );
  const cpr = prepMetrics(
    RIGHTS.filter(r => r.type === 'cpr'),
    'rights',
    search,
    intl,
  );
  const hasMetrics = esr.length > 0 || cpr.length > 0;
  // figure out available height for IE11
  const h = window.innerHeight - getHeaderHeight(size, theme);

  return (
    <NavWrapper h={h}>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => setSearch(s)}
        placeholder={intl.formatMessage(messages.metricSearch)}
        size={size}
      />
      <NavScroll>
        <Box flex overflow="auto" pad={{ vertical: 'medium' }}>
          {!hasMetrics && <FormattedMessage {...messages.noResults} />}
          {esr.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.rightsTypes.esr)}
              options={esr}
              activeResult={activeResult}
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
          {cpr.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.rightsTypes.cpr)}
              options={cpr}
              activeResult={activeResult - esr.length}
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
        </Box>
      </NavScroll>
    </NavWrapper>
  );
}

NavMetric.propTypes = {
  onSelectMetric: PropTypes.func,
  onClose: PropTypes.func,
  intl: intlShape.isRequired,
  size: PropTypes.string,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: metric => dispatch(selectMetric(metric)),
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(NavMetric)));
