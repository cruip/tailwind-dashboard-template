import classes from "./Details.module.css";
import React from "react";
import "./Alert.css";

export default function Alert(props) {
  const hotelDetailObject = props.hotelDetails.map((hotelDetail, i) => {
    return (
      <div key={i} className={classes.MoreDetails}>
        <div className={classes.detailsItem}>
          <div className={classes.image_container}>
            <img src={hotelDetail.profileImage} alt={hotelDetail.hotelName} />
          </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}> Name </div>
          <div className={classes.detailName}> {hotelDetail.hotelName} </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}> Address </div>
          <div className={classes.detailName}> {hotelDetail.hotelAdress} </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}> Price Average </div>
          <div className={classes.detailName}> {hotelDetail.averagePrice} </div>
        </div>
        <div className={classes.detailsItem}>
          <div className={classes.detailTitle}> Latitude </div>
          <div className={classes.detailName}> {hotelDetail.latitude} </div>
          <div className={classes.detailTitle}> Longitude </div>
          <div className={classes.detailName}> {hotelDetail.longitude} </div>
        </div>
      </div>
    );
  });

  return (
    <div className="dialog-message">
      {hotelDetailObject}
      <div className="button-container">
        <button className="button confirm" onClick={props.confirmClicked}>
          {props.buttonName}
        </button>
      </div>
    </div>
  );
}
