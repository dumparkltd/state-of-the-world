import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box, Text } from 'grommet';
import styled from 'styled-components';

import { GRADES } from 'containers/App/constants';
import rootMessages from 'messages';
// import messages from './messages';

const Styled = styled.div``;

function ChartNotes({ intl, notes }) {
  if (!notes) return null;
  const anyNotes = Object.keys(notes).some(key => notes[key]);
  if (!anyNotes) return null;
  return (
    <Styled>
      {notes.gradesESR && (
        <Box>
          <Text size="xxsmall" textAlign="start">
            <FormattedMessage {...rootMessages.charts.gradesESR} />
          </Text>
          <Box margin={{ top: 'xxsmall' }}>
            {GRADES.esr
              .sort((a, b) => (a.min > b.min ? -1 : 1))
              .map(g => (
                <Text key={g.class} size="xxsmall" textAlign="start">
                  <FormattedMessage
                    {...rootMessages.charts.gradeBracket}
                    values={{
                      grade: intl.formatMessage(
                        rootMessages.labels.grades[g.class],
                      ),
                      min: g.min,
                      max: g.max,
                      unit: '%',
                    }}
                  />
                </Text>
              ))}
          </Box>
        </Box>
      )}
      {notes.gradesCPR && (
        <Box>
          <Text size="xxsmall" textAlign="start">
            <FormattedMessage {...rootMessages.charts.gradesCPR} />
          </Text>
          <Box margin={{ top: 'xxsmall' }}>
            {GRADES.cpr
              .sort((a, b) => (a.min > b.min ? -1 : 1))
              .map(g => (
                <Text key={g.class} size="xxsmall" textAlign="start">
                  <FormattedMessage
                    {...rootMessages.charts.gradeBracket}
                    values={{
                      grade: intl.formatMessage(
                        rootMessages.labels.grades[g.class],
                      ),
                      min: g.min,
                      max: g.max,
                      unit: '',
                    }}
                  />
                </Text>
              ))}
          </Box>
        </Box>
      )}
      {notes.gradesVDEM && (
        <Box>
          <Text size="xxsmall" textAlign="start">
            <FormattedMessage {...rootMessages.charts.gradesVDEM} />
          </Text>
        </Box>
      )}
    </Styled>
  );
}

ChartNotes.propTypes = {
  notes: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ChartNotes);
