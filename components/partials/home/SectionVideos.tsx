"use client";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import NcPlayIcon from './shared/NcPlayIcon/NcPlayIcon';
import NcPlayIcon2 from './shared/NcPlayIcon/NcPlayIcon2';
// import './SectionVideos.scss'; // Import the SCSS file

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

const removeEmojis = (text: string) => {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2934}-\u{2935}\u{25AA}-\u{25AB}\u{2B06}\u{2194}-\u{21AA}]/gu, '');
};

export interface SectionVideosProps {
  className?: string;
}

const SectionVideos: FC<SectionVideosProps> = ({ className = "" }) => {
  const noOfItems = 5;
  const [filteredItems, setFilteredItems] = useState<VideoType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [loading, setLoading] = useState(true);

  const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/playlistItems";
  const GOOGLE_API_KEY = "AIzaSyA34QjlATndVGfvl_RwqZuyepTMYyhoB6I";
  const VIDEOS_PLAYLIST_ID = "PLmLDpkciAl3o0BDtNSl8_cluQuyYfoTv-";

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${YOUTUBE_URL}?part=snippet&maxResults=${noOfItems}&playlistId=${VIDEOS_PLAYLIST_ID}&key=${GOOGLE_API_KEY}`);
        const items = response.data.items?.filter(
          (item) => 
            item.snippet?.thumbnails && 
            item.snippet.title !== "Private video" && 
            !item.snippet.title.includes("InShot")
        ).map(item => ({
          id: item.snippet.resourceId.videoId,
          title: removeEmojis(item.snippet.title),
          thumbnail: item.snippet.thumbnails.standard.url,
          publishedAt: item.snippet.publishedAt
        })) || [];

        setFilteredItems(items);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [noOfItems, VIDEOS_PLAYLIST_ID, GOOGLE_API_KEY]);

  const renderMainVideo = () => {
    if (filteredItems.length === 0) return null;

    const video = filteredItems[currentVideo];

    return (
      <div className="main-video" title={video.title}>
        {isPlay ? (
          <iframe
            className="video-iframe"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              className="play-button"
              onClick={() => setIsPlay(true)}
            >
              <NcPlayIcon />
            </div>
            <LazyLoadImage
              className="video-thumbnail"
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
              loading="lazy"
              fetchPriority="low"
              sizes="(max-width: 1000px) 100vw, (max-width: 1200px) 75vw, 50vw"
            />
          </>
        )}
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;

    return (
      <div
        className="sub-video"
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="play-button">
          <NcPlayIcon2 />
        </div>
        <LazyLoadImage
          className="sub-video-thumbnail"
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
          loading="lazy"
          fetchPriority="low"
          sizes="(max-width: 300px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`section-videos ${className}`}>
      <div className="video-container">
        <div className="video-background"></div>
        <div className="video-main">{renderMainVideo()}</div>
        <div className="video-sub-list">
          {filteredItems.map(renderSubVideo)}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;
