import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

import { DEFAULT_PAGE } from '@/constants';

export const agentsFiltersParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
};

export const loadAgentsFiltersParams = createLoader(agentsFiltersParams);
