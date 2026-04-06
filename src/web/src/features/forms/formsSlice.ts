import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  CareerSubmissionPayload,
  InvestorSubmissionPayload,
  SubmissionReceipt,
} from '../../types/forms';

type FormName = 'careers' | 'investors';
type Status = 'idle' | 'submitting' | 'succeeded' | 'failed';

interface ManagedFormState<TDraft> {
  draft: TDraft;
  step: number;
  status: Status;
  message: string | null;
  lastReceipt: SubmissionReceipt | null;
}

interface FormsState {
  careers: ManagedFormState<CareerSubmissionPayload>;
  investors: ManagedFormState<InvestorSubmissionPayload>;
}

const emptyCareerDraft: CareerSubmissionPayload = {
  primaryCompanyInterest: '',
  roleTrack: '',
  availabilityWindow: '',
  location: '',
  adjacentCompanyInterest: [],
  fullName: '',
  email: '',
  website: '',
  portfolio: '',
  recentRole: '',
  resumeLink: '',
  highestLeverageContribution: '',
  proofOfWork: '',
  extraNote: '',
};

const emptyInvestorDraft: InvestorSubmissionPayload = {
  fullName: '',
  organization: '',
  email: '',
  investorType: '',
  region: '',
  companyInterest: [],
  interestProfile: '',
  capitalRange: '',
  timeHorizon: '',
  preferredMode: '',
  thesis: '',
  valueAdd: '',
  extraNote: '',
};

const initialState: FormsState = {
  careers: {
    draft: emptyCareerDraft,
    step: 0,
    status: 'idle',
    message: null,
    lastReceipt: null,
  },
  investors: {
    draft: emptyInvestorDraft,
    step: 0,
    status: 'idle',
    message: null,
    lastReceipt: null,
  },
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ form: FormName; field: string; value: string }>,
    ) => {
      const { form, field, value } = action.payload;
      const target = state[form].draft as Record<string, unknown>;
      target[field] = value;
    },
    toggleArrayValue: (
      state,
      action: PayloadAction<{ form: FormName; field: string; value: string }>,
    ) => {
      const { form, field, value } = action.payload;
      const target = state[form].draft as Record<string, unknown>;
      const current = Array.isArray(target[field]) ? (target[field] as string[]) : [];
      target[field] = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
    },
    nextStep: (state, action: PayloadAction<FormName>) => {
      state[action.payload].step += 1;
      state[action.payload].message = null;
    },
    previousStep: (state, action: PayloadAction<FormName>) => {
      state[action.payload].step = Math.max(0, state[action.payload].step - 1);
      state[action.payload].message = null;
    },
    setFormMessage: (
      state,
      action: PayloadAction<{ form: FormName; message: string | null; status?: Status }>,
    ) => {
      state[action.payload.form].message = action.payload.message;
      if (action.payload.status) {
        state[action.payload.form].status = action.payload.status;
      }
    },
    setSubmitting: (state, action: PayloadAction<FormName>) => {
      state[action.payload].status = 'submitting';
      state[action.payload].message = 'Sending your submission...';
    },
    setSubmissionResult: (
      state,
      action: PayloadAction<{
        form: FormName;
        receipt: SubmissionReceipt;
        message: string;
      }>,
    ) => {
      state[action.payload.form].status = 'succeeded';
      state[action.payload.form].message = action.payload.message;
      state[action.payload.form].lastReceipt = action.payload.receipt;
      state[action.payload.form].step = 0;
      state[action.payload.form].draft =
        action.payload.form === 'careers' ? { ...emptyCareerDraft } : { ...emptyInvestorDraft };
    },
    setSubmissionFailure: (
      state,
      action: PayloadAction<{ form: FormName; message: string }>,
    ) => {
      state[action.payload.form].status = 'failed';
      state[action.payload.form].message = action.payload.message;
    },
  },
});

export const {
  nextStep,
  previousStep,
  setFormMessage,
  setSubmissionFailure,
  setSubmissionResult,
  setSubmitting,
  toggleArrayValue,
  updateField,
} = formsSlice.actions;
export default formsSlice.reducer;
