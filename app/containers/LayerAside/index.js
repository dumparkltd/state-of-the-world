/**
 *
 * LayerAside
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled, { withTheme } from 'styled-components';
import { Layer, Box, ResponsiveContext } from 'grommet';
import { Close as CloseIcon } from 'grommet-icons';

import { getAsideLayer } from 'containers/App/selectors';
import { setAsideLayer } from 'containers/App/actions';
import AboutMetricContainer from 'containers/AboutMetricContainer';
import AboutCountryContainer from 'containers/AboutCountryContainer';

import ButtonIcon from 'styled/ButtonIcon';

import {
  isMaxSize,
  isMinSize,
  getWindowDimensions,
  getFloatingAsideWidth,
  getAsideWidth,
} from 'utils/responsive';

const ButtonWrap = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const Styled = styled(Box)`
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    padding-right: ${({ theme }) => theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    padding-right: ${({ theme }) => theme.global.edgeSize.xlarge};
  }
`;

export function LayerAside({ onClose, theme, layer }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!layer) return null;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Layer
          onEsc={() => onClose()}
          onClickOutside={() => onClose()}
          modal={isMaxSize(size, 'medium')}
          animation={isMinSize(size, 'large')}
          position="right"
          full={isMaxSize(size, 'medium') || 'vertical'}
        >
          <Box
            elevation="large"
            width={
              isMaxSize(size, 'medium')
                ? '100%'
                : `${getFloatingAsideWidth(size, theme, windowDimensions)}px`
            }
            direction="column"
            flex={{ shrink: 0 }}
            fill="vertical"
            overflow="auto"
            style={{ position: 'relative' }}
            responsive={false}
            background="white"
            pad={{ right: 'medium' }}
          >
            <ButtonWrap>
              <ButtonIcon onClick={onClose} subtle>
                <CloseIcon size="xlarge" color="dark-3" />
              </ButtonIcon>
            </ButtonWrap>
            <Styled
              width={getAsideWidth(size)}
              flex={{ shrink: 0 }}
              fill="vertical"
            >
              {layer.type === 'aboutMetric' && (
                <AboutMetricContainer
                  metricCode={layer.code}
                  countryCode={layer.countryCode}
                  showTitle
                  showMetricLink
                  showAboutMetric
                  countryScoreMsg={layer.countryScoreMsg}
                />
              )}
              {layer.type === 'aboutCountry' && (
                <AboutCountryContainer countryCode={layer.code} inAside />
              )}
            </Styled>
          </Box>
        </Layer>
      )}
    </ResponsiveContext.Consumer>
  );
}

LayerAside.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  theme: PropTypes.object,
  layer: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  layer: state => getAsideLayer(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClose: () => {
      dispatch(setAsideLayer(false));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withTheme(LayerAside));
