import React from "react";
import { BsFacebook, BsHeart, BsHeartFill, BsTwitch, BsYoutube } from "react-icons/bs";

const StreamerCard = (props) => {
  return (
    <>
      <div className="col-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center ">
        <div className="card  border-0 rounded-2" style={{ width: "14rem"}}>
          <img src={props.img} className="card-img-top" alt={props.names} />

          <div className="card-body py-3 position-relative">
            <div
              className="card-title shadow shadow-lg position-absolute start-50 bg-light text-black  px-2 py-1 w-75 text-center rounded  translate-middle-x"
              style={{ top: "-12px", fontSize: "13px" }}
            >
              {props.names}
            </div>
            <p className="card-text w-100 d-flex justify-content-center align-items-center gap-2 fs-4 mt-2">
              {props.platform.map((item, i) => {
                if (item == "Twitch") {
                  return <BsTwitch key={i} />;
                }
                if (item == "YouTube") {
                  return <BsYoutube key={i} />;
                }
                if (item == "Facebook") {
                  return <BsFacebook key={i} />;
                }
              })}
            </p>
            <div className="w-100 btn border border-info turqoise-blue d-flex flex-row gap-3 justify-content-center align-items-center">
              <div className="lef text-white"><BsHeartFill /></div>
              <div className=" text-white">Destekle</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StreamerCard;
