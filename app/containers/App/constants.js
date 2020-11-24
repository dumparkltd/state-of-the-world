/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
import arrest from 'images/metrics/arrest.svg';
import assembly from 'images/metrics/assembly.svg';
import deathPenalty from 'images/metrics/death-penalty.svg';
import disappearance from 'images/metrics/disappearance.svg';
import education from 'images/metrics/education.svg';
import expression from 'images/metrics/expression.svg';
import extrajudKilling from 'images/metrics/extrajud-killing.svg';
import food from 'images/metrics/food.svg';
import health from 'images/metrics/health.svg';
import housing from 'images/metrics/housing.svg';
import participation from 'images/metrics/participation.svg';
import torture from 'images/metrics/torture.svg';
import work from 'images/metrics/work.svg';

export const CHECK_COOKIECONSENT = 'hrmi/App/CHECK_COOKIECONSENT';
export const COOKIECONSENT_CHECKED = 'hrmi/App/COOKIECONSENT_CHECKED';
export const SET_COOKIECONSENT = 'hrmi/App/SET_COOKIECONSENT';
export const GA_INITIALISED = 'hrmi/App/GA_INITIALISED';
export const TRACK_EVENT = 'hrmi/App/TRACK_EVENT';
// loading actions
export const LOAD_DATA_IF_NEEDED = 'hrmi/App/LOAD_DATA_IF_NEEDED';
export const LOAD_DATA_SUCCESS = 'hrmi/App/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'hrmi/App/LOAD_DATA_ERROR';
export const DATA_REQUESTED = 'hrmi/App/DATA_REQUESTED';
export const DATA_READY = 'hrmi/App/DATA_READY';
export const LOAD_CONTENT_IF_NEEDED = 'hrmi/App/LOAD_CONTENT_IF_NEEDED';
export const LOAD_CONTENT_SUCCESS = 'hrmi/App/LOAD_CONTENT_SUCCESS';
export const LOAD_CONTENT_ERROR = 'hrmi/App/LOAD_CONTENT_ERROR';
export const CONTENT_REQUESTED = 'hrmi/App/CONTENT_REQUESTED';
export const CONTENT_READY = 'hrmi/App/CONTENT_READY';

// navigation actions
export const SELECT_COUNTRY = 'hrmi/App/SELECT_COUNTRY';
export const SELECT_METRIC = 'hrmi/App/SELECT_METRIC';
export const NAVIGATE = 'hrmi/App/NAVIGATE';
export const SET_STANDARD = 'hrmi/App/SET_STANDARD';
export const SET_TAB = 'hrmi/App/SET_TAB';

// state actions
export const ASIDE_LAYER = 'hrmi/App/ASIDE_LAYER';
export const HIGHLIGHT_COUNTRY = 'hrmi/App/HIGHLIGHT_COUNTRY';
export const SHOW_WELCOME = 'hrmi/App/SHOW_WELCOME';

export const COLUMNS = {
  CPR: {
    MEAN: 'mean',
    LO: 'lobound_10',
    HI: 'upbound_90',
    METRIC: 'metric_code',
  },
  ESR: {
    SCORE_ADJUSTED: 'score_wrt_immediate_duty',
    SCORE_BEST: 'score_wrt_global_best',
    SCORE_DUTY_BEST: 'average_immediate_duty_wrt_global_best',
    INDICATOR_SCORE_DUTY_BEST: 'immediate_duty_wrt_global_best',
    PENALTY: 'penalty',
    RAW: 'value',
    GROUP: 'group',
    STANDARD: 'standard',
    COUNTRY: 'country_code',
    METRIC: 'metric_code',
    RAW_REF: 'immediate_duty',
    RAW_REF_MIN: 'natural_minimum',
    RAW_REF_BEST: 'global_best_all',
    RAW_REF_BEST_MALE: 'global_best_male',
    RAW_REF_BEST_FEMALE: 'global_best_female',
  },
  AUX: {
    POPULATION: 'population',
    GDP_2011_PPP: 'gdp_per_capita_2011ppp',
    GDP_CURRENT_PPP: 'gdp_per_capita_current_ppp',
    GDP_CURRENT_US: 'gdp_per_capita_current_usd',
  },
  COUNTRIES: {
    CODE: 'country_code',
    HIGH_INCOME: 'high_income_country',
    UN_REGION: 'un_regional_group',
    REGION: 'region_code',
    SUBREGION: 'subregion_code',
    GROUPS: 'group_codes',
    TREATIES: 'treaty_codes',
    STATUS: 'country_status',
    RELATED: 'related_country_code',
    GOV_RESPONDENTS: 'gov_respondents',
    HRC_TERMS: 'HRC_terms',
    HRC_INVITATION: 'HRC_invitation',
    LAST_UPR: 'last_UPR',
    TREATIS_RAT: 'treaties_ratified',
  },
};

