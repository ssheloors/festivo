import {
  QueryObserverSuccessResult,
  UseQueryResult,
} from "@tanstack/react-query";

import { PayloadConfig } from "@/utils/payload-client";

export const user: PayloadConfig["collections"]["users"] = {
  id: 99,
  name: "Test User",
  email: "test@example.com",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const requestResult: QueryObserverSuccessResult<
  PayloadConfig["collections"]["users"] | null
> = {
  data: user,
  error: null,
  isError: false,
  isPending: false,
  isLoading: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  status: "success",
  dataUpdatedAt: new Date().getMilliseconds(),
  isStale: false,
  isPaused: false,
  isFetched: true,
  isFetching: false,
  fetchStatus: "idle",
  refetch: async () => requestResult,
  promise: Promise.resolve(user),
  failureCount: 0,
  isRefetching: false,
  failureReason: null,
  errorUpdatedAt: 0,
  errorUpdateCount: 0,
  isInitialLoading: false,
  isPlaceholderData: false,
  isFetchedAfterMount: false,
};

export function useUser(): UseQueryResult<
  PayloadConfig["collections"]["users"] | null
> {
  return requestResult;
}
