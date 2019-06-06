import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import HowToRead from 'containers/HowToRead';

import { lowerCase } from 'utils/string';
import { isMinSize } from 'utils/responsive';
import rootMessages from 'messages';
import Accordion from './Accordion';
import DimensionPanel from './DimensionPanel';
import DimensionPanelTop from './DimensionPanelTop';
import RightPanel from './RightPanel';
import RightPanelTop from './RightPanelTop';
import IndicatorPanel from './IndicatorPanel';

const Styled = styled(Box)``;

function ESRAccordion({
  dimension,
  rights,
  indicators,
  benchmark,
  onMetricClick,
  standard,
  hasAtRisk,
  intl,
}) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled margin={{ bottom: 'medium' }}>
          <Box alignSelf="end">
            <HowToRead
              chart="Bar"
              contxt="narrative"
              data={benchmark.key}
              htr={`bullet-${dimension.key}`}
            />
          </Box>
          <Box elevation="small" margin={{ top: 'xsmall' }}>
            <Accordion
              buttonText={`${rights.length} rights`}
              level={1}
              top={
                <DimensionPanelTop
                  dimension={dimension}
                  onMetricClick={onMetricClick}
                  standard={standard}
                  benchmark={benchmark}
                  hasAtRisk={hasAtRisk}
                />
              }
              head={
                <DimensionPanel
                  dimension={dimension}
                  onMetricClick={onMetricClick}
                  standard={standard}
                  benchmark={benchmark}
                  hasAtRisk={hasAtRisk}
                />
              }
              content={
                <div>
                  {rights &&
                    rights.map(right => {
                      const rightIndicators = indicators.filter(
                        indicator => indicator.right === right.key,
                      );
                      return (
                        <Box border="top" key={right.key}>
                          <Accordion
                            buttonText={`${rightIndicators.length} ${lowerCase(
                              intl.formatMessage(
                                rootMessages.metricTypes.indicators,
                              ),
                            )}`}
                            level={2}
                            top={
                              <RightPanelTop
                                right={right}
                                benchmark={benchmark}
                                onMetricClick={onMetricClick}
                                standard={standard}
                                hasAtRisk={hasAtRisk}
                              />
                            }
                            head={
                              <RightPanel
                                right={right}
                                benchmark={benchmark}
                                onMetricClick={onMetricClick}
                                standard={standard}
                                hasAtRisk={hasAtRisk}
                              />
                            }
                            content={
                              <div>
                                {rightIndicators.map(indicator => (
                                  <Box
                                    border="top"
                                    direction="row"
                                    key={indicator.key}
                                  >
                                    <IndicatorPanel
                                      indicator={indicator}
                                      benchmark={benchmark}
                                      onMetricClick={onMetricClick}
                                      standard={standard}
                                    />
                                    <Box
                                      width={
                                        isMinSize(size, 'medium')
                                          ? '200px'
                                          : '50px'
                                      }
                                      flex={{ shrink: 0 }}
                                    />
                                  </Box>
                                ))}
                              </div>
                            }
                          />
                        </Box>
                      );
                    })}
                </div>
              }
            />
          </Box>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

ESRAccordion.propTypes = {
  onMetricClick: PropTypes.func,
  standard: PropTypes.string,
  dimension: PropTypes.object,
  rights: PropTypes.array,
  indicators: PropTypes.array,
  benchmark: PropTypes.object,
  hasAtRisk: PropTypes.bool,
  intl: intlShape.isRequired,
};

export default injectIntl(ESRAccordion);
