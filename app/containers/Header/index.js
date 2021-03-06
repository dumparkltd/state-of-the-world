/**
 *
 * Header
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled, { withTheme } from 'styled-components';
import { Box, Button, ResponsiveContext, Image, Layer } from 'grommet';
import { Menu, Close } from 'grommet-icons';

import logo from 'images/sotw-logo.png';

import { appLocales } from 'i18n';
import LocaleToggle from 'containers/LocaleToggle';
import {
  getRouterMatch,
  getRouterRoute,
  getLocale,
} from 'containers/App/selectors';
import { PAGES, PATHS } from 'containers/App/constants';

import {
  navigate,
  loadDataIfNeeded,
  setAsideLayer,
} from 'containers/App/actions';

import ButtonNavTop from 'styled/ButtonNavTop';
import ContentMaxWidth from 'styled/ContentMaxWidth';

import {
  getHeaderHeight,
  getHeaderHeightTop,
  getHeaderHeightBottom,
  isMinSize,
  isMaxSize,
} from 'utils/responsive';

import rootMessages from 'messages';

import NavBottom from './NavBottom';

const Styled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: ${({ theme }) => getHeaderHeight('small', theme)}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => getHeaderHeight('medium', theme)}px;
  }
`;

// prettier-ignore
const ContentMaxWidthHeader = styled(ContentMaxWidth)`
  padding: 0 ${({ theme }) => theme.global.edgeSize.xsmall};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.xlarge};
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.global.colors.brand};
  text-transform: uppercase;
  position: relative;
  display: inline;
  white-space: nowrap;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: 20px;
  }
`;
const Claim = styled.span`
  font-size: 11px;
  line-height: 13px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.global.colors.brand};
  white-space: nowrap;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
  }
`;

const Beta = styled.span`
  position: absolute;
  left: 100%;
  top: 0px;
  font-size: 10px;
  line-height: 10px;
  background-color: ${({ theme }) => theme.global.colors.secondary};
  color: ${({ theme }) => theme.global.colors.white};
  text-transform: none;
  padding: 1px 4px;
  border-radius: 3px;
  margin-left: 3px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding: 1px 5px;
    border-radius: 4px;
    margin-left: 4px;
    font-size: 12px;
    line-height: 12px;
  }
`;

const NavBarTop = props => (
  <Box
    direction="row"
    align="center"
    justify="end"
    height={`${getHeaderHeightTop(props.size, props.theme)}px`}
    {...props}
  />
);
NavBarTop.propTypes = {
  theme: PropTypes.object,
  size: PropTypes.string,
};

const NavBarBottomBox = styled(Box)`
  @media print {
    display: none;
  }
`;

const BrandButton = styled(Button)`
  height: ${({ theme }) => theme.sizes.header.small.heightTop}px;
  width: ${({ theme }) => theme.sizes.header.small.brandWidth}px;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => theme.sizes.header.height}px;
    width: ${({ theme }) => theme.sizes.header.brandWidth}px;
  }
`;
// color: ${({ theme }) => theme.global.colors.hover};
const BrandInner = styled(Box)`
  padding-top: ${({ theme }) => theme.sizes.header.small.padTop}px;
  padding-bottom: ${({ theme }) => theme.sizes.header.small.padBottom}px;
  padding-right: ${({ theme }) => theme.sizes.header.small.padRight}px;
  height: ${({ theme }) => theme.sizes.header.small.heightTop}px;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    height: ${({ theme }) => theme.sizes.header.height}px;
    padding-top: ${({ theme }) => theme.sizes.header.padTop}px;
    padding-bottom: ${({ theme }) => theme.sizes.header.padBottom}px;
    padding-right: ${({ theme }) => theme.sizes.header.padRight}px;
  }
`;

const LogoWrap = styled(Box)``;
const Logo = styled(Image)``;

const MenuList = styled(Box)`
  padding: ${({ theme }) => theme.global.edgeSize.small} 0;
  min-width: 280px;
`;

const MenuGroup = styled(Box)`
  vertical-align: top;
`;
// prettier-ignore
const ToggleMenu = styled(Button)`
  z-index: 300;
  width: 30px;
  height: 30px;
  background-color: transparent;
  text-align: center;
  @media print {
    display: none;
  }
`;

//
// const StyledShare = styled(p => <Share {...p} size="small" />)`
//   vertical-align: middle;
//   margin-left: 7px;
//   stroke: currentColor;
// `;

const TextWrap = styled.span`
  vertical-align: middle;
`;

const ElevationBox = styled(Box)`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const BrandBox = styled(Box)`
  @media print {
    width: 100%;
    justify-content: space-between;
  }
`;

const navButtonOnClick = ({ match, onClick, align }) =>
  PAGES &&
  Object.values(PAGES)
    .filter(page => page.primary)
    .map(page => {
      const children = Object.values(PAGES).filter(p => p.parent === page.key);
      const active =
        page.key === match || children.some(ch => ch.key === match);
      return (
        <ButtonNavTop
          key={page.key}
          active={active}
          align={align}
          onClick={() => onClick(page.key)}
        >
          <TextWrap>
            <FormattedMessage {...rootMessages.pageMenu[page.key]} />
          </TextWrap>
        </ButtonNavTop>
      );
    });

const DEPENDENCIES = ['countries'];

export function Header({
  nav,
  onLoadData,
  match,
  path,
  theme,
  intl,
  onHideAsideLayer,
  locale,
}) {
  useEffect(() => {
    // kick off loading of page content
    onLoadData();
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const onHome = () => {
    setShowMenu(false);
    nav('');
  };

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled role="banner" size={size}>
          <ElevationBox background="white">
            <ContentMaxWidthHeader column={isMaxSize(size, 'ms')}>
              <BrandBox
                direction="row"
                align="center"
                justify="stretch"
                fill={isMaxSize(size, 'ms') ? 'horizontal' : false}
              >
                <BrandButton plain onClick={onHome}>
                  <BrandInner
                    direction="row"
                    justify="start"
                    gap="10px"
                    fill={false}
                    align="center"
                  >
                    <LogoWrap
                      width={`${
                        isMaxSize(size, 'ms')
                          ? theme.sizes.header.small.logoWidth
                          : theme.sizes.header.logoWidth
                      }px`}
                      flex={{ shrink: 0 }}
                    >
                      <Logo
                        src={logo}
                        alt={`${intl.formatMessage(rootMessages.app.title)}`}
                        a11yTitle={`${intl.formatMessage(
                          rootMessages.app.title,
                        )}`}
                        fit="contain"
                      />
                    </LogoWrap>
                    <Box align="start">
                      <Title>
                        <FormattedMessage {...rootMessages.app.title} />
                        <Beta>beta</Beta>
                      </Title>
                      <Claim>
                        <FormattedMessage {...rootMessages.app.claim} />
                      </Claim>
                    </Box>
                  </BrandInner>
                </BrandButton>
                {isMaxSize(size, 'ms') && (
                  <Box margin={{ left: 'auto' }} direction="row" align="center">
                    {appLocales.length > 1 && (
                      <Box>
                        <LocaleToggle />
                      </Box>
                    )}
                    <ToggleMenu
                      plain
                      onClick={() => setShowMenu(!showMenu)}
                      ref={menuRef}
                    >
                      {!showMenu && <Menu color="dark-3" />}
                      {showMenu && <Close color="dark-3" />}
                    </ToggleMenu>
                  </Box>
                )}
                {showMenu && isMaxSize(size, 'medium') && (
                  <Layer
                    full={isMaxSize(size, 'ms') ? 'horizontal' : false}
                    margin={{ top: '50px' }}
                    onClickOutside={() => setShowMenu(false)}
                    responsive={false}
                    position={isMaxSize(size, 'ms') ? 'top' : 'top-right'}
                    modal={false}
                    animate={false}
                  >
                    <MenuList elevation="large">
                      <MenuGroup>
                        {navButtonOnClick({
                          match,
                          onClick: key => {
                            setShowMenu(false);
                            nav(`${PATHS.PAGE}/${key}`);
                          },
                          align: 'left',
                          locale,
                        })}
                      </MenuGroup>
                    </MenuList>
                  </Layer>
                )}
              </BrandBox>
              <Box fill>
                {isMinSize(size, 'medium') && (
                  <NavBarTop
                    theme={theme}
                    direction="row"
                    justify="end"
                    size={size}
                    align="center"
                  >
                    {navButtonOnClick({
                      match,
                      onClick: key => {
                        nav(`${PATHS.PAGE}/${key}`);
                      },
                      locale,
                    })}
                    {appLocales.length > 1 && isMinSize(size, 'medium') && (
                      <LocaleToggle />
                    )}
                  </NavBarTop>
                )}
                <NavBarBottomBox
                  direction="row"
                  align="end"
                  justify={isMinSize(size, 'medium') ? 'end' : 'evenly'}
                  height={`${getHeaderHeightBottom(size, theme)}px`}
                  theme={theme}
                  size={size}
                  activeCode={match}
                >
                  <NavBottom
                    type="metrics"
                    active={path === PATHS.METRICS || path === PATHS.METRIC}
                    activeCode={path === PATHS.METRIC ? match : ''}
                    onClick={() => {
                      onHideAsideLayer();
                    }}
                  />
                  <NavBottom
                    type="countries"
                    active={path === PATHS.COUNTRIES || path === PATHS.COUNTRY}
                    activeCode={path === PATHS.COUNTRY ? match : ''}
                    onClick={() => {
                      onHideAsideLayer();
                    }}
                  />
                </NavBarBottomBox>
              </Box>
            </ContentMaxWidthHeader>
          </ElevationBox>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

Header.propTypes = {
  /** Navigation action */
  nav: PropTypes.func.isRequired,
  onHideAsideLayer: PropTypes.func.isRequired,
  match: PropTypes.string,
  path: PropTypes.string,
  locale: PropTypes.string,
  onLoadData: PropTypes.func.isRequired,
  theme: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
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
          action: 'Header: navigate',
          value: typeof location === 'object' ? location.pathname : location,
        },
      }),
    );
  },
  onHideAsideLayer: () => {
    dispatch(setAsideLayer(false));
  },
});

const mapStateToProps = createStructuredSelector({
  match: state => getRouterMatch(state),
  path: state => getRouterRoute(state),
  locale: state => getLocale(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(injectIntl(Header)));
