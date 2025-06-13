import React, { useContext, useEffect, useRef, useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks } from "../tools/Slices/FeedbackSlice";
import { Accordion } from "react-bootstrap";
import { FaCheck, FaStar } from "react-icons/fa6";
import Loading from "../Addons/Loading";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { SettingsContext } from "../Context/SettingsProvider";
import { useTranslate } from "../helpers/Language/Translator";
import PaginationComp from "../Addons/Pagination";

const Feedbacks = () => {
  const { userProfile } = UserAuth();
  const { feedbacks, error, loading } = useSelector((state) => state.feedbacks);
  const dispatch = useDispatch();
  const reloadRef = useRef(false);
  const t = useTranslate()
  const { currency, currencyObj } = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  useEffect(() => {
    if (userProfile && !reloadRef.current) {
      dispatch(fetchFeedbacks(userProfile.id));
      reloadRef.current = true;
    }
  }, [userProfile]);

  if (error) console.log(error);
  if (feedbacks.length == 0)
    return (
      <div className=" p-3 bg-custom text-center rounded-2 fw-bold ">
        {t("myOrders.noComment")}
      </div>
    );
  if (loading) return <Loading />;
  return (
    <div className="Siparisler-profile ">
      <Accordion
        className="d-flex flex-column gap-3"
        style={{ background: "none", borderRadius: "0px !important" }}
        defaultActiveKey={0}
        flush
      >
        {feedbacks.length == 0 || feedbacks == [{}] ? (
          <>{t("loading")}</>
        ) : (
          feedbacks.slice((currentPage-1)*productsPerPage,currentPage*productsPerPage).map((item, index) => (
            <Accordion.Item
              key={index}
              eventKey={index}
              className="siparis-accordion-item bg-custom"
            >
              <Accordion.Header>
                <div className="siparisler-accordion-head w-100 pe-3">
                  <div
                    className="d-flex gap-3 align-items-center fw-bold flex-wrap text-custom"
                  >
                    <span className="check-icon">
                      <FaCheck className="check-icon-itself text-white" />
                    </span>
                    <span>#{item.products.id}</span>
                    <span>-</span>
                    <span>{item.products.title}</span>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body
                className=" border-0 bg-dark-custom"
              >
                <div className="siparisler-accordion-body  py-2">
                  <div
                    className="top image-cont  p-2 rounded-2 d-flex flex-sm-nowrap flex-wrap align-items-center gap-2 justify-content-center"
                    style={{  minHeight: "7em" }}
                  >
                    <img
                      className="rounded-2 d-block m-auto h-100"
                      style={{ maxWidth: "8em", width: "100%" }}
                      src={item.products.image_url}
                      alt={item.products.title}
                    />
                    <div
                      className="content h-100 d-flex gap-3 flex-wrap flex-sm-nowrap justify-content-center align-items-center justify-content-sm-between  px-3 py-3 bg-custom w-100 rounded-3"
                      style={{ minHeight: "6em" }}
                    >
                      <Link
                        to={`/${slugify(item.products.title).toLowerCase()}`}
                      >
                        <h6>{item.products.title}</h6>
                      </Link>
                      <span className="h5 p-0 m-0">
                        {t("myOrders.total")}{" "}
                        {(
                          item.products.price * currencyObj[currency].value
                        ).toFixed(2)}{" "}
                        {currencyObj[currency].symbol}
                      </span>
                    </div>
                  </div>
                  <div
                    className="top image-cont p-2 rounded-2 d-flex flex-sm-nowrap flex-wrap align-items-center gap-2 justify-content-center"
                    style={{  minHeight: "7em" }}
                  >
                    <div style={{ width: "14.5%"}} >
                      <img
                        className="rounded-2 d-block m-auto h-100 "
                        style={{ width: "4em" }}
                        src={userProfile.profile_photo}
                        alt={userProfile.display_name}
                      />
                    </div>
                    <div
                      className="content  d-flex gap-3 flex-wrap flex-sm-nowrap justify-content-center justify-content-sm-between  px-3 py-3 bg-custom w-100 rounded-3"
                      style={{ minHeight: "6em" }}
                    >
                      <div className="left w-25">
                        <div className="top d-flex  gap-3 fw-bolder mb-1">
                          <span>{userProfile.first_name[0]}.....</span>{" "}
                          <span>{userProfile.last_name[0]}.....</span>
                        </div>
                        <div className="mid" style={{ fontSize: "13px" }}>
                          {t("myOrders.date")} {item.created_at.substring(0, 10)} -{" "}
                          {item.created_at.substring(11, 16)}
                        </div>
                        <div className="bot">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              style={{
                                color: star <= item.rate ? "#6395EE" : "white",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <hr style={{ border: "1px solid white" }} />
                      <div className="right w-75 " style={{ fontSize: "13px" }}>
                        {" "}
                        {item.content}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>
      <PaginationComp main={feedbacks} perPage={productsPerPage} current={currentPage} setCurrent={setCurrentPage} />

    </div>
  );
};

export default Feedbacks;
