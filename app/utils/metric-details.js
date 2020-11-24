import { RIGHTS } from 'containers/App/constants';

export default function(code) {
  const right = RIGHTS.find(m => m.key === code);
  if (right) {
    return {
      metricType: 'rights',
      metricTypeSingle: 'right',
      color: right.dimension,
      ...right,
    };
  }
  return false;
}
