import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs';

import { DEFAULT_PAGE } from '@/constants';
import { meetingStatus } from '@/modules/meetings/types';

export const useMeetingsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    agentId: parseAsString.withDefault(''),
    status: parseAsStringLiteral(meetingStatus),
  });
};
