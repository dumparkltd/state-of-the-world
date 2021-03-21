/**
 *
 * ChartSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
// import styled from 'styled-components';
import { Box } from 'grommet';

import { getStandardSearch } from 'containers/App/selectors';
import { setStandard } from 'containers/App/actions';
import { STANDARDS } from 'containers/App/constants';

import messages from './messages';

import SettingsToggle from './SettingsToggle';
// import InfoStandard from './InfoStandard';
// import InfoScale from './InfoScale';

export function ChartSettings({ config, standard, onSetStandard, intl }) {
  return (
    <Box direction="row">
      {config.attribute === 'standard' && (
        <SettingsToggle
          setting="standard"
          active={standard}
          onActivate={onSetStandard}
          options={STANDARDS}
          horizontal
          name={intl.formatMessage(messages.labelStandard)}
        />
      )}
    </Box>
  );
}

ChartSettings.propTypes = {
  standard: PropTypes.string,
  onSetStandard: PropTypes.func,
  config: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  standard: state => getStandardSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetStandard: value => dispatch(setStandard(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(ChartSettings));
