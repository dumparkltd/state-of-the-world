import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';
import { withTheme } from 'styled-components';

import { getHeaderHeight } from 'utils/responsive';

import { RIGHTS } from 'containers/App/constants';
import { selectMetric } from 'containers/App/actions';

import Hint from 'styled/Hint';

import rootMessages from 'messages';

import { prepMetrics } from './search';

import NavWrapper from './NavWrapper';
import NavTop from './NavTop';
import NavScroll from './NavScroll';
import NavOptionGroup from './NavOptionGroup';

import messages from './messages';

export function NavMetric({
  onSelectMetric,
  intl,
  onClose,
  size,
  theme,
  activeCode,
}) {
  const [search, setSearch] = useState('');
  const [focusOption, setFocusOption] = useState(0);
  // const [focus, setFocus] = useState(false);
  const onKey = useCallback(
    event => {
      // UP
      if (event.keyCode === 38) {
        setFocusOption(Math.max(0, focusOption - 1));
        // setFocus(true);
        event.preventDefault();
      }
      // DOWN
      if (event.keyCode === 40) {
        setFocusOption(focusOption + 1);
        // setFocus(true);
        event.preventDefault();
      }
    },
    [focusOption, search],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKey, false);

    return () => {
      document.removeEventListener('keydown', onKey, false);
    };
  }, [focusOption]);
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
  const vdem = prepMetrics(
    RIGHTS.filter(r => r.type === 'vdem'),
    'rights',
    search,
    intl,
  );
  const hasMetrics = esr.length > 0 || cpr.length > 0 || vdem.length > 0;
  // figure out available height for IE11
  const h = window.innerHeight - getHeaderHeight(size, theme);

  return (
    <NavWrapper h={h}>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => setSearch(s)}
        placeholder={intl.formatMessage(
          messages[size === 'small' ? 'metricSearchSmall' : 'metricSearch'],
        )}
        size={size}
      />
      <NavScroll>
        <Box flex overflow="auto" pad={{ top: 'small', bottom: 'medium' }}>
          {!hasMetrics && (
            <Box pad="small">
              <Hint italic>
                <FormattedMessage {...messages.noResults} />
              </Hint>
            </Box>
          )}
          {esr.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.rightsTypes.esr)}
              options={esr}
              focusOption={focusOption}
              activeCode={activeCode}
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
              focusOption={focusOption - esr.length}
              activeCode={activeCode}
              onClick={key => {
                onClose();
                onSelectMetric(key);
              }}
            />
          )}
          {vdem.length > 0 && (
            <NavOptionGroup
              label={intl.formatMessage(rootMessages.rightsTypes.vdem)}
              options={vdem}
              focusOption={focusOption - esr.length - cpr.length}
              activeCode={activeCode}
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
  activeCode: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectMetric: code => dispatch(selectMetric({ code })),
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(NavMetric)));
