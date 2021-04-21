import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';

import FormattedMarkdown from 'components/FormattedMarkdown';
import AccordionHeader from 'components/AccordionHeader';

import { PATHS } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';
import InfoStandard from 'containers/ChartSettings/InfoStandard';

import { lowerCase } from 'utils/string';

import MethodologyLink from './MethodologyLink';
import messages from './messages';

const OL = styled.ol`
  padding-left: 20px;
  margin: 0;
`;
const LI = styled.li`
  margin-bottom: 8px;
`;

const renderAnswer = (question, intl, msgValues, onSelectPage) => {
  if (question === 'measureRightESR') {
    return (
      <>
        <Text size="small">
          <FormattedMarkdown
            {...messages.answers.measureRightESR}
            values={msgValues}
          />
        </Text>
        <Text size="small">
          <FormattedMarkdown
            {...messages.answers.measureRightESRNotesIntro}
            values={msgValues}
          />
        </Text>
        <Text size="small">
          <OL>
            <LI>
              <FormattedMarkdown
                {...messages.answers.measureRightESRNotesOne}
                values={msgValues}
              />
            </LI>
            <LI>
              <FormattedMarkdown
                {...messages.answers.measureRightESRNotesTwo}
                values={msgValues}
              />
            </LI>
            <LI>
              <FormattedMarkdown
                {...messages.answers.measureRightESRNotesThree}
                values={msgValues}
              />
            </LI>
          </OL>
        </Text>
        <MethodologyLink
          onClick={() => onSelectPage('methodology-esr')}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'standards') {
    return (
      <>
        <InfoStandard />
        <MethodologyLink
          onClick={() => onSelectPage('methodology-esr')}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'uncertainty') {
    return (
      <>
        <Text size="small">
          <FormattedMarkdown {...messages.answers.uncertainty} />
        </Text>
        <Text size="small">
          <FormattedMarkdown {...messages.answers.uncertaintyLong} />
        </Text>
        <MethodologyLink
          onClick={() => onSelectPage('methodology-cpr')}
          text={<FormattedMessage {...messages.methodologyUncertainty} />}
        />
      </>
    );
  }

  let methPage = 'methodology';
  if (question === 'measureVDEM') methPage = 'methodology-vdem';
  if (question === 'measureRightCPR') methPage = 'methodology-cpr';
  return (
    <>
      <Text size="small">
        <FormattedMarkdown {...messages.answers[question]} values={msgValues} />
      </Text>
      <MethodologyLink
        onClick={() => onSelectPage(methPage)}
        text={<FormattedMessage {...messages.methodology} />}
      />
    </>
  );
};

function FAQs({ questions, intl, metric, countryCode, onSelectPage }) {
  const [actives, setActive] = useState([]);

  useEffect(() => {
    // reset state
    setActive([]);
  }, [metric, countryCode]);

  const msgValues = {
    metric,
    metricLower: lowerCase(metric),
  };

  return (
    <Box pad={{ vertical: 'large' }}>
      <Heading responsive={false} level={3}>
        <FormattedMessage {...messages.title} />
      </Heading>
      <Accordion
        multiple
        activeIndex={actives}
        onActive={newActive => setActive(newActive)}
      >
        {/* for all pages */}
        {questions.map((q, index) => (
          <AccordionPanel
            key={q}
            header={
              <AccordionHeader
                title={intl.formatMessage(messages.questions[q], msgValues)}
                open={actives.includes(index)}
                level={2}
              />
            }
          >
            <Box pad={{ vertical: 'small' }} border="top">
              {renderAnswer(q, intl, msgValues, onSelectPage)}
            </Box>
          </AccordionPanel>
        ))}
      </Accordion>
    </Box>
  );
}

FAQs.propTypes = {
  questions: PropTypes.array,
  metric: PropTypes.string,
  onSelectMetric: PropTypes.func,
  dateRange: PropTypes.object,
  countryCode: PropTypes.string,
  onSelectPage: PropTypes.func,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // navigate to location
  onSelectPage: key => {
    dispatch(
      navigate(`${PATHS.PAGE}/${key}`, {
        trackEvent: {
          category: 'Content',
          action: 'FAQs: open page',
          value: 'methodology',
        },
      }),
    );
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(FAQs));
