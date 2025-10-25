import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";


const choice = [
    "yes",
    "no"
]


function BasicInfo4({ prevData, data, setData, setStep, setLoading }) {

    const navigate = useNavigate();
    const { language } = useLanguage();

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
    const [incidentDescription, setIncidentDescription] = useState(null);
    const [incidentAction, setIncidentAction] = useState(null);

    // Treatment section state variables
    const [hospitalName, setHospitalName] = useState(null);
    const [treatmentYear, setTreatmentYear] = useState(null);
    const [treatmentPeriod, setTreatmentPeriod] = useState(null);
    const [soberPeriod, setSoberPeriod] = useState(null);
    const [treatmentRemarks, setTreatmentRemarks] = useState(null);
    const [relapseReason, setRelapseReason] = useState(null);

    const { id } = useParams();

    const submit = async () => {

        setLoading(true)
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

        const newData = { ...data, obj }

        setData(newData);


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
        setStep(5);
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

        console.log(data);

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
            setWeightDischarge(data?.weight_while_admission_in_kg);
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
                <h2 className="w-100 text-center my-4">{t('treatment', language)}</h2>
            </div>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('anyUntowardIncident', language)}</label>

                    <select
                        class="form-select form-select-lg"
                        onChange={(e) => setWithdrawl(e.target.value)}
                        value={withdrawl}
                    >
                        <option>{t('selectOption', language)}</option>
                        {choice &&
                            choice.map((data, key) => {
                                return (
                                    <option key={key} value={t(data, language)}>
                                        {t(data, language)}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                     <label className="input-lebel">{t('ifYesDescribeIncident', language)}</label>
                     <input
                         type="text"
                         className="form-control"
                         placeholder={t('enterIncidentPlaceholder', language)}
                         value={incidentDescription}
                         onChange={(e) => setIncidentDescription(e.target.value)}
                     />

                 </div>
             </div>

             <div className="row">

                 <div className="col-sm-12 mb-3 col-lg-6">
                     <label className="input-lebel">{t('actionTaken', language)}</label>
                     <input
                         type="text"
                         className="form-control"
                         placeholder={t('enterActionPlaceholder', language)}
                         value={incidentAction}
                         onChange={(e) => setIncidentAction(e.target.value)}
                     />

                 </div>
            </div>


            <h4>{t('treatmentsReceivedInOtherCentres', language)}</h4>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('nameOfHospital', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterNamePlaceholder', language)}
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                    />

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('yearOfTreatment', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterYearPlaceholder', language)}
                        value={treatmentYear}
                        onChange={(e) => setTreatmentYear(e.target.value)}
                    />

                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('periodOfTreatment', language)}</label>
                    <select
                        class="form-select form-select-lg"
                        onChange={(e) => setTreatmentPeriod(e.target.value)}
                        value={treatmentPeriod}
                    >
                        <option>{t('selectOption', language)}</option>
                        <option value={t('oneMonth', language)}>{t('oneMonth', language)}</option>
                        <option value={t('twoMonth', language)}>{t('twoMonth', language)}</option>
                        <option value={t('threeMonth', language)}>{t('threeMonth', language)}</option>
                        <option value={t('fourMonth', language)}>{t('fourMonth', language)}</option>
                        <option value={t('fiveMonth', language)}>{t('fiveMonth', language)}</option>
                        <option value={t('sixMonth', language)}>{t('sixMonth', language)}</option>

                    </select>

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('periodOfSober', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterPeriodPlaceholder', language)}
                        value={soberPeriod}
                        onChange={(e) => setSoberPeriod(e.target.value)}
                    />

                </div>
            </div>

            <div className="row">

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('remarks', language)}</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('enterRemarksPlaceholder', language)}
                        value={treatmentRemarks}
                        onChange={(e) => setTreatmentRemarks(e.target.value)}
                    />

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">{t('reasonForRelapse', language)}</label>
                    <textarea
                        className="form-control"
                        placeholder={t('enterReasonForRelapsePlaceholder', language)}
                        value={relapseReason}
                        onChange={(e) => setRelapseReason(e.target.value)}
                    ></textarea>

                </div>
            </div>



            <div className="row w-100 me-auto ml-auto">
                <div className="col-12">
                    <div className="form_buttons">
                        <button className="btn btn-primary" onClick={() => setStep(3)}>
                            {t('prevButton', language)}
                        </button>

                        <button className="btn btn-primary" onClick={() => nextStep()}>
                            {t('nextButton', language)}
                        </button>


                        {/* {prevData ? (
                          <button className="btn btn-primary" onClick={() => update()}>
                            {t('updateButton', language)}
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => submit()}>
                            {t('submitButton', language)}
                          </button>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicInfo4;
