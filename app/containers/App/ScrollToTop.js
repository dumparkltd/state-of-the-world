import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { PAGES, PATHS } from 'containers/App/constants';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const nextSplitPath = this.props.location.pathname.split('/');
    const prevSplitPath = prevProps.location.pathname.split('/');

    // eg ['', 'en', 'route', 'param1', 'param2']
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (nextSplitPath.length < 4 || prevSplitPath.length < 4) {
        window.scrollTo(0, 0);
      } else if (nextSplitPath[2] !== prevSplitPath[2]) {
        window.scrollTo(0, 0);
      } else if (nextSplitPath[2] === PATHS.PAGE) {
        // do not scroll to top when selecting children oder switching to siblings
        const nextPage = PAGES[nextSplitPath[3]];
        const prevPage = PAGES[prevSplitPath[3]];

        if (
          !nextPage ||
          !prevPage ||
          nextPage.primary ||
          (nextPage.parent !== prevPage.key &&
            nextPage.parent !== prevPage.parent)
        ) {
          window.scrollTo(0, 0);
        }
      } else if (nextSplitPath[3] !== prevSplitPath[3]) {
        window.scrollTo(0, 0);
      }
    }
    // if (nextTab !== prevTab) {
    //   window.scrollTo(0, 0);
    // }
  }

  render() {
    return this.props.children;
  }
}
ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default withRouter(ScrollToTop);
