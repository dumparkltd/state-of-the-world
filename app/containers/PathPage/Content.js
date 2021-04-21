/**
 *
 * Content
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import HTMLWrapper from 'components/HTMLWrapper';
import LoadingIndicator from 'components/LoadingIndicator';
import PageTitle from 'styled/PageTitle';

const StyledContent = styled.div`
  width: 100%;
  margin-top: ${({ isChild }) => (isChild ? 10 : 30)}px;
  margin-bottom: ${({ isChild }) => (isChild ? 60 : 10)}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    margin-top: ${({ isChild }) => (isChild ? 10 : 40)}px;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    margin-top: ${({ isChild }) => (isChild ? 10 : 60)}px;
  }
`;

export function Content({ content, pageTitle, isChild }) {
  return (
    <StyledContent isChild={isChild}>
      {!isChild && (
        <PageTitle level={1} dark>
          {pageTitle}
        </PageTitle>
      )}
      {content && <HTMLWrapper innerhtml={content.content} fullPage />}
      {!content && <LoadingIndicator />}
    </StyledContent>
  );
}

Content.propTypes = {
  pageTitle: PropTypes.string,
  isChild: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default Content;
