import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

import { DEFAULT_PAGE } from "@/constants";
import { meetingStatus } from "@/modules/meetings/types";

export const meetingsFiltersParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  agentId: parseAsString.withDefault(""),
  status: parseAsStringLiteral(meetingStatus),
};

export const loadMeetingsFiltersParams = createLoader(meetingsFiltersParams);