export const LANGUAGES = {
  short: {
    en: 'EN',
    es: 'ES',
    pt: 'PT',
    fr: 'FR',
  },
  long: {
    en: 'English',
    es: 'Español',
    pt: 'Português',
    fr: 'Français',
  },
};

// URLs for external resources loaded on request
export const DATA_URL = '//app.dumpark.com/state-of-the-world-data/data';
export const PAGES_URL = '//app.dumpark.com/state-of-the-world-content/v3_1/';

export const PAGES = {
  about: {
    key: 'about',
    primary: true,
  },
  methodology: {
    key: 'methodology',
    primary: true,
  },
};

export const PATHS = {
  HOME: '',
  METRIC: 'metric',
  COUNTRY: 'country',
  PAGE: 'page',
};
export const IMAGE_PATH =
  '//app.dumpark.com/state-of-the-world-content/assets/uploads';

export const XPATHS = {
  home: {
    en: '//www.universal-rights.org',
    fr: '//www.universal-rights.org',
    es: '//www.universal-rights.org',
    pt: '//www.universal-rights.org',
  },
};

export const FAQS = {
  COUNTRY_SNAPSHOT: ['scale', 'year', 'benchmarks', 'standards', 'grades'],
  COUNTRY_ESR: ['benchmarks', 'standards', 'grades'],
  COUNTRY_CPR: ['grades', 'uncertainty'],
  ESR_DIMENSION: ['measureDimensionESR', 'benchmarks', 'standards'],
  ESR_RIGHT: ['measureRightESR', 'benchmarks', 'standards'],
  CPR_DIMENSION: ['measureDimensionCPR', 'uncertainty'],
  CPR_RIGHT: ['measureRightCPR', 'uncertainty'],
};

// countries: country lookup table
// esrIndicators: ESR indicator lookup table
// atRisk: CPR survey people at risk data
// auxIndicators: auciliary indicators
// cprScores: CPR survey intensity data
// esrScores: ESR aggregate scores
// esrIndicatorScores: ESR indicator scores
// esrIndicatorsRaw: ESR indicator raw data
export const DATA_RESOURCES = [
  {
    key: 'countries',
    file: 'countries_v3-1-sotw.csv',
  },
  {
    key: 'countriesGrammar',
    file: 'countries_grammar_v3.csv',
  },
  {
    key: 'esrIndicators',
    file: 'esr-indicators_v3-1.csv',
  },
  {
    key: 'auxIndicators',
    file: 'auxiliary-indicators_v3-1-sotw.csv',
  },
  {
    key: 'cprScores',
    file: 'cpr-scores_v3-1.csv',
  },
  {
    key: 'esrScores',
    file: 'esr-scores_v3-1.csv',
  },
  {
    key: 'esrIndicatorScores',
    file: 'esr-indicator-scores_v3-1.csv',
  },
  {
    key: 'sources',
    file: 'sources_v3-1.csv',
  },
  {
    key: 'hrcTerms',
    file: 'hrc_terms.csv',
  },
];

export const COUNTRY_SORTS = {
  name: {
    order: 'asc',
  },
  score: {
    order: 'desc',
  },
  assessment: {
    order: 'desc',
    data: 'scores',
  },
  gdp: {
    order: 'desc',
    data: 'aux',
    column: COLUMNS.AUX.GDP_2011_PPP,
  },
  population: {
    order: 'desc',
    data: 'aux',
    column: COLUMNS.AUX.POPULATION,
  },
};

