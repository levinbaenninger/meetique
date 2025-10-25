import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

const SECONDS_TO_MILLISECONDS = 1000;
const FIVE_SECONDS = 5;
const FIVE_SECONDS_IN_MILLISECONDS = FIVE_SECONDS * SECONDS_TO_MILLISECONDS;

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: FIVE_SECONDS_IN_MILLISECONDS,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
