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
import education from 'images/metrics/education.png';
import educationInv from 'images/metrics/education_invert.png';
import food from 'images/metrics/food.png';
import foodInv from 'images/metrics/food_invert.png';
import health from 'images/metrics/health.png';
import healthInv from 'images/metrics/health_invert.png';
import housing from 'images/metrics/housing.png';
import housingInv from 'images/metrics/housing_invert.png';
import work from 'images/metrics/work.png';
import workInv from 'images/metrics/work_invert.png';
import arrest from 'images/metrics/arrest.png';
import arrestInv from 'images/metrics/arrest_invert.png';
import assembly from 'images/metrics/assembly.png';
import assemblyInv from 'images/metrics/assembly_invert.png';
import disappearance from 'images/metrics/disappearance.png';
import disappearanceInv from 'images/metrics/disappearance_invert.png';
import extrajudKilling from 'images/metrics/extrajud-killing.png';
import extrajudKillingInv from 'images/metrics/extrajud-killing_invert.png';
import participation from 'images/metrics/participation.png';
import deathPenalty from 'images/metrics/death-penalty.png';
import deathPenaltyInv from 'images/metrics/death-penalty_invert.png';
import expression from 'images/metrics/expression.png';
import expressionInv from 'images/metrics/expression_invert.png';
import participationInv from 'images/metrics/participation_invert.png';
import torture from 'images/metrics/torture.png';
import tortureInv from 'images/metrics/torture_invert.png';
import edi from 'images/metrics/edi.png';
import ediInv from 'images/metrics/edi_invert.png';
import ldi from 'images/metrics/ldi.png';
import ldiInv from 'images/metrics/ldi_invert.png';
import ddi from 'images/metrics/ddi.png';
import ddiInv from 'images/metrics/ddi_invert.png';
import pdi from 'images/metrics/pdi.png';
import pdiInv from 'images/metrics/pdi_invert.png';
import egdi from 'images/metrics/egdi.png';
import egdiInv from 'images/metrics/egdi_invert.png';

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
export const ADD_NOTE = 'hrmi/App/ADD_NOTE';
export const REMOVE_NOTE = 'hrmi/App/REMOVE_NOTE';
export const CLEAR_NOTES = 'hrmi/App/CLEAR_NOTES';

export const CRITICAL_VALUE = {
  68: 1,
  80: 1.282,
};

export const TREND_THRESHOLDS = {
  ESR: 0, // %
  CPR: 0.5, // 0-10 point scale
  VDEM: 0.05, // 0-1 point scale
};

export const COLUMNS = {
  VDEM: {
    MEAN: 'mean',
    LO: 'low',
    HI: 'high',
    SD: 'sd',
    METRIC: 'metric_code',
  },
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
    VDEM_CLASS: 'vdem-class',
    EIU_CLASS: 'eiu-class',
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
export const PAGES_URL = '//app.dumpark.com/state-of-the-world-content/';

export const PAGES = {
  about: {
    key: 'about',
    primary: true,
  },
  methodology: {
    key: 'methodology',
    primary: true,
  },
  'methodology-esr': {
    key: 'methodology-esr',
    primary: false,
    parent: 'methodology',
  },
  'methodology-cpr': {
    key: 'methodology-cpr',
    primary: false,
    parent: 'methodology',
  },
  'methodology-vdem': {
    key: 'methodology-vdem',
    primary: false,
    parent: 'methodology',
  },
  'methodology-other': {
    key: 'methodology-other',
    primary: false,
    parent: 'methodology',
  },
  privacy: {
    key: 'privacy',
    primary: false,
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
  ESR_REGIONS: ['measureRightESR', 'standards'],
  CPR_REGIONS: ['measureRightCPR'],
  VDEM_REGIONS: ['measureVDEM'],
  ESR_RIGHT: ['measureRightESR', 'standards'],
  CPR_RIGHT: ['measureRightCPR'],
  VDEM_RIGHT: ['measureVDEM'],
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
    file: 'countries.csv',
  },
  {
    key: 'countriesGrammar',
    file: 'countries_grammar_v3-sotw.csv',
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
    key: 'vdemScores',
    file: 'vdem-scores-v11-1.csv',
    // file: 'vdem-scores-v11-1_ci.csv',
  },
  {
    key: 'esrIndicators',
    file: 'esr-indicators_v3-1.csv',
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
      max: 75,
    },
    {
      class: 'bad',
      min: 75,
      max: 85,
    },
    {
      class: 'fair',
      min: 85,
      max: 95,
    },
    {
      class: 'good',
      min: 95,
      max: 100,
    },
  ],
  cpr: [
    {
      class: 'poor',
      min: 0,
      max: 3.5,
    },
    {
      class: 'bad',
      min: 3.5,
      max: 6,
    },
    {
      class: 'fair',
      min: 6,
      max: 8,
    },
    {
      class: 'good',
      min: 8,
      max: 10,
    },
  ],
};

export const TYPES = {
  esr: {
    key: 'esr',
    resource: 'esrScores',
    max: 100,
    digits: 0,
    isPerc: true,
    uncertainty: false,
  },
  cpr: {
    key: 'cpr',
    resource: 'cprScores',
    max: 10,
    maxX: 11.4,
    minX: -0.4,
    digits: 1,
    isPerc: false,
    uncertainty: true,
  },
  vdem: {
    key: 'vdem',
    resource: 'vdemScores',
    max: 1,
    digits: 2,
    isPerc: false,
    uncertainty: true,
  },
};

