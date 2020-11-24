/**
 *
 * LayerSettings
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Heading, Paragraph } from 'grommet';

import { getStandardSearch } from 'containers/App/selectors';
import { setStandard } from 'containers/App/actions';
import { STANDARDS } from 'containers/App/constants';

import messages from './messages';

import SettingsToggle from './SettingsToggle';
import InfoStandard from './InfoStandard';
// import InfoScale from './InfoScale';

const SettingWrap = styled.div`
  margin-bottom: 30px;
`;

export function LayerSettings({ standard, onSetStandard, layer, intl }) {
  const { showStandard, chartName } = layer;

  return (
    <Box
      direction="column"
      pad={{ left: 'medium', bottom: 'medium', top: 'small' }}
    >
      <Heading level={2}>
        {chartName && (
          <FormattedMessage
            {...messages.labelWithName}
            values={{ name: chartName }}
          />
        )}
        {!chartName && <FormattedMessage {...messages.label} />}
      </Heading>
      <Paragraph>
        <FormattedMessage {...messages.intro} />
      </Paragraph>
      {showStandard && (
        <SettingWrap>
          <SettingsToggle
            setting="standard"
            active={standard}
            onActivate={onSetStandard}
            options={STANDARDS}
            horizontal
            name={intl.formatMessage(messages.labelStandard)}
          />
          <InfoStandard size="xsmall" hasKey />
        </SettingWrap>
      )}
    </Box>
  );
}

LayerSettings.propTypes = {
  standard: PropTypes.string,
  onSetStandard: PropTypes.func,
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
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

export default compose(withConnect)(injectIntl(LayerSettings));
