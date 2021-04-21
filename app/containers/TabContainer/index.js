import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box } from 'grommet';
import styled from 'styled-components';

import { getTabSearch } from 'containers/App/selectors';
import { setTab, setAsideLayer } from 'containers/App/actions';

import Aside from 'components/Aside';
import AsideBackground from 'components/AsideBackground';

import ContentMaxWidth from 'styled/ContentMaxWidth';
import ButtonNavTab from 'styled/ButtonNavTab';
import MainColumn from 'styled/MainColumn';

import { isMinSize, isMaxSize } from 'utils/responsive';
import isNumber from 'utils/is-number';

// const Tab = styled.div``;
// prettier-ignore
const Tabs = styled.div`
  @media print {
    display: none;
  }
`;
// const Spacer = styled.div`
//   background: 'transparent';
//   height: ${({ height }) => height}px;
// `;
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

function TabContainer({ tabs, tabKey, onTabClick, size }) {
  // prettier-ignore
  const hasAside = isMinSize(size, 'large');

  const mainTabs = hasAside ? tabs.filter(tab => !tab.aside) : tabs;
  const asideTab = hasAside && tabs.find(tab => tab.aside);

  let activeIndex = 0;
  if (isNumber(tabKey) && parseInt(tabKey, 10) < mainTabs.length) {
    activeIndex = parseInt(tabKey, 10);
  }
  if (mainTabs.map(t => t.key).indexOf(tabKey) >= 0) {
    activeIndex = mainTabs.map(t => t.key).indexOf(tabKey);
  }
  const activeTab = mainTabs[activeIndex];

  return (
    <Box direction="column" style={{ position: 'relative' }}>
      {mainTabs && mainTabs.length > 1 && (
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
                {mainTabs.map(tab => (
                  <ButtonNavTab
                    key={tab.key}
                    active={tab.key === activeTab.key}
                    onClick={() => onTabClick(tab.key)}
                  >
                    {isMaxSize(size, 'medium') && tab.titleMobile && (
                      <span>{tab.titleMobile}</span>
                    )}
                    {(!isMaxSize(size, 'medium') || !tab.titleMobile) && (
                      <span>{tab.title}</span>
                    )}
                  </ButtonNavTab>
                ))}
              </TabLinks>
            </ContentMaxWidth>
          </Bar>
        </Tabs>
      )}
      <Box direction="column" style={{ position: 'relative' }}>
        {asideTab && <AsideBackground />}
        <ContentMaxWidth column hasAside={!!asideTab}>
          <Box direction="row" fill="horizontal" justify="between">
            <MainColumn hasAside={!!asideTab}>
              {activeTab.content({
                activeTab: activeTab.key,
                goToTab: key => onTabClick(key),
                tabs: mainTabs,
              })}
            </MainColumn>
            {asideTab && (
              <Aside>
                {asideTab.content({
                  active: activeTab.key,
                })}
              </Aside>
            )}
          </Box>
        </ContentMaxWidth>
      </Box>
    </Box>
  );
}

TabContainer.propTypes = {
  tabs: PropTypes.array,
  onTabClick: PropTypes.func,
  size: PropTypes.string.isRequired,
  tabKey: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  tabKey: state => getTabSearch(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onTabClick: key => {
      dispatch(setAsideLayer(null));
      dispatch(setTab(key || '0'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TabContainer);
