import React, { useEffect, useState } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import supabase from "../../helpers/supabaseClient";
import Swal from "sweetalert2";
import { UserAuth } from "../../Context/AuthContext";
import { useTranslate } from "../../helpers/Language/Translator";

const SignUpSec = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verCode, setVerCode] = useState("");
  const t=useTranslate()
  const {signUp} = UserAuth()

  const resetInputFields = ()=>{
    setEmail("");
    setPassword("");
    setPasswordAgain("");
    setVerCode("");
    props.settingRandom(); 
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (password !== passwordAgain) {
      Swal.fire({
        title: 'Account could not created!',
        text: 'Passwords do not match!',
        icon: 'info',
        background: '#222631', // Custom dark background (optional)
        color: '#fff', // Text color for dark theme
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3085d6',
      });
      resetInputFields()
      return;
    }

    if (verCode !== props.random) {
      Swal.fire({
        title: 'Account could not created!',
        text: 'Verification code is wrong!',
        icon: 'info',
        background: '#222631', // Custom dark background (optional)
        color: '#fff', // Text color for dark theme
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3085d6',
      });
      resetInputFields()
      return;
    }

    const result = await signUp(email,password)
    
    if (result.success) {
    const user = result.data.user;
    const {data: userSettingsData, error:userSettingsError} = await supabase.from("user_settings").insert([{user_setting_id:user.id}]).select("id").single()
    if (userSettingsError) {
      console.error("Error inserting into user_settings:", userSettingsError);
      return;
    }
    
    const { profileError } = await supabase.from("profiles").insert([
      {
        id: user.id, 
        first_name: firstName,
        last_name: lastName,
        display_name: `${firstName} ${lastName}`,
        settings_id:userSettingsData.id 
      },
    ]);
    
    if (profileError || userSettingsError) {
      Swal.fire({
        title: 'Error occured while creating the account!',
        text: profileError.message,
        icon: 'error',
        background: '#222631', // Custom dark background (optional)
        color: '#fff', // Text color for dark theme
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3085d6',
      });
      resetInputFields()
      return;
    }
      Swal.fire({
        title: 'Account created succesfully!',
        text: 'Please, verify your account from your email',
        icon: 'success',
        background: '#222631', // Custom dark background (optional)
        color: '#fff', // Text color for dark theme
        confirmButtonText: 'Login',
        confirmButtonColor: '#3085d6',
      });
  
      props.settingAuthState(true);
      document.querySelector(".login-buton").classList.add("login-btn-active");
      document.querySelector(".sign-buton").classList.remove("login-btn-active");
      resetInputFields()
      
    }else{
      Swal.fire({
        title: 'Sign-up Error',
        text: result.error,
        icon: 'error',
        background: '#222631', // Custom dark background (optional)
        color: '#fff', // Text color for dark theme
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#3085d6',
      });
      resetInputFields()
      return;
    }

  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="login-form gap-3 mt-4 d-flex flex-column justify-content-center align-items-center"
      >
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder={t("auth.placeName")}
          required
          value={firstName}
          autoFocus
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder={t("auth.placeSur")}
          required
          value={lastName}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={t("auth.placeEmail")}
          value={email}
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder={t("auth.placePassw")}
          value={password}
          required
        />
        <input
          onChange={(e) => setPasswordAgain(e.target.value)}
          type="password"
          placeholder={t("auth.placePassAgain")}
          value={passwordAgain}
          required
        />
        <div className="guvenlik-arenasi d-flex gap-2 justify-content-center">
          <input
            onChange={(e) => setVerCode(e.target.value)}
            type="text"
            className="w-50"
            placeholder={t("auth.placeSec")}
            value={verCode}
            required
          />
          <div className="security-code d-flex justify-content-between align-items-center w-50">
            <div className="area-code w-100 text-center">{props.random}</div>
            <button
              onClick={() => {
                props.settingRandom();
              }}
              className="regenerate btn btn-info text-white"
            >
              <FaArrowRotateRight />
            </button>
          </div>
        </div>
        <div className="w-100  d-flex justify-content-start align-items-center">
          <input type="checkbox" style={{ width: 40 }} required />
          <span className="w-100" style={{ fontSize: 15 }}>
            <div>
              <a
                className=" text-decoration-underline"
                href="/kullanici-sozlesmesi#acik-riza-metni"
                target="_blank"
              >
                Açık Rıza Metni
              </a>{" "}
              ve{" "}
              <a
                className=" text-decoration-underline"
                href="/kullanici-sozlesmesi#aydinlatma-metni"
                target="_blank"
              >
                Aydınlatma Metni
              </a>{" "}
              şartlarını okudum kabul ediyorum.
            </div>
          </span>
        </div>
        <div className="w-100  d-flex justify-content-start align-items-center">
          <input type="checkbox" style={{ width: 40 }} />
          <span className="w-100" style={{ fontSize: 15 }}>
            <div>
              {t("auth.services")}
            </div>
          </span>
        </div>
        <button
          className=" w-100 btn text-white login-btn-active"
          style={{ padding: "8px" }}
        >
          {t("auth.signUp")}
        </button>
      </form>
      <div className="mb-3 mt-2">
        {t("auth.agree")}
      </div>
    </>
  );
};

export default SignUpSec;
