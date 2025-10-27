import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import { DEFAULT_PAGE } from "@/constants";

export const useAgentsFilters = () =>
  useQueryStates({
    search: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
  });
