import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";

const choice = ["yes", "no"];

function BasicInfo5({ prevData, data, setData, setStep, setLoading }) {

   const navigate = useNavigate();
   const { language } = useLanguage();

  // Medical state variables
  const [weigthAdmission, setWeightAdmission] = useState(null);
  const [weigthDischarge, setWeightDischarge] = useState(null);
  const [height, setHeight] = useState(null);
  const [sugar, setSugar] = useState(null);
  const [otherIssue, setOtherIssue] = useState(null);
  const [withdrawl, setWithdrawl] = useState(null);
  const [pastMedical, setPastMedical] = useState(null);
  const [presentMedical, setPresentMedical] = useState(null);
  const [chronicHealth, setChronicHealth] = useState(null);
  const [pastPsychatricProblem, setPastPsychatricProblem] = useState(null);
  const [presentPsychatricProblem, setPresentPsychatricProblem] = useState(null);
  const [previousHeadInjury, setPreviousHeadInjury] = useState(null);

  // Counselor section state variables
  const [childhoodDescription, setChildhoodDescription] = useState("");
  const [childhoodExperience, setChildhoodExperience] = useState("");
  const [behaviorProblems, setBehaviorProblems] = useState("");
  const [childhoodExperience2, setChildhoodExperience2] = useState("");
  const [educationAchievements, setEducationAchievements] = useState("");
  const [educationYears, setEducationYears] = useState("");
  const [extracurricularAchievements, setExtracurricularAchievements] = useState("");
  const [religiousBelief, setReligiousBelief] = useState("");
  const [psychologicalFactors, setPsychologicalFactors] = useState("");
  const [abstinencePeriod, setAbstinencePeriod] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [doctorClarification, setDoctorClarification] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");
  const [childhoodExperience1, setChildhoodExperience1] = useState("");

  const { id } = useParams();

  const submit = async () => {
    setLoading(true);

    // Collect all form data properly
    const counselorData = {
      childhood_description: childhoodDescription,
      childhood_experience: childhoodExperience,
      behavior_problems: behaviorProblems,
      childhood_experience_2: childhoodExperience2,
      education_achievements: educationAchievements,
      education_years: educationYears,
      extracurricular_achievements: extracurricularAchievements,
      religious_belief: religiousBelief,
      psychological_factors: psychologicalFactors,
      abstinence_period: abstinencePeriod,
      doctor_notes: doctorNotes,
      doctor_clarification: doctorClarification,
      follow_up_notes: followUpNotes,
      childhood_experience_1: childhoodExperience1,
    };

    const obj = {
      weight_while_admission_in_kg: weigthAdmission,
      weight_while_discharge_in_kg: weigthDischarge,
      height_in_ft: height,
      sugar_in_mg: sugar,
      other_issues: otherIssue,
      withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
      past_medical_problem: pastMedical,
      present_medical_problem: presentMedical,
      chronic_health_problem: chronicHealth,
      past_psychiatric_complication: pastPsychatricProblem,
      present_psychiatric_complication: presentPsychatricProblem,
      history_of_previous_head_injureies: previousHeadInjury,
      ...counselorData,
    };

    const newData = { ...data, ...obj };
    setData(newData);
    console.log("New Data : ", newData);

    //////////////////////Authentication Check//////////////////////

    const auth = localStorage.getItem("auth") || localStorage.getItem("facultyAuth");

    if (!auth) {
      toast.error(t('authenticationTokenNotFound', language));
      setLoading(false);
      navigate("/login");
      return;
    }

    // Clean the token (remove any extra spaces or quotes)
    const cleanToken = auth.replace(/['"]+/g, '').trim();

    console.log("Auth token:", cleanToken);
    console.log("Token length:", cleanToken.length);
    console.log("Token starts with:", cleanToken.substring(0, 20) + "...");

    const headers = {
      Authorization: `Bearer ${cleanToken}`,
      'Content-Type': 'application/json',
    };

    try {
       console.log("Sending request to:", ADD_PATIENT);
       console.log("Request headers:", headers);
       console.log("Request data keys:", Object.keys(newData));

       const datum = await axios.post(
         ADD_PATIENT,
         { obj: newData },
         { headers: headers }
       );

       if (datum) {
         toast.success(t('patientAddedSuccessfully', language));
         navigate("/faculty");
       }
     } catch (err) {
       console.error("Submit error:", err);
       console.error("Error response:", err.response);
       console.error("Error status:", err.response?.status);
       console.error("Error data:", err.response?.data);

       if (err.response?.status === 401) {
         toast.error(t('authenticationFailed', language));
         navigate("/login");
       } else if (err.response?.status === 400) {
         toast.error(`${t('badRequest', language)}: ${err.response?.data?.message || t('invalidData', language)}`);
       } else {
         toast.error(t('someErrorOccurred', language));
       }
     }

    ////////////////////END/////////////////////

    setLoading(false);
  };

  const nextStep = () => {
    const obj = {
      weight_while_admission_in_kg: weigthAdmission,
      weight_while_discharge_in_kg: weigthDischarge,
      height_in_ft: height,
      sugar_in_mg: sugar,
      other_issues: otherIssue,
      withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
      past_medical_problem: pastMedical,
      present_medical_problem: presentMedical,
      chronic_health_problem: chronicHealth,
      past_psychiatric_complication: pastPsychatricProblem,
      present_psychiatric_complication: presentPsychatricProblem,
      history_of_previous_head_injureies: previousHeadInjury,
    };

    setData({ ...data, ...obj });
  };

  const update = async () => {
    // setLoading(true);

    const obj = {
      weight_while_admission_in_kg: weigthAdmission,
      weight_while_discharge_in_kg: weigthDischarge,
      height_in_ft: height,
      sugar_in_mg: sugar,
      other_issues: otherIssue,
      withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
      past_medical_problem: pastMedical,
      present_medical_problem: presentMedical,
      chronic_health_problem: chronicHealth,
      past_psychiatric_complication: pastPsychatricProblem,
      present_psychiatric_complication: presentPsychatricProblem,
      history_of_previous_head_injureies: previousHeadInjury,
    };

    const newData = { ...data, ...obj };

    setData(newData);

    console.log("DATA1 : ", data);

    const auth = localStorage.getItem("auth") || localStorage.getItem("facultyAuth");

    if (!auth) {
      toast.error(t('authenticationTokenNotFound', language));
      navigate("/login");
      return;
    }

    // Clean the token (remove any extra spaces or quotes)
    const cleanAuth = auth.replace(/['"]+/g, '').trim();

    const headers = {
      Authorization: `Bearer ${cleanAuth}`,
    };

    try {
      const datum = await axios.put(
        ADD_PATIENT,
        { obj: data, id: id },
        { headers: headers }
      );

      if (datum) {
        // setLoading(false)
        toast.success(t('patientUpdatedSuccessfully', language));
        navigate("/faculty");
      }
    } catch (err) {
      // setLoading(false)

      toast.error(t('errorOccurred', language));
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      setWeightAdmission(data?.weight_while_admission_in_kg);
      setWeightDischarge(data?.weight_while_discharge_in_kg);
      setHeight(data?.height_in_ft);
      setSugar(data?.sugar_in_mg);
      setOtherIssue(data?.other_issues);
      setWithdrawl(
        data?.withdrawal_symptoms_experienced_when_the_patient_stopped
      );
      setPastMedical(data?.past_medical_problem);
      setPresentMedical(data?.present_medical_problem);
      setChronicHealth(data?.chronic_health_problem);
      setPastPsychatricProblem(data?.past_psychiatric_complication);
      setPresentPsychatricProblem(data?.present_psychiatric_complication);
      setPreviousHeadInjury(data?.history_of_previous_head_injureies);

      // Initialize counselor section data
      setChildhoodDescription(data?.childhood_description || "");
      setChildhoodExperience(data?.childhood_experience || "");
      setBehaviorProblems(data?.behavior_problems || "");
      setChildhoodExperience2(data?.childhood_experience_2 || "");
      setEducationAchievements(data?.education_achievements || "");
      setEducationYears(data?.education_years || "");
      setExtracurricularAchievements(data?.extracurricular_achievements || "");
      setReligiousBelief(data?.religious_belief || "");
      setPsychologicalFactors(data?.psychological_factors || "");
      setAbstinencePeriod(data?.abstinence_period || "");
      setDoctorNotes(data?.doctor_notes || "");
      setDoctorClarification(data?.doctor_clarification || "");
      setFollowUpNotes(data?.follow_up_notes || "");
      setChildhoodExperience1(data?.childhood_experience_1 || "");
    }
  }, []);

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">{t('counsellorSection', language)}</h2>
      </div>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <h5>
            {t('takeDetailedPedigree', language)}
          </h5>
          <textarea
            className="form-control"
            placeholder={t('enterDetailsPlaceholder', language)}
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
          ></textarea>
        </div>
      </div>

      <hr />

      <h3>{t('childhoodAndAdolescentHistory', language)}</h3>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('describeChildhoodTeenageYears', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterYearsPlaceholder', language)}
            value={childhoodDescription}
            onChange={(e) => setChildhoodDescription(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('didYouExperienceBefore15Years', language)}
          </label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setChildhoodExperience(e.target.value)}
            value={childhoodExperience}
          >
            <option>{t('selectOption', language)}</option>
            <option value={t('povertyOrSevereDebts', language)}>{t('povertyOrSevereDebts', language)}</option>
            <option value={t('earlyParentalLoss', language)}>{t('earlyParentalLoss', language)}</option>
            <option value={t('extraMaritalAffairsOfParents', language)}>{t('extraMaritalAffairsOfParents', language)}</option>
            <option value={t('brokenHomeOrSingleParenting', language)}>{t('brokenHomeOrSingleParenting', language)}</option>
            <option value={t('violence', language)}>{t('violence', language)}</option>
            <option value={t('sexuallyIssue', language)}>{t('sexuallyIssue', language)}</option>
            <option value={t('none', language)}>{t('none', language)}</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('behaviorProblemIdentifiedChildhoodAdolescence', language)}
          </label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setBehaviorProblems(e.target.value)}
            value={behaviorProblems}
          >
            <option>{t('selectOption', language)}</option>
            <option value={t('runningAwayFromHome', language)}>{t('runningAwayFromHome', language)}</option>
            <option value={t('frequentPhysicalFights', language)}>{t('frequentPhysicalFights', language)}</option>
            <option value={t('destructionOfProperty', language)}>{t('destructionOfProperty', language)}</option>
            <option value={t('stealing', language)}>{t('stealing', language)}</option>
            <option value={t('scholasticBackwardness', language)}>{t('scholasticBackwardness', language)}</option>
            <option value={t('experimentingWithDrugs', language)}>{t('experimentingWithDrugs', language)}</option>
            <option value={t('alcohol', language)}>{t('alcohol', language)}</option>
            <option value={t('gambling', language)}>{t('gambling', language)}</option>
            <option value={t('sexualIssues', language)}>{t('sexualIssues', language)}</option>
            <option value={t('anyOther', language)}>{t('anyOther', language)}</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('didYouExperienceBefore15Years', language)}
          </label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setChildhoodExperience2(e.target.value)}
            value={childhoodExperience2}
          >
            <option>{t('selectOption', language)}</option>
            <option value={t('povertyOrSevereDebts', language)}>{t('povertyOrSevereDebts', language)}</option>
            <option value={t('earlyParentalLoss', language)}>{t('earlyParentalLoss', language)}</option>
            <option value={t('extraMaritalAffairsOfParents', language)}>{t('extraMaritalAffairsOfParents', language)}</option>
            <option value={t('brokenHomeOrSingleParenting', language)}>{t('brokenHomeOrSingleParenting', language)}</option>
            <option value={t('violence', language)}>{t('violence', language)}</option>
            <option value={t('sexuallyIssue', language)}>{t('sexuallyIssue', language)}</option>
            <option value={t('none', language)}>{t('none', language)}</option>
          </select>
        </div>
      </div>

      <hr />

      <h3>{t('educationalHistory', language)}</h3>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('achievementsInEducation', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterAchievementsPlaceholder', language)}
            value={educationAchievements}
            onChange={(e) => setEducationAchievements(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('yearsOfEducation', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterYearsPlaceholder', language)}
            value={educationYears}
            onChange={(e) => setEducationYears(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('highAchieverExtracurricular', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterAchievementsPlaceholder', language)}
            value={extracurricularAchievements}
            onChange={(e) => setExtracurricularAchievements(e.target.value)}
          />
        </div>
      </div>

      <hr />

      <h3>{t('religiousBeliefsAndBehaviour', language)}</h3>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <label className="input-lebel">{t('areYouA', language)}</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setReligiousBelief(e.target.value)}
            value={religiousBelief}
          >
            <option>{t('selectOption', language)}</option>
            <option value={t('beliver', language)}>{t('beliver', language)}</option>
            <option value={t('nonBeliever', language)}>{t('nonBeliever', language)}</option>
            <option value={t('indifferent', language)}>{t('indifferent', language)}</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-12">
          <label className="input-lebel">
            {t('explorePsychologicalFactors', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterPsychologicalFactorPlaceholder', language)}
            value={psychologicalFactors}
            onChange={(e) => setPsychologicalFactors(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('maximumPeriodAbstinence', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('enterMaxPeriodAbstinencePlaceholder', language)}
            value={abstinencePeriod}
            onChange={(e) => setAbstinencePeriod(e.target.value)}
          />
        </div>
      </div>

      <hr />

      <h4>{t('keyPointsForDoctors', language)}</h4>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <textarea
            className="form-control"
            placeholder={t('enterDetailsPlaceholder', language)}
            value={doctorClarification}
            onChange={(e) => setDoctorClarification(e.target.value)}
          ></textarea>
        </div>
      </div>

      <h4>{t('keyPointsClarifyDoctors', language)}</h4>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <textarea
            className="form-control"
            placeholder={t('enterDetailsPlaceholder', language)}
            value={followUpNotes}
            onChange={(e) => setFollowUpNotes(e.target.value)}
          ></textarea>
        </div>
      </div>
      <br />
      <h4>{t('followUpNotesCounselors', language)}</h4>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <textarea
            className="form-control"
            placeholder={t('enterDetailsPlaceholder', language)}
          ></textarea>
        </div>
      </div>

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => setStep(4)}>
              {t('prevButton', language)}
            </button>

            {prevData ? (
              <button className="btn btn-primary" onClick={() => update()}>
                {t('updateButton', language)}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => submit()}>
                {t('submitButton', language)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo5;
