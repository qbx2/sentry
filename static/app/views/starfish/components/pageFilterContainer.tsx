import PageFiltersContainer from 'sentry/components/organizations/pageFilters/container';
import {useLocation} from 'sentry/utils/useLocation';
import usePageFilters from 'sentry/utils/usePageFilters';
import useRouter from 'sentry/utils/useRouter';
import {getDateFilters} from 'sentry/views/starfish/utils/getDateFilters';

export const MAXIMUM_DATE_RANGE = 7;
export const DEFAULT_STATS_PERIOD = '24h';

function StarfishPageFilterContainer(props: {children: React.ReactNode}) {
  const router = useRouter();
  const location = useLocation();
  const {selection} = usePageFilters();
  const datetime = selection.datetime;

  const {endTime, startTime} = getDateFilters(selection);
  if (endTime.diff(startTime, 'days') > MAXIMUM_DATE_RANGE) {
    datetime.period = DEFAULT_STATS_PERIOD;
    datetime.start = null;
    datetime.end = null;
    router.replace({
      pathname: location.pathname,
      query: {
        ...location.query,
        statsPeriod: DEFAULT_STATS_PERIOD,
        start: null,
        end: null,
      },
    });
  }

  return <PageFiltersContainer>{props.children}</PageFiltersContainer>;
}

export default StarfishPageFilterContainer;
