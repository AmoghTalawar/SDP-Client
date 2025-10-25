import axios from "axios";
import React, { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { GET_FACULTY, HEADERS } from "../../utils/apiConstant";
import FacultyModal from "../Modal/FacultyModal";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";

function Category({ setLoading, faculty, setTrigger }) {
  const [category, setCategory] = useState();
  // const [trigger, setTrigger] = useState()
  const [data, setData] = useState();
  const [translatedFaculty, setTranslatedFaculty] = useState(null);

  const auth = localStorage.getItem("auth");
  const { language } = useLanguage();

  // Function to translate text using Google Translate API
  const translateText = async (text, targetLang) => {
    if (!text) return text;
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await response.json();
      return data[0][0][0];
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  // const getData = async () => {
  //     setLoading(true)
  //     await axios.get(GET_FACULTY, {headers: headers})
  //         .then(res => {
  //             localStorage.setItem("faculty", res.data.users);
  //             setCategory(res.data.users)
  //         })
  //         .catch(err => {
  //             console.log(err)
  //         })
  //     setLoading(false)

  // }

  // useEffect(() => {

  //     getData();

  // }, [trigger])

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  // Translate faculty data when language is Kannada
  useEffect(() => {
    if (language === 'kn' && faculty && faculty.length > 0) {
      const translateData = async () => {
        const translated = await Promise.all(
          faculty.map(async (f) => {
            const translatedName = await translateText(f.name, 'kn');
            const translatedRole = await translateText(f.role, 'kn');
            const translatedEmail = await translateText(f.email, 'kn');
            return {
              ...f,
              translatedName,
              translatedRole,
              translatedEmail
            };
          })
        );
        setTranslatedFaculty(translated);
      };
      translateData();
    } else {
      setTranslatedFaculty(null);
    }
  }, [language, faculty]);

  return (
    <div className="content">
      <FacultyModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        setTrigger={setTrigger}
      />
      <div className="header">
        <h4>{t('availableCounsellors', language)}</h4>
        <button className="add-btn" onClick={openModal}>
          {t('addCounsellor', language)}
        </button>
      </div>

      <div className="table-div">
        <table class="table">
          <thead className="table-header">
            <tr>
              <th scope="col">{t('sno', language)}</th>
              <th scope="col">{t('name', language)}</th>
              <th scope="col">{t('role', language)}</th>
              <th scope="col">{t('email', language)}</th>
              <th scope="col">{t('password', language)}</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {faculty
              ? faculty.map((data, key) => {
                  const translatedData = translatedFaculty?.find(tf => tf._id === data._id) || data;
                  if (data.role !== "admin")
                    return (
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>
                          <p>{translatedData.translatedName || data.name}</p>
                        </td>
                        <td>
                          <p>{translatedData.translatedRole || data.role}</p>
                        </td>
                        <td>
                          <p>{translatedData.translatedEmail || data.email}</p>
                        </td>
                        <td>
                          <p>***********</p>
                        </td>
                        <td>
                          <button
                            className="edit-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              setData(data);
                              openModal();
                            }}
                          >
                            <i class="bi bi-pencil-square"></i>
                          </button>
                        </td>
                      </tr>
                    );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
