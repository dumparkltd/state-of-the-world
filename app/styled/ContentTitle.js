import React from 'react';
import { Heading } from 'grommet';
import styled from 'styled-components';

// prettier-ignore
const Styled = styled(p => <Heading level={2} {...p} />)`
  font-weight: 600;
`;
export default props => <Styled margin={{ top: 'ms' }} {...props} />;
