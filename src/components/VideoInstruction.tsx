import React from 'react'
import { Title } from './UI'
import YouTube from 'react-youtube';


export const videoView = (videoId?: string) => {

    const opts = {
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
        //   autoplay: 1,
        },
      };
      

    if(!videoId) return
    return <>
    <Title level="3">Видео-инструкция</Title>
    <YouTube videoId={videoId} opts={opts} />
    </>
}