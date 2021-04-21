/**
 *
 * Page
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { intlShape, injectIntl } from 'react-intl';

import { loadContentIfNeeded } from 'containers/App/actions';
import { getContentByKey, getCloseTargetPage } from 'containers/App/selectors';

import Close from 'containers/Close';
import SectionFooter from 'components/SectionFooter';
import SectionCredits from 'components/SectionCredits';

import ContentWrap from 'styled/ContentWrap';
import ContentContainer from 'styled/ContentContainer';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import rootMessages from 'messages';

import Content from './Content';

export function Page({ pageId, onLoadContent, content, closeTarget, intl }) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(pageId);
  }, [pageId]);

  const pageTitle = intl.formatMessage(rootMessages.page[pageId]);

  return (
    <ContentWrap>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Description of Page" />
      </Helmet>
      <ContentContainer direction="column" header>
        <ContentMaxWidth>
          <Close closeTarget={closeTarget} />
          <Content content={content} pageTitle={pageTitle} />
        </ContentMaxWidth>
      </ContentContainer>
      {content && <SectionCredits />}
      {content && <SectionFooter />}
    </ContentWrap>
  );
}

Page.propTypes = {
  pageId: PropTypes.string,
  // details: PropTypes.object,
  onLoadContent: PropTypes.func,
  closeTarget: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: (state, { pageId }) => getContentByKey(state, pageId),
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

export default compose(withConnect)(injectIntl(Page));
