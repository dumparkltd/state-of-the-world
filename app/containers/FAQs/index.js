import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {
  Accordion,
  AccordionPanel,
  Box,
  Text,
  Heading,
  Paragraph,
} from 'grommet';
import { Down, Up } from 'grommet-icons';

import { navigate } from 'containers/App/actions';
import BenchmarkOverlay from 'components/Tooltip/BenchmarkOverlay';
import StandardOverlay from 'components/Tooltip/StandardOverlay';

import ButtonIcon from 'styled/ButtonIcon';
import ButtonText from 'styled/ButtonText';

import messages from './messages';

const QUESTIONS = [
  'measureDimensionCPR',
  'measureRightCPR',
  'measureDimensionESR',
  'measureRightESR',
  'measureIndicators',
  'scale',
  'year',
  'standards',
  'benchmarks',
  'indicators',
];

const renderAnswer = (question, intl, metric, navMethodology) => {
  if (question === 'measureRightESR') {
    return (
      <>
        <Paragraph margin={{ vertical: 'xsmall' }}>
          <Text size="small">
            <FormattedMessage
              {...messages.answers.measureRightESR}
              values={{ metric }}
            />
          </Text>
        </Paragraph>
        <Paragraph margin={{ vertical: 'xsmall' }}>
          <Text size="small">
            <FormattedMessage
              {...messages.answers.measureRightESRNotesIntro}
              values={{ metric }}
            />
          </Text>
        </Paragraph>
        <Paragraph margin={{ vertical: 'xsmall' }}>
          <ol>
            <li>
              <Text size="small">
                <FormattedMessage
                  {...messages.answers.measureRightESRNotesOne}
                  values={{ metric }}
                />
              </Text>
            </li>
            <li>
              <Text size="small">
                <FormattedMessage
                  {...messages.answers.measureRightESRNotesTwo}
                  values={{ metric }}
                />
              </Text>
            </li>
            <li>
              <Text size="small">
                <FormattedMessage
                  {...messages.answers.measureRightESRNotesThree}
                  values={{ metric }}
                />
              </Text>
            </li>
          </ol>
        </Paragraph>
        <ButtonText onClick={() => navMethodology()}>
          <Text size="small">
            <FormattedMessage {...messages.methodology} />
          </Text>
        </ButtonText>
      </>
    );
  }
  if (question === 'standards') {
    return (
      <>
        <StandardOverlay />
        <ButtonText onClick={() => navMethodology()}>
          <Text size="small">
            <FormattedMessage {...messages.methodology} />
          </Text>
        </ButtonText>
      </>
    );
  }
  if (question === 'benchmarks') {
    return (
      <>
        <BenchmarkOverlay />
        <ButtonText onClick={() => navMethodology()}>
          <Text size="small">
            <FormattedMessage {...messages.methodology} />
          </Text>
        </ButtonText>
      </>
    );
  }
  return (
    <>
      <Paragraph margin={{ vertical: 'xsmall' }}>
        <Text size="small">
          <FormattedMessage
            {...messages.answers[question]}
            values={{ metric }}
          />
        </Text>
        <ButtonText onClick={() => navMethodology()}>
          <Text size="small">
            <FormattedMessage {...messages.methodology} />
          </Text>
        </ButtonText>
      </Paragraph>
    </>
  );
};

function FAQs({ questions, intl, metric, navMethodology }) {
  const [actives, setActive] = useState([]);
  const validQuestions = questions.filter(q => QUESTIONS.includes(q));
  return (
    <Box pad={{ vertical: 'medium' }}>
      <Accordion
        multiple
        activeIndex={actives}
        onActive={newActive => setActive(newActive)}
      >
        {validQuestions.map((q, index) => (
          <AccordionPanel
            key={q}
            header={
              <Box direction="row" gap="xsmall" align="center">
                <Box>
                  <Heading
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                    style={{ fontWeight: 'normal' }}
                  >
                    <FormattedMessage
                      {...messages.questions[q]}
                      values={{ metric }}
                    />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(index) && (
                    <ButtonIcon as="span" subtle small>
                      <Down size="small" />
                    </ButtonIcon>
                  )}
                  {actives.includes(index) && (
                    <ButtonIcon as="span" subtle small>
                      <Up size="small" />
                    </ButtonIcon>
                  )}
                </Box>
              </Box>
            }
          >
            <Box pad="small" background="light-1">
              {renderAnswer(q, intl, metric, navMethodology)}
            </Box>
          </AccordionPanel>
        ))}
      </Accordion>
    </Box>
  );
}

FAQs.propTypes = {
  navMethodology: PropTypes.func,
  metric: PropTypes.string,
  questions: PropTypes.array,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // navigate to location
  navMethodology: () => {
    dispatch(navigate('page/methodology'));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(FAQs));