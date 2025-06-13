import { Accordion } from "react-bootstrap";
import { UserAuth } from "../Context/AuthContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { LuSquarePen, LuUserRound } from "react-icons/lu";
import { FaEyeSlash } from "react-icons/fa6";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import supabase from "../helpers/supabaseClient";
import { useTranslate } from "../helpers/Language/Translator";
import { SettingsContext } from "../Context/SettingsProvider";
import ChangeProfileModal from "./ChangeProfileModal";

const Informations = () => {
  const { userProfile, session } = UserAuth();
  const mUserProfile = useMemo(() => userProfile, [userProfile]);
  const t = useTranslate();
  const [phone, setPhone] = useState("");
  const { privacy, setPrivacy } = useContext(SettingsContext);
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("profiles")
      .update({ phone_number: phone })
      .eq("id", session.user.id);

    if (error) {
      console.error("Update Error:", error);
      alert("Failed to update phone number: " + error.message);
    } else {
      alert("Phone number updated successfully!");
    }
  };
  const handlePrivacy = () => {setPrivacy((prev) => !prev);};

  return (
    <div className="Information-profile text-center d-flex justify-content-center align-items-start h-100 ">
      <Accordion
        className="h-100 w-100 bg-custom "
        defaultActiveKey="1"
        flush={true}
      >
        <Accordion.Item className="bg-custom" eventKey="1">
          <Accordion.Header className="bg-custom">
            <LuUserRound className="bg-custom" />{" "}
            <span className=" ms-2 bg-custom">
              {t("informations.personal")}
            </span>
          </Accordion.Header>
          <Accordion.Body className="bg-custom p-3 ">
            <div className="d-flex flex-column gap-3 w-100 ">
              <div className="Wrapped-div d-flex gap-4 w-100 justify-content-center">
                <div className="position-relative w-100 ">
                  <input
                    className="Profile_input_fields w-100 h-100 rounded-2 text-end  px-3"
                    type="text"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={privacy ? "#####" : mUserProfile.display_name}
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    {t("informations.name")}{" "}
                  </div>
                </div>
                <div className="position-relative w-100">
                  <input
                    className=" Profile_input_fields w-100 h-100 rounded-2 text-end  px-3"
                    type="text"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={privacy ? "#####" : session.user.email}
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    {t("informations.email")}{" "}
                  </div>
                </div>
              </div>
              <div className=" Wrapped-div d-flex gap-4 w-100 justify-content-center">
                <div className="position-relative w-100">
                  <input
                    className="Profile_input_fields w-100 h-100 rounded-2 text-end  px-3"
                    type="text"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={privacy? "##-##-##": mUserProfile.DOB}
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    {t("informations.date")}
                  </div>
                </div>
                <div className="position-relative w-100">
                  <input
                    className="Profile_input_fields w-100 h-100 rounded-2 text-end  px-3"
                    type="text"
                    style={{ color: "lightgreen" }}
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={privacy ? "#####" : mUserProfile.phone_number}
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    {t("informations.phone")}
                  </div>
                  {mUserProfile.phone_number ? (
                    " "
                  ) : (
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="btn end-0 top-50 position-absolute translate-middle-y btn-light"
                    >
                      <LuSquarePen />
                    </button>
                  )}
                  <div
                    className="modal align-content-center modal-sm"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Telefon Numarası Ekleme
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <form onSubmit={handlePhoneSubmit}>
                          <div className="modal-body d-flex justify-content-center align-items-center gap-3">
                            <span className="fw-bold">+994</span>
                            <input
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value.split(" ").join(""));
                              }}
                              placeholder="5X XXX XX XX"
                              className="w-50 py-2"
                              type="tel"
                            />
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              {t("cancel")}
                            </button>
                            <button type="submit" className="btn btn-success">
                              {t("continue")}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-4 w-100 align-items-center justify-content-center">
                <button
                  onClick={handlePrivacy}
                  className="Privacy-button Profile_input_fields w-25 h-100 rounded-2 text-end text-center px-3 cur-pointer"
                >
                  <FaEyeSlash /> {t("informations.hideInfos")}{" "}
                </button>
                <ChangeProfileModal />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Security like password */}
        <Accordion.Item className="bg-custom" eventKey="2">
          <Accordion.Header className="bg-custom">
            <IoShieldCheckmarkOutline className="bg-custom" />
            <span className=" ms-2 bg-custom">
              {t("informations.security")}
            </span>
          </Accordion.Header>
          <Accordion.Body className="bg-custom">
            <div className="d-flex flex-column gap-3 w-100">
              <div className="Wrapped-div d-flex gap-4 w-100 justify-content-center">
                <div className="position-relative w-100">
                  <input
                    className="Profile_input_fields w-100 h-100 rounded-2 text-end "
                    style={{ paddingInlineEnd: "50px" }}
                    type="password"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={"password"}
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    {t("informations.password")}
                  </div>
                  <a href="/sifremi-unuttum">
                    <button
                      type="button"
                      className="btn end-0 top-50 position-absolute translate-middle-y btn-light"
                    >
                      <LuSquarePen />
                    </button>
                  </a>
                </div>

                <div className="position-relative w-100">
                  <ModalForRadio
                    typeOfModal="permission"
                    dontent={`sms`}
                    modalNum={2}
                  />

                  <input
                    className={`Profile_input_fields w-100 h-100 rounded-2 text-end ${
                      mUserProfile.user_settings.email_entry
                        ? "text-success"
                        : "text-danger"
                    }`}
                    type="text"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={
                      mUserProfile.user_settings.email_entry ? "Açık" : "Kapalı"
                    }
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    E-Posta Onaylı Geçiş:{" "}
                  </div>
                </div>
              </div>
              <div className="Wrapped-div d-flex gap-4 w-100 justify-content-center">
                <div className="position-relative w-100 ">
                  <ModalForRadio
                    typeOfModal="permission"
                    dontent={`email`}
                    modalNum={3}
                  />
                  <input
                    className={`Profile_input_fields w-100 h-100 rounded-2 text-end ${
                      mUserProfile.user_settings.sms_entry
                        ? "text-success"
                        : "text-danger"
                    }`}
                    type="text"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={
                      mUserProfile.user_settings.sms_entry ? "Açık" : "Kapalı"
                    }
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    SMS Onaylı Geçiş:
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Notification section*/}
        <Accordion.Item className="bg-custom" eventKey="3">
          <Accordion.Header className="bg-custom text-custom">
            <IoMdNotificationsOutline className="text-custom" />
            <span className="ms-2 text-custom">
              {t("informations.notification")}
            </span>
          </Accordion.Header>
          <Accordion.Body className="bg-custom">
            <div className="d-flex flex-column gap-3 w-100">
              <div className="d-flex gap-4 w-100 justify-content-center">
                <div className="position-relative w-100">
                  <ModalForRadio
                    typeOfModal="notify"
                    dontent={`eposta`}
                    modalNum={4}
                  />
                  <input
                    className={`Profile_input_fields w-100 h-100 rounded-2 text-end ${
                      mUserProfile.user_settings.sms_notification
                        ? "text-success"
                        : "text-danger"
                    }`}
                    type="text"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={
                      mUserProfile.user_settings.sms_notification
                        ? "Açık"
                        : "Kapalı"
                    }
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    SMS Bildirimler:{" "}
                  </div>
                </div>
                <div className="position-relative w-100 ">
                  <ModalForRadio
                    typeOfModal="notify"
                    dontent={`eposta`}
                    modalNum={5}
                  />
                  <input
                    className={`Profile_input_fields w-100 h-100 rounded-2 text-end ${
                      mUserProfile.user_settings.email_notifications
                        ? "text-success"
                        : "text-danger"
                    }`}
                    type="text"
                    readOnly
                    onFocus={(e) => (e.target.style.outline = "none")}
                    value={
                      mUserProfile.user_settings.email_notifications
                        ? "Açık"
                        : "Kapalı"
                    }
                  />
                  <div
                    className="PlaceHold position-absolute top-50 translate-middle-y text-body-tertiary"
                    style={{ left: "14px", fontSize: "12px" }}
                  >
                    E-Posta Bildirimleri:{" "}
                  </div>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