export const UN_REGIONS = {
  values: ['AG', 'APG', 'EEG', 'GRULAC', 'WEOG'],
};
// export const REGIONS = {
//   values: [
//     'americas',
//     'middle-east-north-africa',
//     'sub-saharan-africa',
//     'europe-central-asia',
//     'south-asia',
//     'east-asia-pacific',
//   ],
// };
// export const SUBREGIONS = {
//   values: [
//     'middle-east',
//     'north-africa',
//     'europe',
//     'central-asia',
//     'east-asia',
//     'pacific',
//   ],
// };

// column: 'high_income_country',
export const INCOME_GROUPS = {
  values: [
    {
      key: 'hi',
      value: '1',
      standard: 'hi',
    },
    {
      key: 'lmi',
      value: '0',
      standard: 'core',
    },
  ],
};

export const COUNTRY_FILTERS = {
  ALL: ['income', 'unregion'],
  SINGLE_METRIC: ['income', 'unregion'],
};

export const STANDARDS = [
  {
    key: 'core',
    code: 'Core',
    hiValue: '0',
  },
  {
    key: 'hi',
    code: 'HiY',
    hiValue: '1',
  },
];

export const BENCHMARKS = [
  {
    key: 'best',
    column: COLUMNS.ESR.SCORE_BEST,
    refColumn: COLUMNS.ESR.SCORE_DUTY_BEST,
    refIndicatorColumn: COLUMNS.ESR.INDICATOR_SCORE_DUTY_BEST,
  },
];

export const PEOPLE_GROUPS = [
  {
    key: 'all',
    code: 'All',
    color: 'allPeople',
  },
  {
    key: 'female',
    code: 'Female',
    breakdown: 'sex',
    color: 'female',
  },
  {
    key: 'male',
    code: 'Male',
    breakdown: 'sex',
    color: 'male',
  },
];
export const METRIC_TYPES = ['rights'];

export const RIGHTS_TYPES = ['esr', 'cpr'];

// d: dimensions, r: rights
export const SCALES = [
  {
    key: 'r',
    type: 'rights',
  },
];

export const GRADES = {
  esr: [
    {
      class: 'poor',
      min: 0,
    },
    {
      class: 'bad',
      min: 75,
    },
    {
      class: 'fair',
      min: 85,
    },
    {
      class: 'good',
      min: 95,
    },
  ],
  cpr: [
    {
      class: 'poor',
      min: 0,
    },
    {
      class: 'bad',
      min: 35,
    },
    {
      class: 'fair',
      min: 60,
    },
    {
      class: 'good',
      min: 80,
    },
  ],
};

export const DIMENSIONS = [
  {
    key: 'esr',
    code: 'SER_Average',
    type: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'physint',
    code: 'physint',
    type: 'cpr',
    resource: 'cprScores',
  },
  {
    key: 'empowerment',
    code: 'empower',
    type: 'cpr',
    resource: 'cprScores',
  },
];

export const RIGHTS = [
  {
    key: 'education',
    code: 'Education',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: education,
  },
  {
    key: 'food',
    code: 'Food',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: food,
  },
  {
    key: 'health',
    code: 'Health',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: health,
  },
  {
    key: 'housing',
    code: 'Housing',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: housing,
  },
  {
    key: 'work',
    code: 'Work',
    dimension: 'esr',
    type: 'esr',
    resource: 'esrScores',
    icon: work,
  },
  {
    key: 'arrest',
    code: 'arrest',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: arrest,
  },
  {
    key: 'disappearance',
    code: 'disap',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: disappearance,
  },
  {
    key: 'death-penalty',
    code: 'dpex',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: deathPenalty,
  },
  {
    key: 'extrajud-killing',
    code: 'exkill',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: extrajudKilling,
  },
  {
    key: 'torture',
    code: 'tort',
    dimension: 'physint',
    type: 'cpr',
    resource: 'cprScores',
    icon: torture,
  },
  {
    key: 'assembly',
    code: 'assem',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
    icon: assembly,
  },
  {
    key: 'expression',
    code: 'express',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
    icon: expression,
  },
  {
    key: 'participation',
    code: 'polpart',
    dimension: 'empowerment',
    type: 'cpr',
    resource: 'cprScores',
    icon: participation,
  },
];

export const COOKIECONSENT_NAME = 'state-of-the-world-cookie-consent-status';
export const GA_PROPERTY_ID = 'none';
