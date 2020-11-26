import { defineMessages } from 'react-intl';

export const scope = 'hrmi.containers.Settings';

export default defineMessages({
  intro: {
    id: `${scope}.intro`,
    defaultMessage: 'Switch view',
  },
  label: {
    id: `${scope}.label`,
    defaultMessage: 'Switch view',
  },
  labelWithName: {
    id: `${scope}.labelWithName`,
    defaultMessage: 'Switch view for {name}',
  },
  labelStandard: {
    id: `${scope}.labelStandard`,
    defaultMessage: 'labelStandard',
  },
  labelBenchmark: {
    id: `${scope}.labelBenchmark`,
    defaultMessage: 'labelBenchmark',
  },
});
