import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    word-break: normal;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #333;
    @media (min-width: ${({ theme }) => theme.breakpointsMin.ms}) {
      overflow-y: scroll;
    }
  }

  body.fontLoaded {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #F8F8F8;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5;
  }
  p {
    margin: 0.5em 0;
  }

  /* component /components/HTMLWrapper */
  .hrmi-html p {
    margin: 0.5em 0 1em 0;
    line-height: 1.44;
  }
  .hrmi-html-full-page p {
    &:first-child {
      margin: 2em 0;
    }
  }
  .hrmi-html-full-page.hrmi-html-page-about p {
    &:first-child {
      font-size: 1.1em;
      line-height: 1.3;
      @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
        font-size: 1.2em;
        line-height: 1.4;
      }
    }
  }
  .hrmi-html a {
    color: #0077B3;
    text-decoration: underline;
    &:hover {
      opacity: 0.8;
    }
  }
  .hrmi-html a.hero {
    color: #ffffff;
    background-color: #0077B3;
    padding: 5px 20px;
    margin: 20px 0;
    border-radius: 5px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    &:hover {
      opacity: 0.8;
      background-color: #0E6B9B;
    }
  }
  .hrmi-html h2 {
    font-size: 20px;
    margin-top: 2em;
    margin-bottom: 0.2em;
    @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
      font-size: 24px;
    }
  }
  .hrmi-html h3 {
    font-size: 18px;
    margin-top: 2em;
    margin-bottom: 0.2em;
    @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
      font-size: 20px;
    }
  }
  .hrmi-html h4 {
    font-size: 16px;
    margin-top: 1.5em;
    margin-bottom: 0.2em;
  }
  .hrmi-html hr {
    margin: 3em 0;
  }

  /* component /components/FormattedMarkdown */
  .hrmi-formatted-markdown p {
    line-height: 1.28;
  }

  .react-multi-carousel-list__custom {
    display: flex;
    align-items: center;
    position: relative;
    overflow: visible !important;
  }

  .rv-xy-plot__axis__title.sotw-chart-nodata-watermark text{
    font-size: 12px;
    font-weight: 600;
    fill: ${({ theme }) => theme.global.colors['dark-5']};
    fill-opacity: 0.8;
    dominant-baseline: middle;
    text-anchor: middle;
    text-shadow: 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff;
    @media (min-width: ${({ theme }) => theme.breakpointsMin.ms}) {
      font-size: 16px;
    }
    @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
      font-size: 24px;
    }
  }
  .rv-xy-plot__axis__title.sotw-chart-nodata-watermark-small text{
    font-size: 14px;
    transform: translateY(3px);
    font-weight: 700;
    fill: ${({ theme }) => theme.global.colors['dark-5']};
    fill-opacity: 0.8;
    dominant-baseline: hanging;
    text-anchor: middle;
    text-shadow: 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff, 0 0 3px #ffffff;
  }
`;

export default GlobalStyle;
