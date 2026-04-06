import {
  careerTrackOptions,
  companyInterestOptions,
} from '../content/siteContent';
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
import { useSubmitCareerMutation } from '../app/api/submissionsApi';

const adjacentOptions = [
  'Technologies',
  'Industries',
  'Helix',
  'Underwater',
  'Exploration',
  'Labs',
  'Ventures',
  'Foundation',
];

function validateStep(step: number, draft: ReturnType<typeof useCareerDraft>) {
  if (step === 0) {
    if (!draft.primaryCompanyInterest || !draft.roleTrack || !draft.availabilityWindow || !draft.location) {
      return 'Please complete the required focus fields before moving on.';
    }
  }

  if (step === 1) {
    if (!draft.fullName || !draft.email || !draft.recentRole) {
      return 'Please complete your profile details before moving on.';
    }
  }

  if (step === 2) {
    if (!draft.highestLeverageContribution || !draft.proofOfWork) {
      return 'Please add your contribution summary and proof of work.';
    }
  }

  return null;
}

function useCareerDraft() {
  return useAppSelector((state) => state.forms.careers.draft);
}

export function CareersForm() {
  const dispatch = useAppDispatch();
  const draft = useCareerDraft();
  const { step, message, status, lastReceipt } = useAppSelector((state) => state.forms.careers);
  const [submitCareer] = useSubmitCareerMutation();

  const handleNext = async () => {
    const validationMessage = validateStep(step, draft);
    if (validationMessage) {
      dispatch(setFormMessage({ form: 'careers', message: validationMessage, status: 'failed' }));
      return;
    }

    if (step < 2) {
      dispatch(nextStep('careers'));
      return;
    }

    dispatch(setSubmitting('careers'));

    try {
      const receipt = await submitCareer({
        ...draft,
        submittedAt: new Date().toISOString(),
        submittedFrom: window.location.href,
        host: window.location.hostname || 'local',
      }).unwrap();

      dispatch(
        setSubmissionResult({
          form: 'careers',
          receipt,
          message: 'Submission sent successfully. FrostAura will review it shortly.',
        }),
      );
    } catch (error) {
      const fallback = error instanceof Error ? error.message : 'Please try again shortly.';
      dispatch(
        setSubmissionFailure({
          form: 'careers',
          message: `Direct delivery failed. ${fallback}`,
        }),
      );
    }
  };

  return (
    <article className="form-card">
      <h3>Introduce yourself in three short steps.</h3>
      <p className="section-copy">
        Share where you create the most leverage, the hardest things you have built or led, and
        how you would strengthen FrostAura.
      </p>

      <div className="progress">
        {['1. Focus', '2. Profile', '3. Signal'].map((label, index) => (
          <div key={label} className={`progress-step ${step === index ? 'active' : ''}`}>
            {label}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="form-step active">
          <div className="field-grid">
            <label className="field">
              <span>Which company interests you most?</span>
              <select
                value={draft.primaryCompanyInterest}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'primaryCompanyInterest',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {companyInterestOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>What track best describes you?</span>
              <select
                value={draft.roleTrack}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'roleTrack',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {careerTrackOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Availability window</span>
              <select
                value={draft.availabilityWindow}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'availabilityWindow',
                      value: event.target.value,
                    }),
                  )
                }
              >
                <option value="">Select one</option>
                {['Immediately', 'Within 30 days', 'Within 90 days', 'Exploratory only'].map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="field">
              <span>Where are you based?</span>
              <input
                value={draft.location}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'location',
                      value: event.target.value,
                    }),
                  )
                }
                placeholder="City, country"
              />
            </label>
          </div>

          <div className="field">
            <span>Where else could you add value?</span>
            <div className="choice-grid">
              {adjacentOptions.map((option) => (
                <label key={option} className="choice">
                  <input
                    type="checkbox"
                    checked={draft.adjacentCompanyInterest.includes(option)}
                    onChange={() =>
                      dispatch(
                        toggleArrayValue({
                          form: 'careers',
                          field: 'adjacentCompanyInterest',
                          value: option,
                        }),
                      )
                    }
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <p className="field-note">
              Optional, but useful if your work naturally spans more than one FrostAura company.
            </p>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="form-step active">
          <div className="field-grid">
            <label className="field">
              <span>Full name</span>
              <input
                value={draft.fullName}
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'fullName',
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
                      form: 'careers',
                      field: 'email',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
            <label className="field">
              <span>LinkedIn or website</span>
              <input
                value={draft.website}
                placeholder="https://"
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'website',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
            <label className="field">
              <span>Portfolio, GitHub, or publications</span>
              <input
                value={draft.portfolio}
                placeholder="https://"
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'portfolio',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
            <label className="field full">
              <span>Most senior role held recently</span>
              <input
                value={draft.recentRole}
                placeholder="Example: Principal Platform Engineer"
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'recentRole',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
            <label className="field full">
              <span>Resume or profile link</span>
              <input
                value={draft.resumeLink}
                placeholder="https://"
                onChange={(event) =>
                  dispatch(
                    updateField({
                      form: 'careers',
                      field: 'resumeLink',
                      value: event.target.value,
                    }),
                  )
                }
              />
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step active">
          <label className="field">
            <span>What is the highest-leverage thing you would help FrostAura build?</span>
            <textarea
              value={draft.highestLeverageContribution}
              onChange={(event) =>
                dispatch(
                  updateField({
                    form: 'careers',
                    field: 'highestLeverageContribution',
                    value: event.target.value,
                  }),
                )
              }
            />
          </label>
          <label className="field">
            <span>Tell us about one hard system, team, or mission you have already delivered.</span>
            <textarea
              value={draft.proofOfWork}
              onChange={(event) =>
                dispatch(
                  updateField({
                    form: 'careers',
                    field: 'proofOfWork',
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
                    form: 'careers',
                    field: 'extraNote',
                    value: event.target.value,
                  }),
                )
              }
            />
          </label>
          <p className="fineprint">
            By submitting, you consent to FrostAura contacting you about relevant roles.
          </p>
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="ghost-button"
          disabled={step === 0 || status === 'submitting'}
          onClick={() => dispatch(previousStep('careers'))}
        >
          Back
        </button>
        <div className={`form-message ${status}`}>{message}</div>
        <button type="button" className="button" disabled={status === 'submitting'} onClick={handleNext}>
          {step === 2 ? 'Submit' : 'Next'}
        </button>
      </div>

      {lastReceipt && (
        <p className="receipt-note">Reference: {lastReceipt.referenceId}</p>
      )}
    </article>
  );
}
