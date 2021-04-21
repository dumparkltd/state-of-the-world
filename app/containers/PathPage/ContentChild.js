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
import { Box } from 'grommet';

import { PATHS } from 'containers/App/constants';
import { navigate } from 'containers/App/actions';

import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonNavTab from 'styled/ButtonNavTab';

import rootMessages from 'messages';

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

const TabLinks = styled(Box)`
  margin-left: -6px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-left: -10px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-left: 0px;
    height: 44px;
  }
`;

export function ContentChild({ content, details, siblings, onSelectPage }) {
  return (
    <ContentContainer direction="column" header>
      {siblings && siblings.length > 1 && (
        <Tabs justify="start">
          <Bar>
            <ContentMaxWidth>
              <TabLinks
                fill="horizontal"
                direction="row"
                flex
                align="center"
                wrap
              >
                {siblings.map(tab => (
                  <ButtonNavTab
                    key={tab.key}
                    active={tab.key === details.key}
                    onClick={() => onSelectPage(tab.key)}
                  >
                    <FormattedMessage {...rootMessages.page[tab.key]} />
                  </ButtonNavTab>
                ))}
              </TabLinks>
            </ContentMaxWidth>
          </Bar>
        </Tabs>
      )}
      <ContentMaxWidth>
        <Content content={content} isChild />
      </ContentMaxWidth>
    </ContentContainer>
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
