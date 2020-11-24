import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';
import { Down, Up } from 'grommet-icons';

import FormattedMarkdown from 'components/FormattedMarkdown';

import { navigate } from 'containers/App/actions';
import InfoBenchmark from 'containers/LayerSettings/InfoBenchmark';
import InfoStandard from 'containers/LayerSettings/InfoStandard';

import { lowerCase } from 'utils/string';

import rootMessages from 'messages';
import aboutMessages from 'components/AboutMetric/messages';
import MethodologyLink from './MethodologyLink';
import messages from './messages';

const OL = styled.ol`
  padding-left: 20px;
  margin: 0;
`;
const LI = styled.li`
  margin-bottom: 8px;
`;
const StyledText = styled(Text)`
  font-size: 14px;
`;

const renderAnswer = (question, intl, msgValues, navMethodology) => {
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
          onClick={() => navMethodology()}
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
          onClick={() => navMethodology()}
          text={<FormattedMessage {...messages.methodology} />}
        />
      </>
    );
  }
  if (question === 'benchmarks') {
    return (
      <>
        <InfoBenchmark />
        <MethodologyLink
          onClick={() => navMethodology()}
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
          href={intl.formatMessage(messages.methodologyUncertaintyURL)}
          target="_blank"
          text={<FormattedMessage {...messages.methodologyUncertainty} />}
        />
      </>
    );
  }
  return (
    <>
      <Text size="small">
        <FormattedMarkdown {...messages.answers[question]} values={msgValues} />
      </Text>
      <MethodologyLink
        onClick={() => navMethodology()}
        text={
          question === 'grades' ? (
            <FormattedMessage {...messages.methodologyGrades} />
          ) : (
            <FormattedMessage {...messages.methodology} />
          )
        }
      />
    </>
  );
};

function FAQs({ questions, intl, metric, navMethodology, metrics }) {
  const [actives, setActive] = useState([]);
  const msgValues = {
    metric,
    metricLower: lowerCase(metric),
  };

  let metricType;
  let hasAbout;
  const aboutIndex = 0;

  // for metric pages
  if (metrics) {
    /* eslint-disable prefer-destructuring */
    metricType = metrics.metricType;
    /* eslint-enable prefer-destructuring */
    hasAbout = rootMessages[`${metricType}-about`];
  }

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
        {/* for metric pages */}
        {hasAbout && (
          <AccordionPanel
            header={
              <Box
                direction="row"
                gap="xsmall"
                align="center"
                justify="between"
              >
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                    style={{ fontWeight: 400 }}
                  >
                    <FormattedMessage {...aboutMessages.title[metricType]} />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(aboutIndex) && <Down size="small" />}
                  {actives.includes(aboutIndex) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              <StyledText>
                <FormattedMessage
                  {...rootMessages[`${metricType}-about`][metrics.key]}
                />
              </StyledText>
            </Box>
          </AccordionPanel>
        )}

        {/* for all pages */}
        {questions.map((q, index) => (
          <AccordionPanel
            key={q}
            header={
              <Box direction="row" gap="xsmall" align="center">
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                    style={{ fontWeight: 400 }}
                  >
                    <FormattedMessage
                      {...messages.questions[q]}
                      values={msgValues}
                    />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(index) && <Down size="small" />}
                  {actives.includes(index) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small', horizontal: 'xsmall' }} border="top">
              {renderAnswer(q, intl, msgValues, navMethodology)}
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
  metrics: PropTypes.object,
  onSelectMetric: PropTypes.func,
  showSources: PropTypes.bool,
  dateRange: PropTypes.object,
  countryCode: PropTypes.string,
  navMethodology: PropTypes.func,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // navigate to location
  navMethodology: () => {
    dispatch(
      navigate('page/methodology', {
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