const ModalForRadio = React.memo((props) => {
  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${props.modalNum}`}
        className="btn end-0 top-50 position-absolute translate-middle-y btn-light"
      >
        <LuSquarePen />
      </button>
      <div
        className="modal align-content-center text-enter"
        id={`exampleModal${props.modalNum}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ minWidth: "30%" }}>
          <div className="modal-content p-0">
            <div className="modal-header px-3 py-2">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.dontent == "sms" ? "SMS" : "E-Posta"}{" "}
                {props.typeOfModal == "permission"
                  ? "Onaylı giriş"
                  : "Bildirimleri"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body py-3 px-3 d-flex flex-column justify-content-center align-items-center gap-3">
              <div className="text-start">
                {props.typeOfModal == "permission"
                  ? `Giriş yaparken güvenli olarak işaretlemediğiniz IP adreslerinden
                yapılan girişler  ${
                  props.dontent == "sms" ? "SMS" : "E-Posta"
                } ile doğrulansın mı?`
                  : `Bana özel kampanya ve fırsatların ${
                      props.dontent == "sms" ? "SMS" : "E-Posta"
                    } olarak gönderilmesini istiyorum.`}
              </div>
              <form className="d-flex flex-row w-100 justify-content-center align-items-center gap-4">
                <div
                  className="w-50 h-100 py-1  rounded-2 Privacy-button  justify-content-around"
                  style={{ color: "red" }}
                >
                  <label
                    className="d-flex align-items-center justify-content-around"
                    htmlFor={`E-postaHayir${props.modalNum}`}
                  >
                    <span className="fs-5">Kapalı</span>
                    <input
                      type="radio"
                      id={`E-postaHayir${props.modalNum}`}
                      name="emailPreference"
                      style={{ transform: "scale(1.4)", accentColor: "red" }}
                      defaultChecked
                    />
                  </label>
                </div>
                <div
                  className="w-50 py-1  Privacy-button rounded-2 "
                  style={{ color: "lightgreen" }}
                >
                  <label
                    className="d-flex align-items-center justify-content-around"
                    htmlFor={`E-postaEvet${props.modalNum + 10}`}
                  >
                    <span className="fs-5">Açık</span>
                    <input
                      type="radio"
                      id={`E-postaEvet${props.modalNum + 10}`}
                      name="emailPreference"
                      style={{
                        transform: "scale(1.4)",
                        accentColor: "lightgreen",
                      }}
                    />
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer ">
              <button
                type="submit"
                className="btn btn-info text-white fw-bold w-100"
              >
                Değiştir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Informations;
