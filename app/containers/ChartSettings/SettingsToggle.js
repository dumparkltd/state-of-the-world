import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';
import { Close } from 'grommet-icons';

import Tooltip from 'components/Tooltip';
import ButtonToggleSetting from 'styled/ButtonToggleSetting';
import ButtonIcon from 'styled/ButtonIcon';

import rootMessages from 'messages';

// const HEIGHT = 20;
// const heightRotated = HEIGHT * 2 ** (1 / 2); // height * sqrt(2)

function SettingsToggle({
  name,
  options,
  onActivate,
  active,
  setting,
  msgValues,
  note,
  onDismissNote,
}) {
  return (
    <Box
      direction="column"
      flex={{ shrink: 0 }}
      responsive={false}
      margin={{ bottom: 'small' }}
    >
      <Box direction="row" align="center">
        <Box pad={{ bottom: 'xsmall' }} direction="row">
          <Text size="xsmall">
            {name || (
              <FormattedMessage
                {...rootMessages.settings[setting].name}
                values={msgValues}
              />
            )}
          </Text>
          {setting === 'standard' && (
            <Tooltip
              large
              component={
                <Box gap="small">
                  <Box>
                    <Text size="xsmall">
                      <FormattedMessage
                        {...rootMessages.settings.standard.intro}
                      />
                    </Text>
                  </Box>
                  <Box>
                    <Text weight="bold" size="xsmall">
                      <FormattedMessage
                        {...rootMessages.settings.standard.core}
                      />
                    </Text>
                    <Text size="xsmall">
                      <FormattedMessage
                        {...rootMessages.settings.standard.coreInfo}
                      />
                    </Text>
                  </Box>
                  <Box>
                    <Text weight="bold" size="xsmall">
                      <FormattedMessage
                        {...rootMessages.settings.standard.hi}
                      />
                    </Text>
                    <Text size="xsmall">
                      <FormattedMessage
                        {...rootMessages.settings.standard.hiInfo}
                      />
                    </Text>
                  </Box>
                </Box>
              }
            />
          )}
        </Box>
      </Box>
      <Box direction="row" align="center">
        {options.map(option => (
          <ButtonToggleSetting
            key={option.key}
            active={option.key === active}
            disabled={option.key === active}
            onClick={() => {
              onActivate(option.key);
            }}
          >
            <Text size="xsmall">
              <FormattedMessage
                {...rootMessages.settings[setting][option.label || option.key]}
                values={msgValues}
              />
            </Text>
          </ButtonToggleSetting>
        ))}
      </Box>
      {note && (
        <Box direction="row" align="center" gap="xsmall">
          <Text>{note}</Text>
          <ButtonIcon onClick={() => onDismissNote()} subtle>
            <Close size="small" />
          </ButtonIcon>
        </Box>
      )}
    </Box>
  );
}

SettingsToggle.propTypes = {
  onActivate: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
  setting: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  tooltip: PropTypes.node,
  horizontal: PropTypes.bool,
  msgValues: PropTypes.object,
  name: PropTypes.string,
  onDismissNote: PropTypes.func,
  note: PropTypes.string,
};

export default SettingsToggle;