export const RIGHTS = [
  {
    key: 'education',
    code: 'Education',
    type: 'esr',
    resource: 'esrScores',
    icon: education,
    iconInv: educationInv,
  },
  {
    key: 'food',
    code: 'Food',
    type: 'esr',
    resource: 'esrScores',
    icon: food,
    iconInv: foodInv,
  },
  {
    key: 'health',
    code: 'Health',
    type: 'esr',
    resource: 'esrScores',
    icon: health,
    iconInv: healthInv,
  },
  {
    key: 'housing',
    code: 'Housing',
    type: 'esr',
    resource: 'esrScores',
    icon: housing,
    iconInv: housingInv,
  },
  {
    key: 'work',
    code: 'Work',
    type: 'esr',
    resource: 'esrScores',
    icon: work,
    iconInv: workInv,
  },
  {
    key: 'arrest',
    code: 'arrest',
    type: 'cpr',
    resource: 'cprScores',
    icon: arrest,
    iconInv: arrestInv,
  },
  {
    key: 'disappearance',
    code: 'disap',
    type: 'cpr',
    resource: 'cprScores',
    icon: disappearance,
    iconInv: disappearanceInv,
  },
  {
    key: 'death-penalty',
    code: 'dpex',
    type: 'cpr',
    resource: 'cprScores',
    icon: deathPenalty,
    iconInv: deathPenaltyInv,
  },
  {
    key: 'extrajud-killing',
    code: 'exkill',
    type: 'cpr',
    resource: 'cprScores',
    icon: extrajudKilling,
    iconInv: extrajudKillingInv,
  },
  {
    key: 'torture',
    code: 'tort',
    type: 'cpr',
    resource: 'cprScores',
    icon: torture,
    iconInv: tortureInv,
  },
  {
    key: 'assembly',
    code: 'assem',
    type: 'cpr',
    resource: 'cprScores',
    icon: assembly,
    iconInv: assemblyInv,
  },
  {
    key: 'expression',
    code: 'express',
    type: 'cpr',
    resource: 'cprScores',
    icon: expression,
    iconInv: expressionInv,
  },
  {
    key: 'participation',
    code: 'polpart',
    type: 'cpr',
    resource: 'cprScores',
    icon: participation,
    iconInv: participationInv,
  },
  {
    key: 'edi',
    code: 'edi',
    type: 'vdem',
    resource: 'vdemScores',
    icon: edi,
    iconInv: ediInv,
  },
  {
    key: 'ldi',
    code: 'ldi',
    type: 'vdem',
    resource: 'vdemScores',
    icon: ldi,
    iconInv: ldiInv,
  },
  {
    key: 'ddi',
    code: 'ddi',
    type: 'vdem',
    resource: 'vdemScores',
    icon: ddi,
    iconInv: ddiInv,
  },
  {
    key: 'pdi',
    code: 'pdi',
    type: 'vdem',
    resource: 'vdemScores',
    icon: pdi,
    iconInv: pdiInv,
  },
  {
    key: 'egdi',
    code: 'egdi',
    type: 'vdem',
    resource: 'vdemScores',
    icon: egdi,
    iconInv: egdiInv,
  },
];

export const INDICATORS = [
  {
    key: 'net-primary',
    code: 'NetPrimEnrol',
    right: 'education',
  },
  {
    key: 'sec-enrol',
    code: 'NetSecEnrol',
    right: 'education',
  },
  {
    key: 'pisa-science',
    code: 'PISAscience',
    right: 'education',
  },
  {
    key: 'pisa-math',
    code: 'PISAmath',
    right: 'education',
  },
  {
    key: 'pisa-reading',
    code: 'PISAreading',
    right: 'education',
  },
  {
    key: 'not-stunted',
    code: 'NotStunted',
    right: 'food',
  },
  {
    key: 'food-security',
    code: 'FoodSecure',
    right: 'food',
  },
  {
    key: 'adult-survival',
    code: 'AdultSurvival',
    right: 'health',
  },
  {
    key: 'under-5-survival',
    code: 'U5Survival',
    right: 'health',
  },
  {
    key: 'contraception',
    code: 'Contraception',
    right: 'health',
  },
  {
    key: 'birth-weight',
    code: 'NotLowBirWt',
    right: 'health',
  },
  {
    key: 'water-in-home',
    code: 'WaterInHome',
    right: 'housing',
  },
  {
    key: 'basic-sanitation',
    code: 'BasicSanitation',
    right: 'housing',
  },
  {
    key: 'safe-sanitation',
    code: 'SafeSanitation',
    right: 'housing',
  },
  {
    key: 'affordable-housing',
    code: 'AffordHouse',
    right: 'housing',
  },
  {
    key: 'relative-poverty',
    code: 'NotRelPoor',
    right: 'work',
  },
  {
    key: 'absolute-poverty',
    code: 'NotAbsPoor',
    right: 'work',
  },
  {
    key: 'longterm-unemployment',
    code: 'NotLTUnemploy',
    right: 'work',
  },
];

export const COOKIECONSENT_NAME = 'state-of-the-world-cookie-consent-status';
export const GA_PROPERTY_ID = 'G-ND03JE80RW';
export const GA_COOKIE_ID = '_ga_ND03JE80RW';
