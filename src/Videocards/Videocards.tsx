import React, { useState, useEffect } from "react";
//import { Link } from 'react-router-dom';
import "./Videocards.css";
import SingleVideoCard from "./SingleVideoCard";
import axios from "axios";
import { useParams } from "react-router";
// import {DateTime} from 'luxon';
import moment from "moment";

type VideoITEMTYPE = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  description: string;
  publishtime: any;
  channelTitle: string;
  views: number;
};

function Videocards(query: { num: number }) {
  const [searchVideos, setSearchVideos] = useState<VideoITEMTYPE[] | []>([]);
  let { qfield }: any = useParams();
  // let {videoid} = useParams();
  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${qfield}&type=video&key=AIzaSyBH1yco7tnlez6D6Rlk30zIE5-UUiWqRic`
      )
      .then((response) => {
        // localStorage.clear()
        console.log(response);
        createVideoCard(response.data.items);
      })
      .catch((error) => {
        console.log(error);
        alert("Video Card error");
      });
  }, [qfield]);

  async function createVideoCard(videoitems: any) {
    let newVideosItems: VideoITEMTYPE[] = [];

    for (const singleVideos of videoitems) {
      const videoId = singleVideos.id.videoId;

      //const res = await axios
      //.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=AIzaSyBH1yco7tnlez6D6Rlk30zIE5-UUiWqRic`)
      //const views = res.data.items[0].statistics.viewCount;

      const views = 0;
      const snippet = singleVideos.snippet;
      const channelId = snippet.channelId;
      const title = snippet.title;
      const thumbnailUrl = snippet.thumbnails.medium.url;
      const description = snippet.description;
      //const publishtime = DateTime.fromISO(snippet.publishedAt).toRelative();

      const publishtime = moment(snippet.publishedAt).fromNow();
      const channelTitle = snippet.channelTitle;

      newVideosItems.push({
        videoId,
        title,
        thumbnailUrl,
        description,
        publishtime,
        channelTitle,
        views,
      });
    }

    setSearchVideos(newVideosItems);
  }

  if (query.num == 1) {
    return (
      <div className="VideoCardsPageDiv">
        {searchVideos.map((tempVideoCard) => {
          return (
            <SingleVideoCard
              Id={tempVideoCard.videoId}
              title={tempVideoCard.title}
              thumbnailUrl={tempVideoCard.thumbnailUrl}
              description={tempVideoCard.description}
              publishtime={tempVideoCard.publishtime}
              channelTitle={tempVideoCard.channelTitle}
              Views={tempVideoCard.views}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="VideoCardListPage">
        {searchVideos.map((tempVideoCard) => {
          return (
            <SingleVideoCard
              Id={tempVideoCard.videoId}
              title={tempVideoCard.title}
              thumbnailUrl={tempVideoCard.thumbnailUrl}
              description={tempVideoCard.description}
              publishtime={tempVideoCard.publishtime}
              channelTitle={tempVideoCard.channelTitle}
              Views={tempVideoCard.views}
            />
          );
        })}
      </div>
    );
  }
  return <div className="extra"></div>;
}

export default Videocards;
