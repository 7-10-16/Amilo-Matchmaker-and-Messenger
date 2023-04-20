import React, { useState, useContext, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const INTERESTS_OPTIONS = [
  "Cooking",
  "Music",
  "Reading",
  "Sports",
  "Travel",
  "Photography",
  "Art",
  "Fashion",
  "Film",
  "Technology",
  "Gardening",
  "Hiking",
  "Dancing",
  "Chatting",
  "Sociology",
  "Writing",
  "Gaming",
  "History",
  "Science",
  "Languages"
];

const COUNTRY_OPTIONS = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic (CAR)",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Democratic Republic of the Congo",
  "Republic of the Congo",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste (East Timor)",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (UAE)",
  "United Kingdom (UK)",
  "United States of America (USA)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
  ];

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [interests, setInterests] = useState(
    Array(5).fill(INTERESTS_OPTIONS[0])
  );
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [bio, setBio] = useState("");
  const { t, i18n } = useTranslation("profile");

  const handleInterestChange = (index, value) => {
    const newInterests = [...interests];
    newInterests[index] = value;
    setInterests(newInterests);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRef = doc(db, "users", currentUser.uid);
    try {
      await setDoc(userRef, { interests, country, bio }, { merge: true });
      alert(t("profileUpdatedSuccessfully"));
    } catch (error) {
      console.error(error);
      alert(t("errorUpdatingProfile"));
    }
  };

const handleLanguageChange = (e) => {
  const lang = e.target.value;
  i18n.changeLanguage(lang);
  localStorage.setItem("lang", lang);
};

useEffect(() => {
  const lang = localStorage.getItem("lang");
  if (lang) {
    i18n.changeLanguage(lang);
  }
}, [i18n]);



  return (
    <div className="homeP">
      <div className="containerP">
        <div className="prof-title">
          <img className="pfp" src={currentUser.photoURL} alt="" />
          <h2>{currentUser.displayName}</h2>
        </div>
        <div className="interests-form">
          <form onSubmit={handleSubmit}>
            <label>
              {t("interests")}:
              {interests.map((interest, index) => (
                <select
                  key={index}
                  value={interest}
                  onChange={(e) =>
                    handleInterestChange(index, e.target.value)
                  }
                >
                  {INTERESTS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ))}
            </label>

            <label>
              {t("country")}:
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {COUNTRY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="bio-form">
              {t("bio")}:
              <input
                type="text"
                value={bio}
                placeholder={t("bioPlaceholder")}
                onChange={(e) => setBio(e.target.value)}
              />
            </label>

            <div className="language-form">
              <label>
                {t("language")}:
                <select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">{t("English")}</option>
                  <option value="es">{t("Español")}</option>
                  <option value="fr">{t("Francais")}</option>
                  <option value="fi">{t("Suomi")}</option>
                </select>
              </label>
            </div>
          <button type="submit">{t("saveProfile")}</button>
           <Link to="/"><button type="submit">{t("Home")}</button></Link>
        </form>

        </div>
      </div>
    </div>

  );
};

export default UserProfile;
