export const paintVideoFrameOnCanvas = (video: HTMLVideoElement, cropElement?: HTMLElement) => {
  // Get the video settings
  // @ts-ignore because getTracks is very much valid in modern browsers
  const videoTrackSettings = video.srcObject?.getTracks()[0].getSettings();

  // Create a canvas with the video's size and draw the video frame on it
  const canvas = document.createElement("canvas");
  const crop = cropElement?.getBoundingClientRect();
  canvas.width = crop?.width ?? videoTrackSettings?.width ?? 0;
  canvas.height = crop?.height ?? videoTrackSettings?.height ?? 0;
  const ctx = canvas.getContext("2d");
  if (crop) {
    const dpr = window.devicePixelRatio
    ctx?.drawImage(video, crop.x * dpr, crop.y * dpr, crop.width * dpr, crop.height * dpr);
  } else {
    ctx?.drawImage(video, 0, 0);
  }

  return canvas;
};
