import React from 'react';

interface VideoProps {
  src: string;
}

const Video: React.FC<VideoProps> = ({ src }) => {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
    />
  );
};

export default Video;
