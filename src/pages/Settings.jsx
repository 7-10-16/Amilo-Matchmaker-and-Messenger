import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Settings = () => {
const { t } = useTranslation(["settings"]);

  return (
    <div className='home' style={{overflow: "scroll"}}>
      <div className="container flex-container" style={{overflow: "scroll"}}>
        <div className='title settingstxt'>{t("title")}</div>
        <div className='flex-item settingstxt'>{t("account")}</div>
        <Link className='flex-item settingstxt' to="/Profile">{t("profile")}</Link>
        <div className='flex-item settingstxt'>{t("privacy")}</div>
        <div className='flex-item'></div>
        <Link className='flex-item settingstxt' to="/Theme">{t("theme")}</Link>
        <div className='flex-item settingstxt'>{t("accessibility")}</div>
        <div className='flex-item settingstxt'>{t("language")}</div>
        <div className='flex-item'></div>
        <div onClick={()=>signOut(auth)} className='flex-item settingstxt logout'>{t("logout")}</div>
        <Link to="/">
          <div className='close'>
            <p className='close-text'>🏠</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
