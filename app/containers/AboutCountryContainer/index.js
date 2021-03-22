/**
 *
 * AboutCountryContainer
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Heading, Box, Text, Accordion, AccordionPanel } from 'grommet';
import { Up, Down } from 'grommet-icons';

import { selectCountry, loadDataIfNeeded } from 'containers/App/actions';

import {
  getCountry,
  getLatestCountryPopulation,
  getLatestCountryCurrentGDP,
  getLatestCountry2011PPPGDP,
  getCountriesGrammar,
  getHRCTerms,
} from 'containers/App/selectors';

import Tooltip from 'components/Tooltip';
import { COLUMNS, TREATIES } from 'containers/App/constants';

import FAQs from 'containers/FAQs';
import ButtonHero from 'styled/ButtonHero';

import { roundScore } from 'utils/scores';
import { getTerritoryStatus } from 'utils/narrative';
import { lowerCase } from 'utils/string';
import qe from 'utils/quasi-equals';

import rootMessages from 'messages';
import messages from './messages';

const Label = styled(p => <Text size="small" {...p} />)`
  font-weight: 600;
`;
const Value = styled(p => <Text size="small" {...p} />)``;

const ContainerBox = styled(Box)`
  flex-direction: column;
  padding-top: 48px;
  padding-bottom: 24px;
  @media print {
    flex-direction: row;
    justify-content: space-between;
    background-color: #262064;
    color: white;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const DetailSection = styled(p => (
  <Box flex={{ shrink: 0 }} pad={{ vertical: 'medium' }} {...p} />
))``;
const DetailBox = styled(p => (
  <Box flex={{ shrink: 0 }} margin={{ bottom: 'xsmall' }} {...p} />
))``;
const FlagBox = styled(p => (
  <Box
    flex={{ shrink: 0 }}
    Boxfill="horizontal"
    align="center"
    margin={{ bottom: 'xsmall' }}
    {...p}
  />
))``;

const CountryTitle = styled(p => (
  <Heading level={3} responsive={false} {...p} />
))`
  margin-top: 0;
  font-weight: 700;
`;

const PanelTitle = styled(p => <Text size="xsmall" {...p} />)`
  text-transform: uppercase;
  font-weight: 600;
`;

const FlagImg = styled.img`
  width: 120px;
`;

const HeadingBox = styled(p => <Box flex={{ shrink: 0 }} {...p} />)``;

const prepPopulationValue = (value, intl, year) => {
  if (parseInt(value, 10) > 1000000) {
    return {
      value: intl.formatNumber(roundScore(value / 1000000, 1)),
      abbrev: 'millions',
      year,
    };
  }
  return {
    value: intl.formatNumber(roundScore(value / 1000, 1)),
    abbrev: 'thousands',
    year,
  };
};

const getCountryHRCTerms = (country, hrcTerms) => {
  const countryTermIds = country[COLUMNS.COUNTRIES.HRC_TERMS]
    ? country[COLUMNS.COUNTRIES.HRC_TERMS].split(',').map(id => id.trim())
    : [];
  // prettier-ignore
  const countryTerms = hrcTerms
    ? hrcTerms.filter(
      t => countryTermIds.indexOf(t[COLUMNS.HRC_TERMS.ID].toString()) > -1,
    )
    : [];
  return countryTerms;
};

const getCurrentHRCTerm = countryTerms =>
  countryTerms.find(t => qe(t[COLUMNS.HRC_TERMS.CURRENT], 1));
const getPreviousHRCTerms = countryTerms =>
  countryTerms.filter(t => !qe(t[COLUMNS.HRC_TERMS.CURRENT], 1));

const DEPENDENCIES = ['countries', 'auxIndicators', 'hrcTerms'];

function AboutCountryContainer({
  intl,
  country,
  currentGDP,
  pppGDP,
  population,
  onCountryClick,
  showFAQs,
  countryCode,
  inAside,
  countriesGrammar,
  hrcTerms,
  onLoadData,
}) {
  const [actives, setActive] = useState(inAside ? [] : [0]);
  const [actives1, setActive1] = useState(inAside ? [] : [0]);

  useEffect(() => {
    onLoadData();
  }, []);
  if (!country) return null;
  const incomeCode =
    country[COLUMNS.COUNTRIES.HIGH_INCOME] === '1' ? 'hi' : 'lmi';
  const hasCurrentGDP =
    currentGDP && currentGDP.value && currentGDP.value !== '';
  const hasPPPGDP = pppGDP && pppGDP.value && pppGDP.value !== '';
  const hasPopulation =
    population && population.value && population.value !== '';

  const countryStatus = country[COLUMNS.COUNTRIES.STATUS];
  const requestImageFile = require.context('images/flags/', true, /.svg$/);

  const countryTreaties = TREATIES.reduce((memo, treaty) => {
    if (qe(country[COLUMNS.COUNTRIES[treaty.column]], 1)) {
      return [
        ...memo,
        {
          key: treaty.column,
          label: intl.formatMessage(messages[`treaty_${treaty.msg}`]),
        },
      ];
    }
    return memo;
  }, []);

  const countryHRCTerms = getCountryHRCTerms(country, hrcTerms);
  const countryCurrentTerm = getCurrentHRCTerm(countryHRCTerms);
  const countryPreviousTerms = getPreviousHRCTerms(countryHRCTerms);

  /* eslint-disable global-require */
  return (
    <ContainerBox pad={{ left: 'medium' }} flex={{ shrink: 0 }}>
      <FlagBox>
        <FlagImg
          src={requestImageFile(`./${lowerCase(countryCode)}.svg`)}
          alt="product"
        />
      </FlagBox>
      <HeadingBox>
        <PanelTitle>
          <FormattedMessage {...messages.title} />
        </PanelTitle>
        <CountryTitle>
          <FormattedMessage {...rootMessages.countries[countryCode]} />
        </CountryTitle>
      </HeadingBox>
      <DetailSection noBorder>
        {countriesGrammar && countryStatus.trim() !== '' && (
          <DetailBox>
            <Box>
              <Label>
                <FormattedMessage {...messages.countryStatus} />
              </Label>
            </Box>
            <Box>
              <Value>
                {getTerritoryStatus(
                  countryStatus,
                  country[COLUMNS.COUNTRIES.RELATED],
                  countriesGrammar.find(
                    c => c.country_code === country[COLUMNS.COUNTRIES.RELATED],
                  ),
                  intl,
                )}
              </Value>
            </Box>
          </DetailBox>
        )}
        {country[COLUMNS.COUNTRIES.UN_REGION] !== '' && (
          <DetailBox>
            <Box>
              <Label>
                <FormattedMessage {...messages.un_region} />
              </Label>
            </Box>
            <Box>
              <Value>
                <FormattedMessage
                  {...rootMessages.un_regions[
                    country[COLUMNS.COUNTRIES.UN_REGION]
                  ]}
                />
              </Value>
            </Box>
          </DetailBox>
        )}
        {hasPopulation && (
          <DetailBox>
            <Box>
              <Label>
                <FormattedMessage {...messages.population} />
              </Label>
            </Box>
            <Box>
              <Value>
                <FormattedMessage
                  {...messages.populationValue}
                  values={prepPopulationValue(
                    population.value,
                    intl,
                    population.year,
                  )}
                />
              </Value>
            </Box>
          </DetailBox>
        )}
        {(hasCurrentGDP || hasPPPGDP) && (
          <DetailBox>
            <Box>
              <Label>
                <FormattedMessage {...messages.gdp} />
              </Label>
            </Box>
            {hasCurrentGDP && (
              <Box direction="row" align="center">
                <Text size="small">
                  <FormattedMessage
                    {...messages.gdpValue}
                    values={{
                      value: intl.formatNumber(roundScore(currentGDP.value, 0)),
                      year: currentGDP.year,
                      hint: intl.formatMessage(messages.gdpHint),
                    }}
                  />
                </Text>
                <Tooltip
                  iconSize="small"
                  text={intl.formatMessage(messages.gdpTooltip)}
                  inAside={inAside}
                />
              </Box>
            )}
            {hasPPPGDP && (
              <Box direction="row" align="center">
                <Text size="small">
                  <FormattedMessage
                    {...messages.gdpValue}
                    values={{
                      value: intl.formatNumber(roundScore(pppGDP.value, 0)),
                      year: pppGDP.year,
                      hint: intl.formatMessage(messages.gdpHintPPP),
                    }}
                  />
                </Text>
                <Tooltip
                  iconSize="small"
                  text={intl.formatMessage(messages.gdpTooltipPPP)}
                  inAside={inAside}
                />
              </Box>
            )}
          </DetailBox>
        )}
        <DetailBox>
          <Box>
            <Label>
              <FormattedMessage {...messages.income} />
            </Label>
          </Box>
          <Box>
            <Value>
              <FormattedMessage {...rootMessages.income[incomeCode]} />
            </Value>
          </Box>
        </DetailBox>
      </DetailSection>
      <DetailSection>
        <Accordion
          activeIndex={actives}
          onActive={newActive => setActive(newActive)}
        >
          <AccordionPanel
            header={
              <Box direction="row" gap="xsmall" align="center">
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                  >
                    <FormattedMessage {...messages.sectionHR} />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives.includes(0) && <Down size="small" />}
                  {actives.includes(0) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small' }} border="top">
              {countryCurrentTerm && (
                <DetailBox>
                  <Box>
                    <Label>
                      <FormattedMessage {...messages.hrcMembershipCurrent} />
                    </Label>
                  </Box>
                  <Box>
                    <Value>
                      <FormattedMessage
                        {...messages.hrcMembershipCurrentSince}
                        values={{
                          date: countryCurrentTerm[COLUMNS.HRC_TERMS.START],
                        }}
                      />
                    </Value>
                  </Box>
                </DetailBox>
              )}
              {countryPreviousTerms && countryPreviousTerms.length > 0 && (
                <DetailBox>
                  <Box>
                    <Label>
                      <FormattedMessage {...messages.hrcMembershipsPrevious} />
                    </Label>
                  </Box>
                  <Box>
                    {countryPreviousTerms &&
                      countryPreviousTerms.map(t => (
                        <Value key={t[COLUMNS.HRC_TERMS.ID]}>
                          {t[COLUMNS.HRC_TERMS.START]}
                          {` - `}
                          {t[COLUMNS.HRC_TERMS.END]}
                        </Value>
                      ))}
                  </Box>
                </DetailBox>
              )}
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.hrcInvite} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {qe(country[COLUMNS.COUNTRIES.HRC_INVITATION], 1) && (
                      <FormattedMessage {...messages.hrcInvite_true} />
                    )}
                    {!qe(country[COLUMNS.COUNTRIES.HRC_INVITATION], 1) && (
                      <FormattedMessage {...messages.hrcInvite_false} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.yourhrc_profile} />
                  </Label>
                </Box>
                <Box>
                  {country[COLUMNS.COUNTRIES.YOUR_HRC] && (
                    <a
                      href={intl.formatMessage(messages.yourhrc_profile_url, {
                        code: country[COLUMNS.COUNTRIES.YOUR_HRC],
                      })}
                      target="_blank"
                    >
                      <Value>
                        <FormattedMessage
                          {...rootMessages.countries[countryCode]}
                        />
                      </Value>
                    </a>
                  )}
                  {!country[COLUMNS.COUNTRIES.YOUR_HRC] && (
                    <Value>
                      <FormattedMessage {...messages.dataUnavailable} />
                    </Value>
                  )}
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.upr_next} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {country[COLUMNS.COUNTRIES.NEXT_UPR] && (
                      <span>{country[COLUMNS.COUNTRIES.NEXT_UPR]}</span>
                    )}
                    {!country[COLUMNS.COUNTRIES.NEXT_UPR] && (
                      <FormattedMessage {...messages.dataUnavailable} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.upr_last} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {country[COLUMNS.COUNTRIES.LAST_UPR] && (
                      <span>{country[COLUMNS.COUNTRIES.LAST_UPR]}</span>
                    )}
                    {!country[COLUMNS.COUNTRIES.LAST_UPR] && (
                      <FormattedMessage {...messages.dataUnavailable} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.treaties} />
                  </Label>
                </Box>
                <Box direction="row" gap="xxsmall">
                  {countryTreaties.map((t, i) => (
                    <Value key={t.key}>
                      {t.label}
                      {i < countryTreaties.length - 1 && `,`}
                    </Value>
                  ))}
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.has_npm} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {qe(country[COLUMNS.COUNTRIES.HAS_NPM], 1) && (
                      <FormattedMessage {...messages.has_npm_true} />
                    )}
                    {!qe(country[COLUMNS.COUNTRIES.HAS_NPM], 1) && (
                      <FormattedMessage {...messages.has_npm_false} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.has_npm} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {qe(country[COLUMNS.COUNTRIES.HAS_NPM], 1) && (
                      <FormattedMessage {...messages.has_npm_true} />
                    )}
                    {!qe(country[COLUMNS.COUNTRIES.HAS_NPM], 1) && (
                      <FormattedMessage {...messages.has_npm_false} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.visits_planned} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {country[COLUMNS.COUNTRIES.VISITS_PLANNED] || 0}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.visits_completed} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {country[COLUMNS.COUNTRIES.VISITS_COMPLETED] || 0}
                  </Value>
                </Box>
              </DetailBox>
            </Box>
          </AccordionPanel>
        </Accordion>
      </DetailSection>
      <DetailSection>
        <Accordion
          activeIndex={actives1}
          onActive={newActive => setActive1(newActive)}
        >
          <AccordionPanel
            header={
              <Box direction="row" gap="xsmall" align="center">
                <Box>
                  <Heading
                    responsive={false}
                    level={6}
                    margin={{ vertical: 'xsmall' }}
                  >
                    <FormattedMessage {...messages.sectionIndices} />
                  </Heading>
                </Box>
                <Box margin={{ left: 'auto' }}>
                  {!actives1.includes(0) && <Down size="small" />}
                  {actives1.includes(0) && <Up size="small" />}
                </Box>
              </Box>
            }
          >
            <Box pad={{ vertical: 'small' }} border="top">
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.index_rsf} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {country[COLUMNS.COUNTRIES.RSF] &&
                      roundScore(country[COLUMNS.COUNTRIES.RSF], 2)}
                    {!country[COLUMNS.COUNTRIES.RSF] && (
                      <FormattedMessage {...messages.dataUnavailable} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.index_ti} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {country[COLUMNS.COUNTRIES.TI] &&
                      roundScore(country[COLUMNS.COUNTRIES.TI], 2)}
                    {!country[COLUMNS.COUNTRIES.TI] && (
                      <FormattedMessage {...messages.dataUnavailable} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
              <DetailBox>
                <Box>
                  <Label>
                    <FormattedMessage {...messages.index_eiu} />
                  </Label>
                </Box>
                <Box>
                  <Value>
                    {country[COLUMNS.COUNTRIES.EIU] &&
                      roundScore(country[COLUMNS.COUNTRIES.EIU], 2)}
                    {!country[COLUMNS.COUNTRIES.EIU] && (
                      <FormattedMessage {...messages.dataUnavailable} />
                    )}
                  </Value>
                </Box>
              </DetailBox>
            </Box>
          </AccordionPanel>
        </Accordion>
      </DetailSection>
      {inAside && (
        <div>
          <ButtonHero onClick={() => onCountryClick(countryCode)}>
            <FormattedMessage
              {...messages.countryLink}
              values={{
                country: intl.formatMessage(
                  rootMessages.countries[countryCode],
                ),
              }}
            />
          </ButtonHero>
        </div>
      )}
      {!inAside && showFAQs && <FAQs questions={showFAQs} />}
    </ContainerBox>
  );
}

AboutCountryContainer.propTypes = {
  onCategoryClick: PropTypes.func,
  onCountryClick: PropTypes.func,
  onLoadData: PropTypes.func,
  showFAQs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  collapsible: PropTypes.bool,
  inAside: PropTypes.bool,
  countryCode: PropTypes.string,
  country: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  countriesGrammar: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  auxIndicators: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  currentGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  pppGDP: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  population: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  hrcTerms: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  country: (state, { countryCode }) => getCountry(state, countryCode),
  countriesGrammar: state => getCountriesGrammar(state),
  currentGDP: (state, { countryCode }) =>
    getLatestCountryCurrentGDP(state, countryCode),
  pppGDP: (state, { countryCode }) =>
    getLatestCountry2011PPPGDP(state, countryCode),
  population: (state, { countryCode }) =>
    getLatestCountryPopulation(state, countryCode),
  hrcTerms: state => getHRCTerms(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCountryClick: code => dispatch(selectCountry(code)),
    onLoadData: () =>
      DEPENDENCIES.forEach(key => dispatch(loadDataIfNeeded(key))),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(AboutCountryContainer));
