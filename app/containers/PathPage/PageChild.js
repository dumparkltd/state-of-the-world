/**
 *
 * PageChild
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

export function PageChild({
  details,
  onLoadContent,
  content,
  contentParent,
  closeTarget,
  intl,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(details.key);
  }, [details]);

  useEffect(() => {
    if (details) {
      // kick off loading of parent content
      onLoadContent(details.parent);
    }
  }, [details]);

  const pageTitle = intl.formatMessage(rootMessages.page[details.key]);
  const parentTitle = intl.formatMessage(rootMessages.page[details.parent]);
  const parentTitleMenu = intl.formatMessage(
    rootMessages.pageMenu[details.parent],
  );

  return (
    <ContentWrap>
      <Helmet>
        <title>{`${parentTitle} | ${pageTitle}`}</title>
        <meta name="description" content="Description of Page" />
      </Helmet>
      <SectionContainer background="white">
        <ContentMaxWidth>
          <Close closeTarget={closeTarget} />
          <Content
            content={contentParent}
            pageTitle={parentTitle}
            supTitle={parentTitleMenu}
            pageId={details.parent}
          />
        </ContentMaxWidth>
      </SectionContainer>
      <ContentChild
        details={details}
        content={content}
        siblings={Object.values(PAGES).filter(p => p.parent === details.parent)}
      />
      {content && contentParent && <SectionCredits />}
      {content && contentParent && <SectionFooter />}
    </ContentWrap>
  );
}

PageChild.propTypes = {
  details: PropTypes.object,
  // details: PropTypes.object,
  onLoadContent: PropTypes.func,
  closeTarget: PropTypes.object,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  contentParent: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: (state, { details }) => getContentByKey(state, details.key),
  contentParent: (state, { details }) => getContentByKey(state, details.parent),
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

export default compose(withConnect)(injectIntl(PageChild));
