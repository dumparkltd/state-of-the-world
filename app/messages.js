/*
 * Global Messages
 *
 * This contains all the text for the Country container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'hrmi';

export default defineMessages({
  app: {
    title: {
      id: `${scope}.app.title`,
      defaultMessage: 'Rights Tracker',
    },
    hrmi: {
      id: `${scope}.app.hrmi`,
      defaultMessage: 'Humen Rights Measurement Initiative',
    },
    claim: {
      id: `${scope}.app.claim`,
      defaultMessage: 'Measuring What Matters',
    },
    metaTitle: {
      id: `${scope}.app.metaTitle`,
      defaultMessage: 'HRMI Rights Tracker',
    },
    metaDescription: {
      id: `${scope}.app.metaDescription`,
      defaultMessage: 'HRMI Rights Tracker - Measuring what matters',
    },
  },
  indicatorSources: {
    WB_WDI: {
      id: `${scope}.indicatorSources.WB_WDI`,
      defaultMessage: 'WB_WDI',
    },
    WHO_UNICEF_JMP: {
      id: `${scope}.indicatorSources.WHO_UNICEF_JMP`,
      defaultMessage: 'WHO_UNICEF_JMP',
    },
    LIS: {
      id: `${scope}.indicatorSources.LIS`,
      defaultMessage: 'LIS',
    },
    JME: {
      id: `${scope}.indicatorSources.JME`,
      defaultMessage: 'JME',
    },
    FAOSTAT: {
      id: `${scope}.indicatorSources.FAOSTAT`,
      defaultMessage: 'FAOSTAT',
    },
    OECD: {
      id: `${scope}.indicatorSources.OECD`,
      defaultMessage: 'OECD',
    },
    OECD_ed: {
      id: `${scope}.indicatorSources.OECD_ed`,
      defaultMessage: 'OECD_ed',
    },
    OECD_unempl: {
      id: `${scope}.indicatorSources.OECD_unempl`,
      defaultMessage: 'OECD_unempl',
    },
    OECD_housing: {
      id: `${scope}.indicatorSources.OECD_housing`,
      defaultMessage: 'OECD_housing',
    },
    UNESCO: {
      id: `${scope}.indicatorSources.UNESCO`,
      defaultMessage: 'UNESCO',
    },
    UNICEF: {
      id: `${scope}.indicatorSources.UNICEF`,
      defaultMessage: 'UNICEF',
    },
    UN_IGME: {
      id: `${scope}.indicatorSources.UN_IGME`,
      defaultMessage: 'UN_IGME',
    },
    UNDP: {
      id: `${scope}.indicatorSources.UNDP`,
      defaultMessage: 'UNDP',
    },
    UNPD: {
      id: `${scope}.indicatorSources.UNPD`,
      defaultMessage: 'United Nations Population Division',
    },
    UNPD_MPI: {
      id: `${scope}.indicatorSources.UNPD_MPI`,
      defaultMessage: 'UNPD_MPI',
    },
    WB_POVCAL: {
      id: `${scope}.indicatorSources.WB_POVCAL`,
      defaultMessage: 'WB_POVCAL',
    },
  },
  sources: {
    urlRightsTracker: {
      id: `${scope}.sources.urlRightsTracker`,
      defaultMessage: 'https://rightstracker.org',
    },
    anchorRightsTracker: {
      id: `${scope}.sources.anchorRightsTracker`,
      defaultMessage: 'rightstracker.org',
    },
    urlSERF: {
      id: `${scope}.sources.urlSERF`,
      defaultMessage: 'http://serfindex.org ',
    },
    anchorSERF: {
      id: `${scope}.sources.anchorSERF`,
      defaultMessage: 'serfindex.org ',
    },
    urlVDEM: {
      id: `${scope}.sources.urlVDEM`,
      defaultMessage: 'https://www.v-dem.net/en/ ',
    },
    anchorVDEM: {
      id: `${scope}.sources.anchorVDEM`,
      defaultMessage: 'v-dem.net ',
    },
  },
  hints: {
    noResults: {
      id: `${scope}.hints.noResults`,
      defaultMessage:
        'We could not find any countries for your filter settings',
    },
  },
  'indicators-about': {
    'net-primary': {
      id: `${scope}.indicators-about.net-primary`,
      defaultMessage: 'net-primary-about',
    },
    'sec-enrol': {
      id: `${scope}.indicators-about.sec-enrol`,
      defaultMessage: 'sec-enrol-about',
    },
    'pisa-science': {
      id: `${scope}.indicators-about.pisa-science`,
      defaultMessage: 'pisa-science-about',
    },
    'pisa-math': {
      id: `${scope}.indicators-about.pisa-math`,
      defaultMessage: 'pisa-math-about',
    },
    'pisa-reading': {
      id: `${scope}.indicators-about.pisa-reading`,
      defaultMessage: 'pisa-reading-about',
    },
    'not-stunted': {
      id: `${scope}.indicators-about.not-stunted`,
      defaultMessage: 'not-stunted-about',
    },
    'food-security': {
      id: `${scope}.indicators-about.food-security`,
      defaultMessage: 'food-security-about',
    },
    'adult-survival': {
      id: `${scope}.indicators-about.adult-survival`,
      defaultMessage: 'adult-survival-about',
    },
    'under-5-survival': {
      id: `${scope}.indicators-about.under-5-survival`,
      defaultMessage: 'under-5-survival-about',
    },
    contraception: {
      id: `${scope}.indicators-about.contraception`,
      defaultMessage: 'contraception-about',
    },
    'birth-weight': {
      id: `${scope}.indicators-about.birth-weight`,
      defaultMessage: 'birth-weight-about',
    },
    'water-in-home': {
      id: `${scope}.indicators-about.water-in-home`,
      defaultMessage: 'water-in-home-about',
    },
    'basic-sanitation': {
      id: `${scope}.indicators-about.basic-sanitation`,
      defaultMessage: 'basic-sanitation-about',
    },
    'safe-sanitation': {
      id: `${scope}.indicators-about.safe-sanitation`,
      defaultMessage: 'safe-sanitation-about',
    },
    'relative-poverty': {
      id: `${scope}.indicators-about.relative-poverty`,
      defaultMessage: 'relative-poverty-about',
    },
    'absolute-poverty': {
      id: `${scope}.indicators-about.absolute-poverty`,
      defaultMessage: 'absolute-poverty-about',
    },
    'longterm-unemployment': {
      id: `${scope}.indicators-about.longterm-unemployment`,
      defaultMessage: 'longterm-unemployment-about',
    },
    'affordable-housing': {
      id: `${scope}.indicators-about.affordable-housing`,
      defaultMessage: 'affordable-housing-about',
    },
  },
  'indicators-raw': {
    'net-primary': {
      id: `${scope}.indicators-raw.net-primary`,
      defaultMessage: 'net-primary',
    },
    'sec-enrol': {
      id: `${scope}.indicators-raw.sec-enrol`,
      defaultMessage: 'sec-enrol',
    },
    'pisa-science': {
      id: `${scope}.indicators-raw.pisa-science`,
      defaultMessage: 'pisa-science',
    },
    'pisa-math': {
      id: `${scope}.indicators-raw.pisa-math`,
      defaultMessage: 'pisa-math',
    },
    'pisa-reading': {
      id: `${scope}.indicators-raw.pisa-reading`,
      defaultMessage: 'pisa-reading',
    },
    'not-stunted': {
      id: `${scope}.indicators-raw.not-stunted`,
      defaultMessage: 'not-stunted',
    },
    'food-security': {
      id: `${scope}.indicators-raw.food-security`,
      defaultMessage: 'food-security',
    },
    'adult-survival': {
      id: `${scope}.indicators-raw.adult-survival`,
      defaultMessage: 'adult-survival',
    },
    'under-5-survival': {
      id: `${scope}.indicators-raw.under-5-survival`,
      defaultMessage: 'under-5-survival',
    },
    contraception: {
      id: `${scope}.indicators-raw.contraception`,
      defaultMessage: 'contraception',
    },
    'birth-weight': {
      id: `${scope}.indicators-raw.birth-weight`,
      defaultMessage: 'birth-weight',
    },
    'water-in-home': {
      id: `${scope}.indicators-raw.water-in-home`,
      defaultMessage: 'water-in-home',
    },
    'basic-sanitation': {
      id: `${scope}.indicators-raw.basic-sanitation`,
      defaultMessage: 'basic-sanitation',
    },
    'safe-sanitation': {
      id: `${scope}.indicators-raw.safe-sanitation`,
      defaultMessage: 'safe-sanitation',
    },
    'relative-poverty': {
      id: `${scope}.indicators-raw.relative-poverty`,
      defaultMessage: 'relative-poverty',
    },
    'absolute-poverty': {
      id: `${scope}.indicators-raw.absolute-poverty`,
      defaultMessage: 'absolute-poverty',
    },
    'longterm-unemployment': {
      id: `${scope}.indicators-raw.longterm-unemployment`,
      defaultMessage: 'longterm-unemployment',
    },
    'affordable-housing': {
      id: `${scope}.indicators-raw.affordable-housing`,
      defaultMessage: 'affordable-housing',
    },
  },
  labels: {
    score: {
      id: `${scope}.labels.score`,
      defaultMessage: 'Score',
    },
    trend: {
      id: `${scope}.labels.trend`,
      defaultMessage: 'Trend *',
    },
    hiCountry: {
      id: `${scope}.labels.hiCountry`,
      defaultMessage: 'HI',
    },
    govResponseCountry: {
      id: `${scope}.labels.govResponseCountry`,
      defaultMessage: 'g',
    },
    better: {
      id: `${scope}.labels.better`,
      defaultMessage: 'Better',
    },
    worse: {
      id: `${scope}.labels.worse`,
      defaultMessage: 'Worse',
    },
    loading: {
      id: `${scope}.labels.loading`,
      defaultMessage: 'Loading...',
    },
    countries: {
      id: `${scope}.labels.countries`,
      defaultMessage: 'Countries',
    },
    metrics: {
      id: `${scope}.labels.metrics`,
      defaultMessage: 'Metrics',
    },
    regionScore: {
      id: `${scope}.labels.regionScore`,
      defaultMessage: 'Group average',
    },
    worldDetailScore: {
      id: `${scope}.labels.worldDetailScore`,
      defaultMessage: 'Global average',
    },
    regionDetailScore: {
      id: `${scope}.labels.regionDetailScore`,
      defaultMessage: 'Group average',
    },
    allDetailScore: {
      id: `${scope}.labels.allDetailScore`,
      defaultMessage: 'Group average',
    },
    worldScore: {
      id: `${scope}.labels.worldScore`,
      defaultMessage: 'Global average',
    },
    regionRefScore: {
      id: `${scope}.labels.regionRefScore`,
      defaultMessage: 'Average score',
    },
    countryScore: {
      id: `${scope}.labels.countryScore`,
      defaultMessage: 'Score',
    },
    countryNo: {
      id: `${scope}.labels.countryNo`,
      defaultMessage: 'No of countries',
    },
    abbrev: {
      notAvailable: {
        id: `${scope}.labels.abbrev.notAvailable`,
        defaultMessage: `${scope}.labels.abbrev.notAvailable`,
      },
    },
    xAxis: {
      best: {
        id: `${scope}.labels.xAxis.best`,
        defaultMessage: '% of global best benchmark achieved',
      },
      cpr: {
        id: `${scope}.labels.xAxis.cpr`,
        defaultMessage: 'Score',
      },
    },
    grades: {
      poor: {
        id: `${scope}.labels.grades.poor`,
        defaultMessage: 'Very Bad',
      },
      bad: {
        id: `${scope}.labels.grades.bad`,
        defaultMessage: 'Bad',
      },
      fair: {
        id: `${scope}.labels.grades.fair`,
        defaultMessage: 'Fair',
      },
      good: {
        id: `${scope}.labels.grades.good`,
        defaultMessage: 'Good',
      },
    },
  },
  tabs: {
    snapshot: {
      id: `${scope}.tabs.snapshot`,
      defaultMessage: 'Snapshot',
    },
    about: {
      id: `${scope}.tabs.about`,
      defaultMessage: 'About',
    },
    ranking: {
      id: `${scope}.tabs.ranking`,
      defaultMessage: 'Country ranking',
    },
    regions: {
      id: `${scope}.tabs.regions`,
      defaultMessage: 'Regions over time',
    },
    mobile: {
      snapshot: {
        id: `${scope}.tabs.mobile.snapshot`,
        defaultMessage: 'Snapshot',
      },
      about: {
        id: `${scope}.tabs.mobile.about`,
        defaultMessage: 'About',
      },
      ranking: {
        id: `${scope}.tabs.mobile.ranking`,
        defaultMessage: 'Ranking',
      },
      regions: {
        id: `${scope}.tabs.mobile.regions`,
        defaultMessage: 'Over time',
      },
    },
  },
  charts: {
    noData: {
      id: `${scope}.charts.noData`,
      defaultMessage: 'No data',
    },
    noDataForStandard: {
      id: `${scope}.charts.noDataForStandard`,
      defaultMessage: 'No data for standard',
    },
    incompleteData: {
      id: `${scope}.charts.incompleteData`,
      defaultMessage: 'Incomplete data',
    },
    changeStandard: {
      id: `${scope}.charts.changeStandard`,
      defaultMessage: 'changeStandard',
    },
    noteRegionalBiasESR: {
      id: `${scope}.charts.noteRegionalBiasESR`,
      defaultMessage:
        'Note that country scores are based on the most recent indicator data available, possibly introducing a regional bias',
    },
    noteRegionalBiasESRWithLink: {
      id: `${scope}.charts.noteRegionalBiasESRWithLink`,
      defaultMessage:
        'Note that country scores are based on the most recent indicator data available, possibly introducing a regional bias ({link})',
    },
    noteRegionalBiasESRLink: {
      id: `${scope}.charts.noteRegionalBiasESRLink`,
      defaultMessage: 'click here for details',
    },
    gradesESR: {
      id: `${scope}.charts.gradesESR`,
      defaultMessage:
        'Indicative ranges for interpreting economic and social rights scores (please refer to the Methodology page for details):',
    },
    gradesCPR: {
      id: `${scope}.charts.gradesCPR`,
      defaultMessage:
        'Indicative ranges for interpreting civil and political rights scores (please refer to the Methodology page for details):',
    },
    gradesESRWithLink: {
      id: `${scope}.charts.gradesESRWithLink`,
      defaultMessage:
        'Indicative ranges for interpreting economic and social rights scores:',
    },
    gradesCPRWithLink: {
      id: `${scope}.charts.gradesCPRWithLink`,
      defaultMessage:
        'Indicative ranges for interpreting civil and political rights scores:',
    },
    gradeBracket: {
      id: `${scope}.charts.gradeBracket`,
      defaultMessage: '{grade}: {min} - {max}{unit}',
    },
    methodologyLink: {
      id: `${scope}.charts.methodologyLink`,
      defaultMessage: 'See the Methodology page for details',
    },
  },
  settings: {
    standard: {
      name: {
        id: `${scope}.settings.standard.name`,
        defaultMessage: 'Assessment standard',
      },
      intro: {
        id: `${scope}.settings.standard.intro`,
        defaultMessage:
          'For the quality of life rights we have two assessment standards.',
      },
      core: {
        id: `${scope}.settings.standard.core`,
        defaultMessage: 'Low and middle income',
      },
      hi: {
        id: `${scope}.settings.standard.hi`,
        defaultMessage: 'High income',
      },
      coreInfo: {
        id: `${scope}.settings.standard.coreInfo`,
        defaultMessage:
          'Uses statistical indicators that are available for most countries in the world, particularly low and middle income countries.',
      },
      hiInfo: {
        id: `${scope}.settings.standard.hiInfo`,
        defaultMessage:
          'Uses indicators that are available for fewer countries, and/or better reflect the human rights challenges of high-income countries.',
      },
    },
  },
  metricTypes: {
    rights: {
      id: `${scope}.metricTypes.rights`,
      defaultMessage: 'Rights',
    },
    right: {
      id: `${scope}.metricTypes.right`,
      defaultMessage: 'Right',
    },
  },
  page: {
    about: {
      id: `${scope}.page.about`,
      defaultMessage: 'About',
    },
    methodology: {
      id: `${scope}.page.methodology`,
      defaultMessage: 'Methodology',
    },
    'methodology-esr': {
      id: `${scope}.page.methodology-esr`,
      defaultMessage: 'Economic and social rights',
    },
    'methodology-cpr': {
      id: `${scope}.page.methodology-cpr`,
      defaultMessage: 'Civil and political rights',
    },
    'methodology-vdem': {
      id: `${scope}.page.methodology-vdem`,
      defaultMessage: 'Democracy metrics',
    },
    'methodology-other': {
      id: `${scope}.page.methodology-other`,
      defaultMessage: 'Other data',
    },
    privacy: {
      id: `${scope}.page.privacy`,
      defaultMessage: 'Privacy policy',
    },
  },
  pageMenu: {
    about: {
      id: `${scope}.pageMenu.about`,
      defaultMessage: 'About',
    },
    methodology: {
      id: `${scope}.pageMenu.methodology`,
      defaultMessage: 'Methodology',
    },
    'methodology-esr': {
      id: `${scope}.pageMenu.methodology-esr`,
      defaultMessage: 'Economic and social rights',
    },
    'methodology-cpr': {
      id: `${scope}.pageMenu.methodology-cpr`,
      defaultMessage: 'Civil and political rights',
    },
    'methodology-vdem': {
      id: `${scope}.pageMenu.methodology-vdem`,
      defaultMessage: 'Democracy metrics',
    },
    'methodology-other': {
      id: `${scope}.pageMenu.methodology-other`,
      defaultMessage: 'Other data',
    },
    privacy: {
      id: `${scope}.pageMenu.privacy`,
      defaultMessage: 'Privacy policy',
    },
  },
  rightsTypes: {
    cpr: {
      id: `${scope}.rightsTypes.cpr`,
      defaultMessage: 'cpr',
    },
    esr: {
      id: `${scope}.rightsTypes.esr`,
      defaultMessage: 'esr',
    },
    vdem: {
      id: `${scope}.rightsTypes.vdem`,
      defaultMessage: 'vdem',
    },
  },
  rights: {
    arrest: {
      id: `${scope}.rights.arrest`,
      defaultMessage: 'arrest',
    },
    assembly: {
      id: `${scope}.rights.assembly`,
      defaultMessage: 'assembly',
    },
    disappearance: {
      id: `${scope}.rights.disappearance`,
      defaultMessage: 'disappearance',
    },
    'death-penalty': {
      id: `${scope}.rights.death-penalty`,
      defaultMessage: 'death-penalty',
    },
    'extrajud-killing': {
      id: `${scope}.rights.extrajud-killing`,
      defaultMessage: 'extrajud-killing',
    },
    expression: {
      id: `${scope}.rights.expression`,
      defaultMessage: 'expression',
    },
    participation: {
      id: `${scope}.rights.participation`,
      defaultMessage: 'participation',
    },
    torture: {
      id: `${scope}.rights.torture`,
      defaultMessage: 'torture',
    },
    education: {
      id: `${scope}.rights.education`,
      defaultMessage: 'education',
    },
    food: {
      id: `${scope}.rights.food`,
      defaultMessage: 'food',
    },
    health: {
      id: `${scope}.rights.health`,
      defaultMessage: 'health',
    },
    housing: {
      id: `${scope}.rights.housing`,
      defaultMessage: 'housing',
    },
    work: {
      id: `${scope}.rights.work`,
      defaultMessage: 'work',
    },
    edi: {
      id: `${scope}.rights.edi`,
      defaultMessage: 'edi',
    },
    ldi: {
      id: `${scope}.rights.ldi`,
      defaultMessage: 'ldi',
    },
    egdi: {
      id: `${scope}.rights.egdi`,
      defaultMessage: 'egdi',
    },
    pdi: {
      id: `${scope}.rights.pdi`,
      defaultMessage: 'pdi',
    },
    ddi: {
      id: `${scope}.rights.ddi`,
      defaultMessage: 'ddi',
    },
  },
  'rights-short': {
    arrest: {
      id: `${scope}.rights-short.arrest`,
      defaultMessage: 'arrest',
    },
    assembly: {
      id: `${scope}.rights-short.assembly`,
      defaultMessage: 'assembly',
    },
    disappearance: {
      id: `${scope}.rights-short.disappearance`,
      defaultMessage: 'disappearance',
    },
    'death-penalty': {
      id: `${scope}.rights-short.death-penalty`,
      defaultMessage: 'death-penalty',
    },
    'extrajud-killing': {
      id: `${scope}.rights-short.extrajud-killing`,
      defaultMessage: 'extrajud-killing',
    },
    expression: {
      id: `${scope}.rights-short.expression`,
      defaultMessage: 'expression',
    },
    participation: {
      id: `${scope}.rights-short.participation`,
      defaultMessage: 'participation',
    },
    torture: {
      id: `${scope}.rights-short.torture`,
      defaultMessage: 'torture',
    },
    education: {
      id: `${scope}.rights-short.education`,
      defaultMessage: 'education',
    },
    food: {
      id: `${scope}.rights-short.food`,
      defaultMessage: 'food',
    },
    health: {
      id: `${scope}.rights-short.health`,
      defaultMessage: 'health',
    },
    housing: {
      id: `${scope}.rights-short.housing`,
      defaultMessage: 'housing',
    },
    work: {
      id: `${scope}.rights-short.work`,
      defaultMessage: 'work',
    },
    edi: {
      id: `${scope}.rights-short.edi`,
      defaultMessage: 'edi',
    },
    ldi: {
      id: `${scope}.rights-short.ldi`,
      defaultMessage: 'ldi',
    },
    egdi: {
      id: `${scope}.rights-short.egdi`,
      defaultMessage: 'egdi',
    },
    pdi: {
      id: `${scope}.rights-short.pdi`,
      defaultMessage: 'pdi',
    },
    ddi: {
      id: `${scope}.rights-short.ddi`,
      defaultMessage: 'ddi',
    },
  },
  'rights-xshort': {
    arrest: {
      id: `${scope}.rights-xshort.arrest`,
      defaultMessage: 'arrest',
    },
    assembly: {
      id: `${scope}.rights-xshort.assembly`,
      defaultMessage: 'assembly',
    },
    disappearance: {
      id: `${scope}.rights-xshort.disappearance`,
      defaultMessage: 'disappearance',
    },
    'death-penalty': {
      id: `${scope}.rights-xshort.death-penalty`,
      defaultMessage: 'death-penalty',
    },
    'extrajud-killing': {
      id: `${scope}.rights-xshort.extrajud-killing`,
      defaultMessage: 'extrajud-killing',
    },
    expression: {
      id: `${scope}.rights-xshort.expression`,
      defaultMessage: 'expression',
    },
    participation: {
      id: `${scope}.rights-xshort.participation`,
      defaultMessage: 'participation',
    },
    torture: {
      id: `${scope}.rights-xshort.torture`,
      defaultMessage: 'torture',
    },
    education: {
      id: `${scope}.rights-xshort.education`,
      defaultMessage: 'education',
    },
    food: {
      id: `${scope}.rights-xshort.food`,
      defaultMessage: 'food',
    },
    health: {
      id: `${scope}.rights-short.health`,
      defaultMessage: 'health',
    },
    housing: {
      id: `${scope}.rights-xshort.housing`,
      defaultMessage: 'housing',
    },
    work: {
      id: `${scope}.rights-xshort.work`,
      defaultMessage: 'work',
    },
    edi: {
      id: `${scope}.rights-xshort.edi`,
      defaultMessage: 'edi',
    },
    ldi: {
      id: `${scope}.rights-xshort.ldi`,
      defaultMessage: 'ldi',
    },
    egdi: {
      id: `${scope}.rights-xshort.egdi`,
      defaultMessage: 'egdi',
    },
    pdi: {
      id: `${scope}.rights-xshort.pdi`,
      defaultMessage: 'pdi',
    },
    ddi: {
      id: `${scope}.rights-xshort.ddi`,
      defaultMessage: 'ddi',
    },
  },
  'rights-about': {
    arrest: {
      id: `${scope}.rights-about.arrest`,
      defaultMessage: 'arrest-about',
    },
    assembly: {
      id: `${scope}.rights-about.assembly`,
      defaultMessage: 'assembly-about',
    },
    disappearance: {
      id: `${scope}.rights-about.disappearance`,
      defaultMessage: 'disappearance-about',
    },
    'death-penalty': {
      id: `${scope}.rights-about.death-penalty`,
      defaultMessage: 'death-penalty-about',
    },
    'extrajud-killing': {
      id: `${scope}.rights-about.extrajud-killing`,
      defaultMessage: 'extrajud-killing-about',
    },
    expression: {
      id: `${scope}.rights-about.expression`,
      defaultMessage: 'expression-about',
    },
    participation: {
      id: `${scope}.rights-about.participation`,
      defaultMessage: 'participation-about',
    },
    torture: {
      id: `${scope}.rights-about.torture`,
      defaultMessage: 'torture-about',
    },
    education: {
      id: `${scope}.rights-about.education`,
      defaultMessage: 'education-about',
    },
    food: {
      id: `${scope}.rights-about.food`,
      defaultMessage: 'food-about',
    },
    health: {
      id: `${scope}.rights-about.health`,
      defaultMessage: 'health-about',
    },
    housing: {
      id: `${scope}.rights-about.housing`,
      defaultMessage: 'housing-about',
    },
    work: {
      id: `${scope}.rights-about.work`,
      defaultMessage: 'work-about',
    },
    edi: {
      id: `${scope}.rights-about.edi`,
      defaultMessage: 'edi',
    },
    ldi: {
      id: `${scope}.rights-about.ldi`,
      defaultMessage: 'ldi',
    },
    egdi: {
      id: `${scope}.rights-about.egdi`,
      defaultMessage: 'egdi',
    },
    pdi: {
      id: `${scope}.rights-about.pdi`,
      defaultMessage: 'pdi',
    },
    ddi: {
      id: `${scope}.rights-about.ddi`,
      defaultMessage: 'ddi',
    },
  },
  un_regions: {
    AG: {
      id: `${scope}.un_regions.AG`,
      defaultMessage: 'African Group',
    },
    APG: {
      id: `${scope}.un_regions.APG`,
      defaultMessage: 'Asia-Pacific Group',
    },
    EEG: {
      id: `${scope}.un_regions.EEG`,
      defaultMessage: 'Eastern European Group',
    },
    GRULAC: {
      id: `${scope}.un_regions.GRULAC`,
      defaultMessage: 'Latin American & Caribbean Group',
    },
    WEOG: {
      id: `${scope}.un_regions.WEOG`,
      defaultMessage: 'Western European & Others Group',
    },
    world: {
      id: `${scope}.un_regions.world`,
      defaultMessage: 'World',
    },
    all: {
      id: `${scope}.un_regions.all`,
      defaultMessage: 'All regions',
    },
    none: {
      id: `${scope}.un_regions.none`,
      defaultMessage: 'Without UN region',
    },
  },
  un_regions_short: {
    AG: {
      id: `${scope}.un_regions_short.AG`,
      defaultMessage: 'Africa',
    },
    APG: {
      id: `${scope}.un_regions_short.APG`,
      defaultMessage: 'Asia-Pacific',
    },
    EEG: {
      id: `${scope}.un_regions_short.EEG`,
      defaultMessage: 'Eastern Europe',
    },
    GRULAC: {
      id: `${scope}.un_regions_short.GRULAC`,
      defaultMessage: 'Latin America & Caribbean',
    },
    WEOG: {
      id: `${scope}.un_regions_short.WEOG`,
      defaultMessage: 'Western Europe & Others',
    },
    world: {
      id: `${scope}.un_regions_short.world`,
      defaultMessage: 'World',
    },
    all: {
      id: `${scope}.un_regions_short.all`,
      defaultMessage: 'All',
    },
    none: {
      id: `${scope}.un_regions.none`,
      defaultMessage: 'Without region',
    },
  },
  income: {
    hi: {
      id: `${scope}.income.hi`,
      defaultMessage: 'hi',
    },
    lmi: {
      id: `${scope}.income.lmi`,
      defaultMessage: 'lmi',
    },
  },
  vdemClass: {
    '0': {
      id: `${scope}.vdemClass.0`,
      defaultMessage: 'Closed autocracy',
    },
    '1': {
      id: `${scope}.vdemClass.1`,
      defaultMessage: 'Electoral autocracy',
    },
    '2': {
      id: `${scope}.vdemClass.2`,
      defaultMessage: 'Electoral democracy',
    },
    '3': {
      id: `${scope}.vdemClass.3`,
      defaultMessage: 'Liberal democracy',
    },
  },
  vdemClassInfo: {
    '0': {
      id: `${scope}.vdemClassInfo.0`,
      defaultMessage: 'Closed autocracy',
    },
    '1': {
      id: `${scope}.vdemClassInfo.1`,
      defaultMessage: 'Electoral autocracy',
    },
    '2': {
      id: `${scope}.vdemClassInfo.2`,
      defaultMessage: 'Electoral democracy',
    },
    '3': {
      id: `${scope}.vdemClassInfo.3`,
      defaultMessage: 'Liberal democracy',
    },
  },
  eiuClass: {
    '0': {
      id: `${scope}.eiuClass.0`,
      defaultMessage: 'eiuClass',
    },
    '1': {
      id: `${scope}.eiuClass.1`,
      defaultMessage: 'eiuClass',
    },
    '2': {
      id: `${scope}.eiuClass.2`,
      defaultMessage: 'eiuClass',
    },
    '3': {
      id: `${scope}.eiuClass.3`,
      defaultMessage: 'eiuClass',
    },
  },
  eiuClassInfo: {
    '0': {
      id: `${scope}.eiuClassInfo.0`,
      defaultMessage: 'eiuClassInfo',
    },
    '1': {
      id: `${scope}.eiuClassInfo.1`,
      defaultMessage: 'eiuClassInfo',
    },
    '2': {
      id: `${scope}.eiuClassInfo.2`,
      defaultMessage: 'eiuClassInfo',
    },
    '3': {
      id: `${scope}.eiuClassInfo.3`,
      defaultMessage: 'eiuClassInfo',
    },
  },
  countries: {
    ABW: {
      id: `${scope}.countries.ABW`,
      defaultMessage: 'ABW',
    },
    ARG: {
      id: `${scope}.countries.ARG`,
      defaultMessage: 'ARG',
    },
    ATG: {
      id: `${scope}.countries.ATG`,
      defaultMessage: 'ATG',
    },
    BHS: {
      id: `${scope}.countries.BHS`,
      defaultMessage: 'BHS',
    },
    BLZ: {
      id: `${scope}.countries.BLZ`,
      defaultMessage: 'BLZ',
    },
    BMU: {
      id: `${scope}.countries.BMU`,
      defaultMessage: 'BMU',
    },
    BOL: {
      id: `${scope}.countries.BOL`,
      defaultMessage: 'BOL',
    },
    BRA: {
      id: `${scope}.countries.BRA`,
      defaultMessage: 'BRA',
    },
    BRB: {
      id: `${scope}.countries.BRB`,
      defaultMessage: 'BRB',
    },
    CAN: {
      id: `${scope}.countries.CAN`,
      defaultMessage: 'CAN',
    },
    CHL: {
      id: `${scope}.countries.CHL`,
      defaultMessage: 'CHL',
    },
    COL: {
      id: `${scope}.countries.COL`,
      defaultMessage: 'COL',
    },
    CRI: {
      id: `${scope}.countries.CRI`,
      defaultMessage: 'CRI',
    },
    CUB: {
      id: `${scope}.countries.CUB`,
      defaultMessage: 'CUB',
    },
    CUW: {
      id: `${scope}.countries.CUW`,
      defaultMessage: 'CUW',
    },
    CYM: {
      id: `${scope}.countries.CYM`,
      defaultMessage: 'CYM',
    },
    DMA: {
      id: `${scope}.countries.DMA`,
      defaultMessage: 'DMA',
    },
    DOM: {
      id: `${scope}.countries.DOM`,
      defaultMessage: 'DOM',
    },
    ECU: {
      id: `${scope}.countries.ECU`,
      defaultMessage: 'ECU',
    },
    GRD: {
      id: `${scope}.countries.GRD`,
      defaultMessage: 'GRD',
    },
    GTM: {
      id: `${scope}.countries.GTM`,
      defaultMessage: 'GTM',
    },
    GUY: {
      id: `${scope}.countries.GUY`,
      defaultMessage: 'GUY',
    },
    HND: {
      id: `${scope}.countries.HND`,
      defaultMessage: 'HND',
    },
    HTI: {
      id: `${scope}.countries.HTI`,
      defaultMessage: 'HTI',
    },
    JAM: {
      id: `${scope}.countries.JAM`,
      defaultMessage: 'JAM',
    },
    KNA: {
      id: `${scope}.countries.KNA`,
      defaultMessage: 'KNA',
    },
    LCA: {
      id: `${scope}.countries.LCA`,
      defaultMessage: 'LCA',
    },
    MAF: {
      id: `${scope}.countries.MAF`,
      defaultMessage: 'MAF',
    },
    MEX: {
      id: `${scope}.countries.MEX`,
      defaultMessage: 'MEX',
    },
    NIC: {
      id: `${scope}.countries.NIC`,
      defaultMessage: 'NIC',
    },
    PAN: {
      id: `${scope}.countries.PAN`,
      defaultMessage: 'PAN',
    },
    PER: {
      id: `${scope}.countries.PER`,
      defaultMessage: 'PER',
    },
    PRI: {
      id: `${scope}.countries.PRI`,
      defaultMessage: 'PRI',
    },
    PRY: {
      id: `${scope}.countries.PRY`,
      defaultMessage: 'PRY',
    },
    SLV: {
      id: `${scope}.countries.SLV`,
      defaultMessage: 'SLV',
    },
    SUR: {
      id: `${scope}.countries.SUR`,
      defaultMessage: 'SUR',
    },
    SXM: {
      id: `${scope}.countries.SXM`,
      defaultMessage: 'SXM',
    },
    TCA: {
      id: `${scope}.countries.TCA`,
      defaultMessage: 'TCA',
    },
    TTO: {
      id: `${scope}.countries.TTO`,
      defaultMessage: 'TTO',
    },
    URY: {
      id: `${scope}.countries.URY`,
      defaultMessage: 'URY',
    },
    USA: {
      id: `${scope}.countries.USA`,
      defaultMessage: 'USA',
    },
    VCT: {
      id: `${scope}.countries.VCT`,
      defaultMessage: 'VCT',
    },
    VEN: {
      id: `${scope}.countries.VEN`,
      defaultMessage: 'VEN',
    },
    VGB: {
      id: `${scope}.countries.VGB`,
      defaultMessage: 'VGB',
    },
    VIR: {
      id: `${scope}.countries.VIR`,
      defaultMessage: 'VIR',
    },
    TWN: {
      id: `${scope}.countries.TWN`,
      defaultMessage: 'TWN',
    },
    ASM: {
      id: `${scope}.countries.ASM`,
      defaultMessage: 'ASM',
    },
    AUS: {
      id: `${scope}.countries.AUS`,
      defaultMessage: 'AUS',
    },
    BRN: {
      id: `${scope}.countries.BRN`,
      defaultMessage: 'BRN',
    },
    CHN: {
      id: `${scope}.countries.CHN`,
      defaultMessage: 'CHN',
    },
    FJI: {
      id: `${scope}.countries.FJI`,
      defaultMessage: 'FJI',
    },
    FSM: {
      id: `${scope}.countries.FSM`,
      defaultMessage: 'FSM',
    },
    GUM: {
      id: `${scope}.countries.GUM`,
      defaultMessage: 'GUM',
    },
    HKG: {
      id: `${scope}.countries.HKG`,
      defaultMessage: 'HKG',
    },
    IDN: {
      id: `${scope}.countries.IDN`,
      defaultMessage: 'IDN',
    },
    JPN: {
      id: `${scope}.countries.JPN`,
      defaultMessage: 'JPN',
    },
    KHM: {
      id: `${scope}.countries.KHM`,
      defaultMessage: 'KHM',
    },
    KIR: {
      id: `${scope}.countries.KIR`,
      defaultMessage: 'KIR',
    },
    KOR: {
      id: `${scope}.countries.KOR`,
      defaultMessage: 'KOR',
    },
    LAO: {
      id: `${scope}.countries.LAO`,
      defaultMessage: 'LAO',
    },
    MAC: {
      id: `${scope}.countries.MAC`,
      defaultMessage: 'MAC',
    },
    MHL: {
      id: `${scope}.countries.MHL`,
      defaultMessage: 'MHL',
    },
    MMR: {
      id: `${scope}.countries.MMR`,
      defaultMessage: 'MMR',
    },
    MNG: {
      id: `${scope}.countries.MNG`,
      defaultMessage: 'MNG',
    },
    MNP: {
      id: `${scope}.countries.MNP`,
      defaultMessage: 'MNP',
    },
    MYS: {
      id: `${scope}.countries.MYS`,
      defaultMessage: 'MYS',
    },
    NCL: {
      id: `${scope}.countries.NCL`,
      defaultMessage: 'NCL',
    },
    NRU: {
      id: `${scope}.countries.NRU`,
      defaultMessage: 'NRU',
    },
    NZL: {
      id: `${scope}.countries.NZL`,
      defaultMessage: 'NZL',
    },
    PHL: {
      id: `${scope}.countries.PHL`,
      defaultMessage: 'PHL',
    },
    PLW: {
      id: `${scope}.countries.PLW`,
      defaultMessage: 'PLW',
    },
    PNG: {
      id: `${scope}.countries.PNG`,
      defaultMessage: 'PNG',
    },
    PRK: {
      id: `${scope}.countries.PRK`,
      defaultMessage: 'PRK',
    },
    PYF: {
      id: `${scope}.countries.PYF`,
      defaultMessage: 'PYF',
    },
    SGP: {
      id: `${scope}.countries.SGP`,
      defaultMessage: 'SGP',
    },
    SLB: {
      id: `${scope}.countries.SLB`,
      defaultMessage: 'SLB',
    },
    THA: {
      id: `${scope}.countries.THA`,
      defaultMessage: 'THA',
    },
    TLS: {
      id: `${scope}.countries.TLS`,
      defaultMessage: 'TLS',
    },
    TON: {
      id: `${scope}.countries.TON`,
      defaultMessage: 'TON',
    },
    TUV: {
      id: `${scope}.countries.TUV`,
      defaultMessage: 'TUV',
    },
    VNM: {
      id: `${scope}.countries.VNM`,
      defaultMessage: 'VNM',
    },
    VUT: {
      id: `${scope}.countries.VUT`,
      defaultMessage: 'VUT',
    },
    WSM: {
      id: `${scope}.countries.WSM`,
      defaultMessage: 'WSM',
    },
    ALB: {
      id: `${scope}.countries.ALB`,
      defaultMessage: 'ALB',
    },
    AND: {
      id: `${scope}.countries.AND`,
      defaultMessage: 'AND',
    },
    ARM: {
      id: `${scope}.countries.ARM`,
      defaultMessage: 'ARM',
    },
    AUT: {
      id: `${scope}.countries.AUT`,
      defaultMessage: 'AUT',
    },
    AZE: {
      id: `${scope}.countries.AZE`,
      defaultMessage: 'AZE',
    },
    BEL: {
      id: `${scope}.countries.BEL`,
      defaultMessage: 'BEL',
    },
    BGR: {
      id: `${scope}.countries.BGR`,
      defaultMessage: 'BGR',
    },
    BIH: {
      id: `${scope}.countries.BIH`,
      defaultMessage: 'BIH',
    },
    BLR: {
      id: `${scope}.countries.BLR`,
      defaultMessage: 'BLR',
    },
    CHE: {
      id: `${scope}.countries.CHE`,
      defaultMessage: 'CHE',
    },
    CHI: {
      id: `${scope}.countries.CHI`,
      defaultMessage: 'CHI',
    },
    CYP: {
      id: `${scope}.countries.CYP`,
      defaultMessage: 'CYP',
    },
    CZE: {
      id: `${scope}.countries.CZE`,
      defaultMessage: 'CZE',
    },
    DEU: {
      id: `${scope}.countries.DEU`,
      defaultMessage: 'DEU',
    },
    DNK: {
      id: `${scope}.countries.DNK`,
      defaultMessage: 'DNK',
    },
    ESP: {
      id: `${scope}.countries.ESP`,
      defaultMessage: 'ESP',
    },
    EST: {
      id: `${scope}.countries.EST`,
      defaultMessage: 'EST',
    },
    FIN: {
      id: `${scope}.countries.FIN`,
      defaultMessage: 'FIN',
    },
    FRA: {
      id: `${scope}.countries.FRA`,
      defaultMessage: 'FRA',
    },
    FRO: {
      id: `${scope}.countries.FRO`,
      defaultMessage: 'FRO',
    },
    GBR: {
      id: `${scope}.countries.GBR`,
      defaultMessage: 'GBR',
    },
    GEO: {
      id: `${scope}.countries.GEO`,
      defaultMessage: 'GEO',
    },
    GIB: {
      id: `${scope}.countries.GIB`,
      defaultMessage: 'GIB',
    },
    GRC: {
      id: `${scope}.countries.GRC`,
      defaultMessage: 'GRC',
    },
    GRL: {
      id: `${scope}.countries.GRL`,
      defaultMessage: 'GRL',
    },
    HRV: {
      id: `${scope}.countries.HRV`,
      defaultMessage: 'HRV',
    },
    HUN: {
      id: `${scope}.countries.HUN`,
      defaultMessage: 'HUN',
    },
    IMN: {
      id: `${scope}.countries.IMN`,
      defaultMessage: 'IMN',
    },
    IRL: {
      id: `${scope}.countries.IRL`,
      defaultMessage: 'IRL',
    },
    ISL: {
      id: `${scope}.countries.ISL`,
      defaultMessage: 'ISL',
    },
    ITA: {
      id: `${scope}.countries.ITA`,
      defaultMessage: 'ITA',
    },
    KAZ: {
      id: `${scope}.countries.KAZ`,
      defaultMessage: 'KAZ',
    },
    KGZ: {
      id: `${scope}.countries.KGZ`,
      defaultMessage: 'KGZ',
    },
    LIE: {
      id: `${scope}.countries.LIE`,
      defaultMessage: 'LIE',
    },
    LTU: {
      id: `${scope}.countries.LTU`,
      defaultMessage: 'LTU',
    },
    LUX: {
      id: `${scope}.countries.LUX`,
      defaultMessage: 'LUX',
    },
    LVA: {
      id: `${scope}.countries.LVA`,
      defaultMessage: '',
    },
    MCO: {
      id: `${scope}.countries.MCO`,
      defaultMessage: 'MCO',
    },
    MDA: {
      id: `${scope}.countries.MDA`,
      defaultMessage: 'MDA',
    },
    MKD: {
      id: `${scope}.countries.MKD`,
      defaultMessage: 'MKD',
    },
    MNE: {
      id: `${scope}.countries.MNE`,
      defaultMessage: 'MNE',
    },
    NLD: {
      id: `${scope}.countries.NLD`,
      defaultMessage: 'NLD',
    },
    NOR: {
      id: `${scope}.countries.NOR`,
      defaultMessage: 'NOR',
    },
    POL: {
      id: `${scope}.countries.POL`,
      defaultMessage: 'POL',
    },
    PRT: {
      id: `${scope}.countries.PRT`,
      defaultMessage: 'PRT',
    },
    ROU: {
      id: `${scope}.countries.ROU`,
      defaultMessage: 'ROU',
    },
    RUS: {
      id: `${scope}.countries.RUS`,
      defaultMessage: 'RUS',
    },
    SMR: {
      id: `${scope}.countries.SMR`,
      defaultMessage: 'SMR',
    },
    SRB: {
      id: `${scope}.countries.SRB`,
      defaultMessage: 'SRB',
    },
    SVK: {
      id: `${scope}.countries.SVK`,
      defaultMessage: 'SVK',
    },
    SVN: {
      id: `${scope}.countries.SVN`,
      defaultMessage: 'SVN',
    },
    SWE: {
      id: `${scope}.countries.SWE`,
      defaultMessage: 'SWE',
    },
    TJK: {
      id: `${scope}.countries.TJK`,
      defaultMessage: 'TJK',
    },
    TKM: {
      id: `${scope}.countries.TKM`,
      defaultMessage: 'TKM',
    },
    TUR: {
      id: `${scope}.countries.TUR`,
      defaultMessage: 'TUR',
    },
    UKR: {
      id: `${scope}.countries.UKR`,
      defaultMessage: 'UKR',
    },
    UZB: {
      id: `${scope}.countries.UZB`,
      defaultMessage: 'UZB',
    },
    XKX: {
      id: `${scope}.countries.XKX`,
      defaultMessage: 'XKX',
    },
    ARE: {
      id: `${scope}.countries.ARE`,
      defaultMessage: 'ARE',
    },
    BHR: {
      id: `${scope}.countries.BHR`,
      defaultMessage: 'BHR',
    },
    DJI: {
      id: `${scope}.countries.DJI`,
      defaultMessage: 'DJI',
    },
    DZA: {
      id: `${scope}.countries.DZA`,
      defaultMessage: 'DZA',
    },
    EGY: {
      id: `${scope}.countries.EGY`,
      defaultMessage: 'EGY',
    },
    IRN: {
      id: `${scope}.countries.IRN`,
      defaultMessage: 'IRN',
    },
    IRQ: {
      id: `${scope}.countries.IRQ`,
      defaultMessage: 'IRQ',
    },
    ISR: {
      id: `${scope}.countries.ISR`,
      defaultMessage: 'ISR',
    },
    JOR: {
      id: `${scope}.countries.JOR`,
      defaultMessage: 'JOR',
    },
    KWT: {
      id: `${scope}.countries.KWT`,
      defaultMessage: 'KWT',
    },
    LBN: {
      id: `${scope}.countries.LBN`,
      defaultMessage: 'LBN',
    },
    LBY: {
      id: `${scope}.countries.LBY`,
      defaultMessage: 'LBY',
    },
    MAR: {
      id: `${scope}.countries.MAR`,
      defaultMessage: 'MAR',
    },
    MLT: {
      id: `${scope}.countries.MLT`,
      defaultMessage: 'MLT',
    },
    OMN: {
      id: `${scope}.countries.OMN`,
      defaultMessage: 'OMN',
    },
    PSE: {
      id: `${scope}.countries.PSE`,
      defaultMessage: 'PSE',
    },
    QAT: {
      id: `${scope}.countries.QAT`,
      defaultMessage: 'QAT',
    },
    SAU: {
      id: `${scope}.countries.SAU`,
      defaultMessage: 'SAU',
    },
    SYR: {
      id: `${scope}.countries.SYR`,
      defaultMessage: 'SYR',
    },
    TUN: {
      id: `${scope}.countries.TUN`,
      defaultMessage: 'TUN',
    },
    YEM: {
      id: `${scope}.countries.YEM`,
      defaultMessage: 'YEM',
    },
    AFG: {
      id: `${scope}.countries.AFG`,
      defaultMessage: 'AFG',
    },
    BGD: {
      id: `${scope}.countries.BGD`,
      defaultMessage: 'BGD',
    },
    BTN: {
      id: `${scope}.countries.BTN`,
      defaultMessage: 'BTN',
    },
    IND: {
      id: `${scope}.countries.IND`,
      defaultMessage: 'IND',
    },
    LKA: {
      id: `${scope}.countries.LKA`,
      defaultMessage: 'LKA',
    },
    MDV: {
      id: `${scope}.countries.MDV`,
      defaultMessage: 'MDV',
    },
    NPL: {
      id: `${scope}.countries.NPL`,
      defaultMessage: 'NPL',
    },
    PAK: {
      id: `${scope}.countries.PAK`,
      defaultMessage: 'PAK',
    },
    AGO: {
      id: `${scope}.countries.AGO`,
      defaultMessage: 'AGO',
    },
    BDI: {
      id: `${scope}.countries.BDI`,
      defaultMessage: 'BDI',
    },
    BEN: {
      id: `${scope}.countries.BEN`,
      defaultMessage: 'BEN',
    },
    BFA: {
      id: `${scope}.countries.BFA`,
      defaultMessage: 'BFA',
    },
    BWA: {
      id: `${scope}.countries.BWA`,
      defaultMessage: 'BWA',
    },
    CAF: {
      id: `${scope}.countries.CAF`,
      defaultMessage: 'CAF',
    },
    CIV: {
      id: `${scope}.countries.CIV`,
      defaultMessage: 'CIV',
    },
    CMR: {
      id: `${scope}.countries.CMR`,
      defaultMessage: 'CMR',
    },
    COD: {
      id: `${scope}.countries.COD`,
      defaultMessage: 'COD',
    },
    COG: {
      id: `${scope}.countries.COG`,
      defaultMessage: 'COG',
    },
    COM: {
      id: `${scope}.countries.COM`,
      defaultMessage: 'COM',
    },
    CPV: {
      id: `${scope}.countries.CPV`,
      defaultMessage: 'CPV',
    },
    ERI: {
      id: `${scope}.countries.ERI`,
      defaultMessage: 'ERI',
    },
    ETH: {
      id: `${scope}.countries.ETH`,
      defaultMessage: 'ETH',
    },
    GAB: {
      id: `${scope}.countries.GAB`,
      defaultMessage: 'GAB',
    },
    GHA: {
      id: `${scope}.countries.GHA`,
      defaultMessage: 'GHA',
    },
    GIN: {
      id: `${scope}.countries.GIN`,
      defaultMessage: 'GIN',
    },
    GMB: {
      id: `${scope}.countries.GMB`,
      defaultMessage: 'GMB',
    },
    GNB: {
      id: `${scope}.countries.GNB`,
      defaultMessage: 'GNB',
    },
    GNQ: {
      id: `${scope}.countries.GNQ`,
      defaultMessage: 'GNQ',
    },
    KEN: {
      id: `${scope}.countries.KEN`,
      defaultMessage: 'KEN',
    },
    LBR: {
      id: `${scope}.countries.LBR`,
      defaultMessage: 'LBR',
    },
    LSO: {
      id: `${scope}.countries.LSO`,
      defaultMessage: 'LSO',
    },
    MDG: {
      id: `${scope}.countries.MDG`,
      defaultMessage: 'MDG',
    },
    MLI: {
      id: `${scope}.countries.MLI`,
      defaultMessage: 'MLI',
    },
    MOZ: {
      id: `${scope}.countries.MOZ`,
      defaultMessage: 'MOZ',
    },
    MRT: {
      id: `${scope}.countries.MRT`,
      defaultMessage: 'MRT',
    },
    MUS: {
      id: `${scope}.countries.MUS`,
      defaultMessage: 'MUS',
    },
    MWI: {
      id: `${scope}.countries.MWI`,
      defaultMessage: 'MWI',
    },
    NAM: {
      id: `${scope}.countries.NAM`,
      defaultMessage: 'NAM',
    },
    NER: {
      id: `${scope}.countries.NER`,
      defaultMessage: 'NER',
    },
    NGA: {
      id: `${scope}.countries.NGA`,
      defaultMessage: 'NGA',
    },
    RWA: {
      id: `${scope}.countries.RWA`,
      defaultMessage: 'RWA',
    },
    SDN: {
      id: `${scope}.countries.SDN`,
      defaultMessage: 'SDN',
    },
    SEN: {
      id: `${scope}.countries.SEN`,
      defaultMessage: 'SEN',
    },
    SLE: {
      id: `${scope}.countries.SLE`,
      defaultMessage: 'SLE',
    },
    SOM: {
      id: `${scope}.countries.SOM`,
      defaultMessage: 'SOM',
    },
    SSD: {
      id: `${scope}.countries.SSD`,
      defaultMessage: 'SSD',
    },
    STP: {
      id: `${scope}.countries.STP`,
      defaultMessage: 'STP',
    },
    SWZ: {
      id: `${scope}.countries.SWZ`,
      defaultMessage: 'SWZ',
    },
    SYC: {
      id: `${scope}.countries.SYC`,
      defaultMessage: 'SYC',
    },
    TCD: {
      id: `${scope}.countries.TCD`,
      defaultMessage: 'TCD',
    },
    TGO: {
      id: `${scope}.countries.TGO`,
      defaultMessage: 'TGO',
    },
    TZA: {
      id: `${scope}.countries.TZA`,
      defaultMessage: 'TZA',
    },
    UGA: {
      id: `${scope}.countries.UGA`,
      defaultMessage: 'UGA',
    },
    ZAF: {
      id: `${scope}.countries.ZAF`,
      defaultMessage: 'ZAF',
    },
    ZMB: {
      id: `${scope}.countries.ZMB`,
      defaultMessage: 'ZMB',
    },
    ZWE: {
      id: `${scope}.countries.ZWE`,
      defaultMessage: 'ZWE',
    },
    COK: {
      id: `${scope}.countries.COK`,
      defaultMessage: 'COK',
    },
    NIU: {
      id: `${scope}.countries.NIU`,
      defaultMessage: 'NIU',
    },
    TKL: {
      id: `${scope}.countries.TKL`,
      defaultMessage: 'TKL',
    },
    WLF: {
      id: `${scope}.countries.WLF`,
      defaultMessage: 'WLF',
    },
  },
  status: {
    unincorporated: {
      id: `${scope}.status.unincorporated`,
      defaultMessage: 'Unincorporated territory',
    },
    associated: {
      id: `${scope}.status.associated`,
      defaultMessage: 'Associated state',
    },
    collectivity_overseas: {
      id: `${scope}.status.collectivity_overseas`,
      defaultMessage: 'Overseas collectivity',
    },
    collectivity_special: {
      id: `${scope}.status.collectivity_special`,
      defaultMessage: 'Special collectivity',
    },
    selfgoverning: {
      id: `${scope}.status.selfgoverning`,
      defaultMessage: 'Self-governing in free association',
    },
    nonselfgoverning: {
      id: `${scope}.status.nonselfgoverning`,
      defaultMessage: 'Non-self-governing territory',
    },
    commonwealth_politicalunion: {
      id: `${scope}.status.commonwealth_politicalunion`,
      defaultMessage: 'Commonwealth in political union',
    },
  },
});
