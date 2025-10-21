import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";

const Choice = ["Yes", "No"];

const FamilyHistoryOptions = [
  "alcoholism",
  "drug abuse",
  "psychiatric illness",
];

const withdrawlOptions = [
  "Sweating",
  "palpitation or feeling of one’s own heart beat with HR more than 100bpm",
  "Tremors",
  "Insomnia",
  "Fits",
  "Nausea",
  "Aches and Pains",
  "Anxiety",
  "Restlessness",
  "Transient visual or tactile",
  "auditoryhallucinations or illusions",
];

const pastMedicalProblemOptions = [
  "Haematemesis",
  " Jaundice",
  "Head Injury",
  " Seizure",
  "Accidents",
  " Abscesses",
  " Bleeding piles",
  "Skin problems",
  " Nerve related pains in extremities",
];

const presentMedicalProblemOptions = [
  "Haematemesis",
  " Jaundice",
  "Head Injury",
  " Seizure",
  "Accidents",
  " Abscesses",
  " Bleeding piles",
  "Skin problems",
  " Nerve related pains in extremities",
];

const chronicHealthProblemOptions = [
  "Diabetes",
  "Liver disorders",
  "Epilepsy",
  " Respiratory problem",
  "pulmonary TB",
  "Chronic bronchitis",
  "Bronchial Asthma",
  "Cardiac problems",
  "Infections",
];

const presentPsychatricComplicationOptions = [
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation or attempts",
  "Aggressive outbursts",
  "Hallucinations",
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation ",
  "Paranoid Ideas",
];

const pastPsychatricComplicationOptions = [
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation or attempts",
  "Aggressive outbursts",
  "Hallucinations",
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation",
  "Paranoid Ideas",
];

function BasicInfo2({ prevData, data, setData, setStep, setLoading }) {
  const { language } = useLanguage();
  const navigate = useNavigate();

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
  const [presentPsychatricProblem, setPresentPsychatricProblem] =
    useState(null);
  const [previousHeadInjury, setPreviousHeadInjury] = useState(null);
  const [allergyKnowledge, setAllergyKnowledge] = useState(null);
  const [familyHistory, setFamilyHistory] = useState(null);
  const [specificDrug, setSpecificDrug] = useState(null);
  const [psychiatricIllness, setPsychiatricIllness] = useState(null);
  const [incidentDescription, setIncidentDescription] = useState(null);
  const [incidentAction, setIncidentAction] = useState(null);

  const { id } = useParams();

  const submit = async () => {
    setLoading(true);
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

    const newData = { ...data, obj };

    setData(newData);
  };

  const nextStep = () => {
    console.log("Before : ", setData);
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

    console.log("After : ", setData);
    setStep(3);
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

    const auth = localStorage.getItem("facultyAuth");

    const headers = {
      Authorization: `Bearer ${auth}`,
    };

    try {
      const datum = await axios.put(
        ADD_PATIENT,
        { obj: data, id: id },
        { headers: headers }
      );

      if (datum) {
        // setLoading(false)
        toast.success("Patient Updated successfully");
        navigate("/faculty");
      }
    } catch (err) {
      // setLoading(false)

      toast.error("some error occured please try again");
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
    }
  }, []);

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">{t('medicalHistory', language)}</h2>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('weightAdmission', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('weight', language)}
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('weightDischarge', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('weight', language)}
            value={weigthDischarge}
            onChange={(e) => setWeightDischarge(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('height', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('height', language)}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('sugar', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('sugar', language)}
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('otherIssues', language)}</label>
          <input
            type="text"
            className="form-control"
            placeholder={t('otherIssues', language)}
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('withdrawalSymptoms', language)}</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setWithdrawl(e.target.value)}
            value={withdrawl}
          >
            <option>{t('selectOption', language)}</option>
            {withdrawlOptions &&
              withdrawlOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('pastMedicalProblem', language)}</label>
          <select
            class="form-select form-select-lg"
            value={pastMedical}
            onChange={(e) => setPastMedical(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {pastMedicalProblemOptions &&
              pastMedicalProblemOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('presentMedicalProblem', language)}</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={presentMedical}
            onChange={(e) => setPresentMedical(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {presentMedicalProblemOptions &&
              presentMedicalProblemOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('chronicHealthProblem', language)}</label>
          <select
            value={chronicHealth}
            class="form-select form-select-lg"
            onChange={(e) => setChronicHealth(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {chronicHealthProblemOptions &&
              chronicHealthProblemOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('pastPsychiatricComplication', language)}</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={pastPsychatricProblem}
            onChange={(e) => setPastPsychatricProblem(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {pastPsychatricComplicationOptions &&
              pastPsychatricComplicationOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('presentPsychiatricComplication', language)}</label>
          <select
            class="form-select form-select-lg"
            value={presentPsychatricProblem}
            onChange={(e) => setPresentPsychatricProblem(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {presentPsychatricComplicationOptions &&
              presentPsychatricComplicationOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('historyOfPreviousHeadInjuries', language)}</label>
          <select
            class="form-select form-select-lg"
            value={previousHeadInjury}
            onChange={(e) => setPreviousHeadInjury(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {Choice &&
              Choice.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('allergyKnowledge', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('specificDrug', language)}
            value={allergyKnowledge}
            onChange={(e) => setAllergyKnowledge(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">{t('familyHistory', language)}</label>
          <select
            class="form-select form-select-lg"
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
          >
            <option>{t('selectOption', language)}</option>
            {FamilyHistoryOptions &&
              FamilyHistoryOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            If any specV? (Who and Which type of drug)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter specific drug details"
            value={specificDrug}
            onChange={(e) => setSpecificDrug(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            {t('psychiatricIllness', language)}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder={t('psychiatricIllness', language)}
            value={psychiatricIllness}
            onChange={(e) => setPsychiatricIllness(e.target.value)}
          />
        </div>
      </div>

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => setStep(1)}>
              {t('previous', language)}
            </button>

            <button className="btn btn-primary" onClick={() => nextStep()}>
              {t('next', language)}
            </button>

            {/* {prevData ? (
              <button className="btn btn-primary" onClick={() => update()}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => submit()}>
                Submit
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo2;
