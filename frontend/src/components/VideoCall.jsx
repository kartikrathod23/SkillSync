import React, { useEffect, useRef } from 'react';

const VideoCall = ({ roomName, displayName }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName,
      width: '100%',
      height: '100%',
      parentNode: containerRef.current,
      userInfo: {
        displayName,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    return () => api?.dispose();
  }, [roomName, displayName]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen" // Tailwind utility for full page
      style={{
        maxWidth: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    />
  );
};

export default VideoCall;
