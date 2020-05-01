import React, { useEffect, useState } from 'react';

import { fetchVideo } from 'src/services/videos/fetchVideo';
import { VideoCard } from './videoCard';

export const Bit = (): any => {
  const [video, setVideo] = useState();
  useEffect(() => {
    async function fetch() {
      const response = await fetchVideo('5e1deecd885cfd10e809820b');
      setVideo(response);
    }
    fetch().then((r) => r);
  }, []);

  return (
    <div style={{ padding: '50px', marginTop: '100px' }}>
      {console.log(video)}
      <VideoCard
        video={video}
        title="Cultivating Trust With One-on-One"
        duration="PT3M29S"
        displayDuration={true}
      />
    </div>
  );
};
