/**
 *
 * Overview
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { getLocale } from 'containers/App/selectors';
import { loadDataIfNeeded, navigate } from 'containers/App/actions';
import { RIGHTS } from 'containers/App/constants';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

// import SectionIntro from 'components/Sections/SectionIntro';
import SectionFooter from 'components/SectionFooter';
import ChartContainerRegionMetricTrend from 'containers/ChartContainerRegionMetricTrend';

// styles
import ContentMaxWidth from 'styled/ContentMaxWidth';
import ContentWrap from 'styled/ContentWrap';

const DEPENDENCIES = ['countries', 'esrScores', 'cprScores'];

export function PathHome({ onLoadData, nav, locale }) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    // kick off loading of data
    onLoadData();
  }, []);
  const cpr = RIGHTS.filter(right => right.type === 'cpr');
  const esr = RIGHTS.filter(right => right.type === 'esr');
  // <SectionIntro />
  return (
    <ContentWrap>
      <ContentMaxWidth column>
        <h1>ESR - low & middle income standard</h1>
        {esr.map(right => (
          <ChartContainerRegionMetricTrend
            key={right.key}
            metricCode={right.key}
            standard="core"
            mode="home"
          />
        ))}
      </ContentMaxWidth>
      <ContentMaxWidth column>
        <h1>ESR - high income standard</h1>
        {esr.map(right => (
          <ChartContainerRegionMetricTrend
            key={right.key}
            metricCode={right.key}
            standard="hi"
            mode="home"
          />
        ))}
      </ContentMaxWidth>
      <ContentMaxWidth column>
        <h1>CPR</h1>
        {cpr.map(right => (
          <ChartContainerRegionMetricTrend
            key={right.key}
            metricCode={right.key}
            mode="home"
          />
        ))}
      </ContentMaxWidth>
      <SectionFooter locale={locale} nav={nav} />
    </ContentWrap>
  );
}

PathHome.propTypes = {
  nav: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: state => getLocale(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadData: () => {
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key)));
    },
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
