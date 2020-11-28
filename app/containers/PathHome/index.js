/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
// import { useInjectSaga } from 'utils/injectSaga';
// import saga from 'containers/App/saga';

import { getLocale } from 'containers/App/selectors';
import { navigate } from 'containers/App/actions';

// import SectionIntro from 'components/Sections/SectionIntro';
import SectionFooter from 'components/SectionFooter';
import ChartContainerRightsMulti from 'containers/ChartContainerRightsMulti';

// styles
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentWrap from 'styled/ContentWrap';

import rootMessages from 'messages';

// const DEPENDENCIES = ['countries'];

export function PathHome({ nav, locale }) {
  // useInjectSaga({ key: 'app', saga });
  // useEffect(() => {
  //   // kick off loading of data
  //   onLoadData();
  // }, []);

  // <SectionIntro />
  return (
    <ContentWrap>
      <ContentMaxWidth column>
        <h1>
          <FormattedMessage {...rootMessages['rights-types'].esr} />
        </h1>
        <ChartContainerRightsMulti type="esr" />
      </ContentMaxWidth>
      <ContentMaxWidth column>
        <h1>
          <FormattedMessage {...rootMessages['rights-types'].cpr} />
        </h1>
        <ChartContainerRightsMulti type="cpr" />
      </ContentMaxWidth>
      <SectionFooter locale={locale} nav={nav} />
    </ContentWrap>
  );
}

PathHome.propTypes = {
  nav: PropTypes.func.isRequired,
  // onLoadData: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: state => getLocale(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    // onLoadData: () => {
    //   DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    // },
    // navigate to location
    nav: location => {
      dispatch(
        navigate(location, {
          keepTab: true,
          trackEvent: {
            category: 'Content',
            action: 'Home: navigate',
            value: typeof location === 'object' ? location.pathname : location,
          },
        }),
      );
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PathHome);
