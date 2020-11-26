import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import styled from 'styled-components';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentContainer from 'styled/ContentContainer';
import Aside from 'components/Aside';
import { Box, Text } from 'grommet';

import rootMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background: ${({ hasAside }) => (hasAside ? 'transparent' : 'white')};
  box-shadow: ${({ hasAside }) =>
    hasAside ? 'none' : '0px -10px 5px 5px rgba(255,255,255,1)'};
`;
const StyledBox = styled(Box)`
  background: ${({ hasAside }) => (!hasAside ? 'transparent' : 'white')};
  box-shadow: ${({ hasAside }) =>
    !hasAside ? 'none' : '-5px -10px 5px -5px rgba(255, 255, 255, 1)'};
  padding-right: ${({ hasAside, theme }) =>
    hasAside ? theme.global.edgeSize.xlarge : 0};
`;

function CountryNotes({ intl, hasAside, notes }) {
  if (!notes) return null;
  const anyNotes = Object.keys(notes).some(key => notes[key]);
  if (!anyNotes) return null;
  return (
    <Styled hasAside={hasAside}>
      <ContentContainer direction="column">
        <ContentMaxWidth hasAside={hasAside}>
          <Box direction="row" fill="horizontal">
            <StyledBox
              pad={{ bottom: 'xsmall', top: 'xsmall' }}
              align="start"
              fill="horizontal"
              hasAside={hasAside}
              background="white"
            >
              {notes.hiCountries && (
                <Text size="xxsmall" color="dark" textAlign="start">
                  <FormattedMessage
                    {...messages.hiNote}
                    values={{
                      hiLabel: intl.formatMessage(
                        rootMessages.labels.hiCountry,
                      ),
                    }}
                  />
                </Text>
              )}
              {notes.govRespondents && (
                <Text size="xxsmall" color="dark" textAlign="start">
                  <FormattedMessage
                    {...messages.govResponseNote}
                    values={{
                      label: intl.formatMessage(
                        rootMessages.labels.govResponseCountry,
                      ),
                      labelSuperscript: (
                        <sup>
                          {intl.formatMessage(
                            rootMessages.labels.govResponseCountry,
                          )}
                        </sup>
                      ),
                    }}
                  />
                </Text>
              )}
            </StyledBox>
            {hasAside && <Aside />}
          </Box>
        </ContentMaxWidth>
      </ContentContainer>
    </Styled>
  );
}

CountryNotes.propTypes = {
  intl: intlShape.isRequired,
  hasAside: PropTypes.bool,
  settingHint: PropTypes.bool,
  notes: PropTypes.object,
};

export default injectIntl(CountryNotes);
