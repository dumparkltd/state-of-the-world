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
import arrest from 'images/metrics/arrest.png';
import assembly from 'images/metrics/assembly.png';
import deathPenalty from 'images/metrics/death-penalty.png';
import disappearance from 'images/metrics/disappearance.png';
import education from 'images/metrics/education.png';
import expression from 'images/metrics/expression.png';
import extrajudKilling from 'images/metrics/extrajud-killing.png';
import food from 'images/metrics/food.png';
import health from 'images/metrics/health.png';
import housing from 'images/metrics/housing.png';
import participation from 'images/metrics/participation.png';
import torture from 'images/metrics/torture.png';
import work from 'images/metrics/work.png';

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

export const CRITICAL_VALUE = {
  80: 1.282,
};

export const TREND_THRESHOLDS = {
  ESR: 0, // %
  CPR: 0.5, // 0-10 point scale
};

export const COLUMNS = {
  CPR: {
    MEAN: 'mean',
    LO: 'lobound_10',
    HI: 'upbound_90',
    SD: 'sd',
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
    YOUR_HRC: 'yourhrc_code',
    UN_REGION: 'un_regional_group',
    HRC_TERMS: 'HRC_terms',
    HRC_INVITATION: 'HRC_invitation',
    RSF: 'rsf_pfi',
    TI: 'ti_cpi',
    EIU: 'eiu_di',
    LAST_UPR: 'last_UPR',
    NEXT_UPR: 'next_UPR',
    TREATY_CAT: 'cat',
    TREATY_ICCPR: 'iccpr',
    TREATY_CED: 'ced',
    TREATY_CEDAW: 'cedaw',
    TREATY_CERD: 'cerd',
    TREATY_ICESCR: 'icescr',
    TREATY_CRC: 'crc',
    TREATY_CRPD: 'crpd',
    TREATY_OPCAT: 'opcat',
    HAS_NPM: 'has_npm',
    VISITS_PLANNED: 'visits_planned',
    VISITS_COMPLETED: 'visits_completed',
    STATUS: 'country_status',
    RELATED: 'related_country_code',
    HIGH_INCOME: 'high_income_country',
    REGION: 'region_code',
    SUBREGION: 'subregion_code',
    GROUPS: 'group_codes',
    GOV_RESPONDENTS: 'gov_respondents',
  },
  HRC_TERMS: {
    ID: 'term_id',
    START: 'term_start',
    END: 'term_end',
  },
};

export const TREATIES = [
  {
    column: 'TREATY_CAT',
    msg: 'cat',
  },
  {
    column: 'TREATY_CED',
    msg: 'ced',
  },
  {
    column: 'TREATY_CEDAW',
    msg: 'cedaw',
  },
  {
    column: 'TREATY_CERD',
    msg: 'cerd',
  },
  {
    column: 'TREATY_CRC',
    msg: 'crc',
  },
  {
    column: 'TREATY_CRPD',
    msg: 'crpd',
  },
  {
    column: 'TREATY_ICCPR',
    msg: 'iccpr',
  },
  {
    column: 'TREATY_ICESCR',
    msg: 'icescr',
  },
  {
    column: 'TREATY_OPCAT',
    msg: 'opcat',
  },
];

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

export const FAQS = {
  COUNTRY_SNAPSHOT: ['scale', 'year', 'standards'],
  ESR_RIGHT: ['measureRightESR', 'standards'],
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
    key: 'auxIndicators',
    file: 'auxiliary-indicators_v3-1.csv',
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
};

export const UN_REGIONS = {
  options: [
    {
      key: 'all',
    },
    {
      key: 'world',
      aggregate: true,
      default: true,
    },
    {
      key: 'AG',
    },
    {
      key: 'APG',
    },
    {
      key: 'EEG',
    },
    {
      key: 'GRULAC',
    },
    {
      key: 'WEOG',
    },
  ],
};

// column: 'high_income_country',
export const INCOME_GROUPS = {
  options: [
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
  ALL: ['unregion'],
  SINGLE_METRIC: ['unregion'],
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
];
export const METRIC_TYPES = ['rights'];

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

export const TYPES = [
  {
    key: 'esr',
    resource: 'esrScores',
  },
  {
    key: 'cpr',
    resource: 'cprScores',
  },
];

export const RIGHTS = [
  {
    key: 'education',
    code: 'Education',
    type: 'esr',
    resource: 'esrScores',
    icon: education,
  },
  {
    key: 'food',
    code: 'Food',
    type: 'esr',
    resource: 'esrScores',
    icon: food,
  },
  {
    key: 'health',
    code: 'Health',
    type: 'esr',
    resource: 'esrScores',
    icon: health,
  },
  {
    key: 'housing',
    code: 'Housing',
    type: 'esr',
    resource: 'esrScores',
    icon: housing,
  },
  {
    key: 'work',
    code: 'Work',
    type: 'esr',
    resource: 'esrScores',
    icon: work,
  },
  {
    key: 'arrest',
    code: 'arrest',
    type: 'cpr',
    resource: 'cprScores',
    icon: arrest,
  },
  {
    key: 'disappearance',
    code: 'disap',
    type: 'cpr',
    resource: 'cprScores',
    icon: disappearance,
  },
  {
    key: 'death-penalty',
    code: 'dpex',
    type: 'cpr',
    resource: 'cprScores',
    icon: deathPenalty,
  },
  {
    key: 'extrajud-killing',
    code: 'exkill',
    type: 'cpr',
    resource: 'cprScores',
    icon: extrajudKilling,
  },
  {
    key: 'torture',
    code: 'tort',
    type: 'cpr',
    resource: 'cprScores',
    icon: torture,
  },
  {
    key: 'assembly',
    code: 'assem',
    type: 'cpr',
    resource: 'cprScores',
    icon: assembly,
  },
  {
    key: 'expression',
    code: 'express',
    type: 'cpr',
    resource: 'cprScores',
    icon: expression,
  },
  {
    key: 'participation',
    code: 'polpart',
    type: 'cpr',
    resource: 'cprScores',
    icon: participation,
  },
];

export const COOKIECONSENT_NAME = 'state-of-the-world-cookie-consent-status';
export const GA_PROPERTY_ID = 'none';
