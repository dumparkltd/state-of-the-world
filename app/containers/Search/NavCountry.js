import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Box } from 'grommet';
import { withTheme } from 'styled-components';
import { groupBy } from 'lodash/collection';

import { getHeaderHeight } from 'utils/responsive';

import { selectCountry } from 'containers/App/actions';
import { getCountries } from 'containers/App/selectors';

import Hint from 'styled/Hint';

import rootMessages from 'messages';
import messages from './messages';
import { prepCountries } from './search';

import NavWrapper from './NavWrapper';
import NavTop from './NavTop';
import NavScroll from './NavScroll';
import NavOptionGroup from './NavOptionGroup';

const getActiveOffset = (index, list, grouped) =>
  list.reduce((offset, key) => {
    const keyIndex = list.indexOf(key);
    if (keyIndex < index) return offset + grouped[key].length;
    return offset;
  }, 0);

export function NavCountry({
  countries,
  onSelectCountry,
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
    [focusOption],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKey, false);

    return () => {
      document.removeEventListener('keydown', onKey, false);
    };
  }, [focusOption]);
  const sorted = countries && prepCountries(countries, search, intl);
  const grouped = groupBy(sorted, 'group');
  const groupKeys = Object.keys(grouped).sort((a, b) => {
    const aLabel = intl.formatMessage(rootMessages.un_regions[a]);
    const bLabel = intl.formatMessage(rootMessages.un_regions[b]);
    if (a === 'none') return 1;
    if (b === 'none') return -1;
    return aLabel < bLabel ? -1 : 1;
  });

  // figure out available height for IE11
  const h = window.innerHeight - getHeaderHeight(size, theme);

  return (
    <NavWrapper h={h}>
      <NavTop
        onClose={() => onClose()}
        search={search}
        onSearch={s => {
          setSearch(s);
          setFocusOption(0);
        }}
        placeholder={intl.formatMessage(messages.countrySearch)}
        size={size}
      />
      <NavScroll>
        <Box flex overflow="auto" pad={{ top: 'small', bottom: 'medium' }}>
          {(!sorted || sorted.length === 0) && (
            <Box pad="small">
              <Hint italic>
                <FormattedMessage {...messages.noResults} />
              </Hint>
            </Box>
          )}
          {sorted && sorted.length > 0 && (
            <>
              {groupKeys.map((gkey, index, list) => {
                const offset = getActiveOffset(index, list, grouped);
                return (
                  <NavOptionGroup
                    key={gkey}
                    label={intl.formatMessage(rootMessages.un_regions[gkey])}
                    options={grouped[gkey]}
                    focusOption={focusOption - offset}
                    activeCode={activeCode}
                    onClick={key => {
                      onClose();
                      onSelectCountry(key);
                    }}
                  />
                );
              })}
            </>
          )}
        </Box>
      </NavScroll>
    </NavWrapper>
  );
}

NavCountry.propTypes = {
  onSelectCountry: PropTypes.func,
  onClose: PropTypes.func,
  countries: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  intl: intlShape.isRequired,
  size: PropTypes.string,
  theme: PropTypes.object,
  activeCode: PropTypes.string,
};

const mapStateToProps = state => ({
  countries: getCountries(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSelectCountry: country => dispatch(selectCountry(country)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(withTheme(NavCountry)));
