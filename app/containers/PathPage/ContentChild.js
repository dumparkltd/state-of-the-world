/**
 *
 * Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, ResponsiveContext } from 'grommet';

import { PATHS } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';

import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonNavTab from 'styled/ButtonNavTab';

import rootMessages from 'messages';
import { isMinSize, isMaxSize } from 'utils/responsive';

import Content from './Content';

// prettier-ignore
const Tabs = styled.div`
  @media print {
    display: none;
  }
`;

const Bar = styled.div`
  background: ${({ theme }) => theme.global.colors.world};
`;

const TabLinks = styled(p => <Box direction="row" justify="start" {...p} />)`
  overflow-x: auto;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-left: -10px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-left: 0px;
    height: 44px;
  }
`;

const StyledTab = styled(ButtonNavTab)`
  display: inline-block;
  white-space: nowrap;
`;

const TabLinksWrapper = styled.div`
  position: relative;
  &:after {
    content: '';
    box-shadow: inset -15px 0px 10px -10px
      ${({ theme }) => theme.global.colors['light-0']};
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20px;
    pointer-events: none;
  }
`;

const renderTabs = (siblings, details, onSelectPage) => (
  <TabLinks>
    {siblings.map(tab => (
      <StyledTab
        key={tab.key}
        active={tab.key === details.key}
        onClick={() => onSelectPage(tab.key)}
      >
        <FormattedMessage {...rootMessages.page[tab.key]} />
      </StyledTab>
    ))}
  </TabLinks>
);

export function ContentChild({ content, details, siblings, onSelectPage }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <ContentContainer direction="column" header>
          {siblings && siblings.length > 1 && (
            <Tabs justify="start">
              <Bar>
                {isMinSize(size, 'medium') && (
                  <ContentMaxWidth>
                    {renderTabs(siblings, details, onSelectPage)}
                  </ContentMaxWidth>
                )}
                {isMaxSize(size, 'ms') && (
                  <TabLinksWrapper>
                    {renderTabs(siblings, details, onSelectPage)}
                  </TabLinksWrapper>
                )}
              </Bar>
            </Tabs>
          )}
          <ContentMaxWidth>
            <Content content={content} isChild />
          </ContentMaxWidth>
        </ContentContainer>
      )}
    </ResponsiveContext.Consumer>
  );
}

ContentChild.propTypes = {
  details: PropTypes.object,
  siblings: PropTypes.array,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSelectPage: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onSelectPage: key => dispatch(navigate(`${PATHS.PAGE}/${key}`)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ContentChild);
