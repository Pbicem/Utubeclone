import React, { useState, useEffect } from "react";
import "./SingleVideoCard.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

type VideoITEMTYPE = {
  Id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  publishtime: string;
  channelTitle: string;
  Views: number;
};

function SingleVideoCard(videoitem: VideoITEMTYPE) {
  let { qfield }: any = useParams();
  return (
    <div className="SingleVideoCard">
      <Link className="linkofvideoscard" to={`/${qfield}/${videoitem.Id}`}>
        <img
          className="SingleVideoThumbnail"
          src={videoitem.thumbnailUrl}
        ></img>

        <h4 className="videotitle"> {videoitem.title} </h4>
        <p className="channeltitle"> {videoitem.channelTitle}</p>
        <p className="channeltitle">{videoitem.publishtime} </p>
      </Link>
    </div>
  );
}
export default SingleVideoCard;
