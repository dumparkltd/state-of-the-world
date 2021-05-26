/**
 *
 * PageParent
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { intlShape, injectIntl } from 'react-intl';

import { PAGES } from 'containers/App/constants';
import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey, getCloseTargetPage } from 'containers/App/selectors';

import Close from 'containers/Close';
import SectionFooter from 'components/SectionFooter';
import SectionCredits from 'components/SectionCredits';

import ContentWrap from 'styled/ContentWrap';
import SectionContainer from 'styled/SectionContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import rootMessages from 'messages';

import Content from './Content';
import ContentChild from './ContentChild';

export function PageParent({
  childDetails,
  pageId,
  onLoadContent,
  content,
  contentChild,
  closeTarget,
  intl,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(pageId);
  }, [pageId]);

  useEffect(() => {
    if (childDetails) {
      // kick off loading of first child content
      onLoadContent(childDetails.key);
    }
  }, [childDetails]);

  const pageTitle = intl.formatMessage(rootMessages.page[pageId]);
  const pageTitleMenu = intl.formatMessage(rootMessages.pageMenu[pageId]);
  const childTitle = intl.formatMessage(rootMessages.page[childDetails.key]);

  return (
    <ContentWrap>
      <Helmet>
        <title>{`${pageTitle} | ${childTitle}`}</title>
        <meta name="description" content="Description of Page" />
      </Helmet>
      <SectionContainer background="white" style={{ paddingTop: '0' }}>
        <ContentMaxWidth>
          <Close closeTarget={closeTarget} />
          <Content
            content={content}
            pageTitle={pageTitle}
            supTitle={pageTitleMenu}
          />
        </ContentMaxWidth>
      </SectionContainer>
      <ContentChild
        details={childDetails}
        content={contentChild}
        siblings={Object.values(PAGES).filter(
          p => p.parent === childDetails.parent,
        )}
      />
      {content && contentChild && <SectionCredits />}
      {content && contentChild && <SectionFooter />}
    </ContentWrap>
  );
}

PageParent.propTypes = {
  pageId: PropTypes.string,
  childDetails: PropTypes.object,
  // details: PropTypes.object,
  onLoadContent: PropTypes.func,
  closeTarget: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  contentChild: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: (state, { pageId }) => getContentByKey(state, pageId),
  contentChild: (state, { childDetails }) =>
    getContentByKey(state, childDetails.key),
  closeTarget: state => getCloseTargetPage(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: page => {
      dispatch(loadContentIfNeeded(page));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(PageParent));
