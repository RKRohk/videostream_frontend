import { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

interface VideoJsOptions{
    options: VideoJsPlayerOptions
}
export const VideoJS:React.FC<VideoJsOptions> = ( props ) => {

    const videoRef = useRef(null);
    const { options } = props;
    options.techOrder = ["shaka"]

    // This seperate functional component fixes the removal of the videoelement 
    // from the DOM when calling the dispose() method on a player
    const VideoHtml = (props:any ) => (
      <div data-vjs-player>
        <script src="//path/to/videojs-shaka.min.js"></script>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    );
  
    useEffect( () => {
      const videoElement = videoRef.current;
      let player:VideoJsPlayer;
      if( videoElement ) {
        player = videojs( videoElement, options, () => {
          console.log("player is ready");
        });
      }
      return () => {
        if( player ) {
          player.dispose();
        }
      }
    }, [options]);
  
    return (<VideoHtml />);
  }
  export default VideoJS;