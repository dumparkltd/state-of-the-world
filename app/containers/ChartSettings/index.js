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
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box } from 'grommet';

import { lowerCase } from 'utils/string';

import { getStandardSearch, getNotes } from 'containers/App/selectors';
import { setStandard, removeNote } from 'containers/App/actions';
import { STANDARDS } from 'containers/App/constants';

import rootMessages from 'messages';
import messages from './messages';

import SettingsToggle from './SettingsToggle';

export function ChartSettings({
  config,
  standard,
  onSetStandard,
  intl,
  notes,
  onDismissNote,
}) {
  // prettier-ignore
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
          note={notes && notes.asChanged && notes.asChanged.msg &&
            <FormattedMessage
              {... messages[notes.asChanged.msg]}
              values={{
                type: (
                  <strong>
                    {
                      lowerCase(intl.formatMessage(
                        rootMessages.income[standard === 'hi' ? 'hi' : 'lmi'],
                      ))
                    }
                  </strong>
                ),
              }}
            />
          }
          onDismissNote={() => onDismissNote('asChanged')}
        />
      )}
    </Box>
  );
}

ChartSettings.propTypes = {
  standard: PropTypes.string,
  onSetStandard: PropTypes.func,
  config: PropTypes.object,
  onDismissNote: PropTypes.func,
  notes: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  standard: state => getStandardSearch(state),
  notes: state => getNotes(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetStandard: value => dispatch(setStandard(value)),
    onDismissNote: key => dispatch(removeNote(key)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(ChartSettings));
