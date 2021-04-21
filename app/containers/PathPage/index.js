/**
 *
 * Page
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { PAGES } from 'containers/App/constants';

import Page from './Page';
import PageChild from './PageChild';
import PageParent from './PageParent';

export function PathPage({ match }) {
  const pageId = match && match.params.page;

  const pageDetails = PAGES[pageId];
  const isChild = pageDetails.parent && pageDetails.parent !== '';
  const isParent = Object.values(PAGES).some(p => p.parent === pageId);

  if (!pageId || !pageDetails) return null;
  if (isChild) return <PageChild details={pageDetails} />;
  if (isParent) {
    const child = Object.values(PAGES).find(p => p.parent === pageId);
    return <PageParent pageId={pageId} childDetails={child} />;
  }
  return <Page pageId={pageId} />;
}

PathPage.propTypes = {
  match: PropTypes.object,
};

export default PathPage;
