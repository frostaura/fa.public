import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  CareerSubmissionPayload,
  InvestorSubmissionPayload,
  SubmissionReceipt,
} from '../../types/forms';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

export const submissionsApi = createApi({
  reducerPath: 'submissionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    submitCareer: builder.mutation<SubmissionReceipt, CareerSubmissionPayload>({
      query: (body) => ({
        url: '/careers/submissions',
        method: 'POST',
        body,
      }),
    }),
    submitInvestor: builder.mutation<SubmissionReceipt, InvestorSubmissionPayload>({
      query: (body) => ({
        url: '/investors/submissions',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubmitCareerMutation, useSubmitInvestorMutation } = submissionsApi;
