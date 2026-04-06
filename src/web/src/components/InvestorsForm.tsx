import { useSubmitInvestorMutation } from '../app/api/submissionsApi';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  nextStep,
  previousStep,
  setFormMessage,
  setSubmissionFailure,
  setSubmissionResult,
  setSubmitting,
  toggleArrayValue,
  updateField,
} from '../features/forms/formsSlice';

const companyOptions = [
  'Technologies',
  'Industries',
  'Helix',
  'Underwater',
  'Exploration',
  'Labs',
  'Ventures',
  'Foundation',
];

function validateStep(step: number, draft: ReturnType<typeof useInvestorDraft>) {
  if (step === 0) {
    if (!draft.fullName || !draft.organization || !draft.email || !draft.investorType || !draft.region) {
      return 'Please complete the required investor profile fields before moving on.';
    }
  }

  if (step === 1) {
    if (
      draft.companyInterest.length === 0 ||
      !draft.interestProfile ||
      !draft.capitalRange ||
      !draft.timeHorizon ||
      !draft.preferredMode
    ) {
      return 'Please complete the investment profile fields before moving on.';
    }
  }

  if (step === 2) {
    if (!draft.thesis || !draft.valueAdd) {
      return 'Please share your thesis and value-add before submitting.';
    }
  }

  return null;
}

function useInvestorDraft() {
  return useAppSelector((state) => state.forms.investors.draft);
}

export function InvestorsForm() {
  const dispatch = useAppDispatch();
  const draft = useInvestorDraft();
  const { step, message, status, lastReceipt } = useAppSelector((state) => state.forms.investors);
  const [submitInvestor] = useSubmitInvestorMutation();

  const handleNext = async () => {
    const validationMessage = validateStep(step, draft);
    if (validationMessage) {
      dispatch(setFormMessage({ form: 'investors', message: validationMessage, status: 'failed' }));
      return;
    }

    if (step < 2) {
      dispatch(nextStep('investors'));
      return;
    }

    dispatch(setSubmitting('investors'));

    try {
      const receipt = await submitInvestor({
        ...draft,
        submittedAt: new Date().toISOString(),
        submittedFrom: window.location.href,
        host: window.location.hostname || 'local',
      }).unwrap();

      dispatch(
        setSubmissionResult({
          form: 'investors',
          receipt,
          message: 'Submission sent successfully. FrostAura will review it shortly.',
        }),
      );
    } catch (error) {
      const fallback = error instanceof Error ? error.message : 'Please try again shortly.';
      dispatch(
        setSubmissionFailure({
          form: 'investors',
          message: `Direct delivery failed. ${fallback}`,
        }),
      );
    }
  };

  return (
    <article className="form-card">
      <h3>Share your investment thesis in three steps.</h3>
      <p className="section-copy">
        FrostAura is designed for aligned, long-horizon capital and partners who strengthen the
        system beyond funding alone.
      </p>

      <div className="progress">
        {['1. Profile', '2. Fit', '3. Thesis'].map((label, index) => (
          <div key={label} className={`progress-step ${step === index ? 'active' : ''}`}>
            {label}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="form-step active">
          <div className="field-grid">
            <label className="field">
              <span>Full name</span>
              <input
                value={draft.fullName}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'fullName',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
            <label className="field">
              <span>Organization</span>
              <input
                value={draft.organization}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'organization',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
            <label className="field">
              <span>Email address</span>
              <input
                type="email"
                value={draft.email}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'email',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
            <label className="field">
              <span>Type</span>
              <select
                value={draft.investorType}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'investorType',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {[
                  'Family office',
                  'Angel or syndicate',
                  'Strategic corporate investor',
                  'Venture capital',
                  'Private capital / PE',
                  'Research / science partner',
                  'Philanthropic capital',
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="field full">
              <span>Region or primary geography</span>
              <input
                value={draft.region}
                placeholder="Example: South Africa, Europe, global"
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'region',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="form-step active">
          <div className="field">
            <span>Which FrostAura companies are most relevant to you?</span>
            <div className="choice-grid">
              {companyOptions.map((option) => (
                <label key={option} className="choice">
                  <input
                    type="checkbox"
                    checked={draft.companyInterest.includes(option)}
                    onChange={() =>
                      dispatch(
                        toggleArrayValue({
                          form: 'investors',
                          field: 'companyInterest',
                          value: option,
                        }),
                      )
                    }
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>Interest profile</span>
              <select
                value={draft.interestProfile}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'interestProfile',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {[
                  'Operating company growth',
                  'Frontier R&D exposure',
                  'Strategic partnership',
                  'Portfolio venture creation',
                  'Philanthropic / impact alignment',
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Capital range or resource scope</span>
              <select
                value={draft.capitalRange}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'capitalRange',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {[
                  'Below 250k USD equivalent',
                  '250k - 1M USD equivalent',
                  '1M - 5M USD equivalent',
                  '5M - 25M USD equivalent',
                  '25M+ USD equivalent',
                  'Non-capital strategic value only',
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Time horizon</span>
              <select
                value={draft.timeHorizon}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'timeHorizon',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {['Immediate', 'Within 6 months', 'Within 12 months', 'Exploratory / long horizon'].map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ),
                )}
              </select>
            </label>
            <label className="field">
              <span>Preferred mode</span>
              <select
                value={draft.preferredMode}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'investors',
                      field: 'preferredMode',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {[
                  'Capital only',
                  'Capital and strategic support',
                  'Partnership only',
                  'Research collaboration',
                ].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step active">
          <label className="field">
            <span>Why do you believe FrostAura is interesting?</span>
            <textarea
              value={draft.thesis}
              onChange={(event) =>
                dispatch(
                  updateField({
                    form: 'investors',
                    field: 'thesis',
                    value: event.target.value,
                  }),
                )
              }
            />
          </label>
          <label className="field">
            <span>How could you accelerate the system beyond capital?</span>
            <textarea
              value={draft.valueAdd}
              onChange={(event) =>
                dispatch(
                  updateField({
                    form: 'investors',
                    field: 'valueAdd',
                    value: event.target.value,
                  }),
                )
              }
            />
          </label>
          <label className="field">
            <span>Anything else we should know?</span>
            <textarea
              value={draft.extraNote}
              placeholder="Optional"
              onChange={(event) =>
                dispatch(
                  updateField({
                    form: 'investors',
                    field: 'extraNote',
                    value: event.target.value,
                  }),
                )
              }
            />
          </label>
          <p className="fineprint">
            This section is for aligned conversation only. Nothing on this page constitutes an
            offer to sell securities.
          </p>
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="ghost-button"
          disabled={step === 0 || status === 'submitting'}
          onClick={() => dispatch(previousStep('investors'))}
        >
          Back
        </button>
        <div className={`form-message ${status}`}>{message}</div>
        <button type="button" className="button" disabled={status === 'submitting'} onClick={handleNext}>
          {step === 2 ? 'Submit' : 'Next'}
        </button>
      </div>

      {lastReceipt && <p className="receipt-note">Reference: {lastReceipt.referenceId}</p>}
    </article>
  );
}
