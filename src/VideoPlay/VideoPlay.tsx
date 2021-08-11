import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import "./VideoPlay.css";
import axios from "axios";
import { useParams } from "react-router";
import moment from "moment";

// import {DateTime} from 'luxon';

type VideoITEMTYPE = {
  Id: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  publishtime: string;
  channelTitle: string;
  Views: number;
};

type VideoPlayTYPE = {
  Id: string;
  title: string;
  description: string;
  publishtime: string;
  channelTitle: string;
  Views: any;
};

function Videoplaydetial(videoitem: VideoPlayTYPE) {
  return (
    <div className="Videoplaydetial">
      <h4 className="titleofplayvideo"> {videoitem.title} </h4>
      <p className="channeltitleofplayvideo"> {videoitem.channelTitle}</p>
      <p>{videoitem.description}</p>
      <p className="publishtimeofplayvideo">
        {videoitem.publishtime}{" "}
        <span className="D"> views {videoitem.Views} </span>
      </p>
    </div>
  );
}

function VideoPlay() {
  let { videoid }: any = useParams();

  const [playingvideo, setplayingvideo] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoid}&key=AIzaSyBH1yco7tnlez6D6Rlk30zIE5-UUiWqRic`
      )
      .then((response) => {
        console.log(response);
        createVideoCard(response.data.items);
      })
      .catch((error) => {
        console.log(error);
        alert("Video Card error");
      });
  }, [videoid]);

  function createVideoCard(videoitems: any) {
    let newVideosItems: any = [];

    for (const singleVideos of videoitems) {
      const videoId = singleVideos.id.videoId;

      const views = singleVideos.statistics.viewCount;

      const snippet = singleVideos.snippet;
      const channelId = snippet.channelId;
      const title = snippet.title;
      const description = snippet.description;
      //const publishtime = DateTime.fromISO(snippet.publishedAt).toRelative();
      const publishtime = moment(snippet.publishedAt).fromNow();
      const channelTitle = snippet.channelTitle;

      newVideosItems.push({
        videoId,
        title,
        description,
        publishtime,
        channelTitle,
        views,
      });
    }

    setplayingvideo(newVideosItems);
  }
  return (
    <div className="VideoPlayFrame">
      <YouTube className="utube" videoId={videoid} />

      <div className="playingVideo">
        {playingvideo.map((tempVideoCard: any) => {
          return (
            <Videoplaydetial
              Id={tempVideoCard.videoId}
              title={tempVideoCard.title}
              description={tempVideoCard.description}
              publishtime={tempVideoCard.publishtime}
              channelTitle={tempVideoCard.channelTitle}
              Views={tempVideoCard.views}
            />
          );
        })}
      </div>
    </div>
  );
}

export default VideoPlay;
