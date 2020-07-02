import { Video } from 'src/types/Video';
import axios from 'axios';

export const fetchVideoTranscript = (video: Video): Promise<void> => {
  const uri = video.links.transcript;
  return axios.get(uri.getOriginalLink()).then((response) => {
    const disposition: string = response.headers['content-disposition'];
    const filename = getTranscriptFilename(disposition, video.title);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

export const getTranscriptFilename = (
  dispositionHeader: string,
  videoTitle: string,
): string => {
  const regex = /filename="(.*?)"/;
  const matches = regex.exec(dispositionHeader);
  const matchedFilename = matches?.[1];
  if (matchedFilename) {
    return matchedFilename;
  } else {
    const filename = videoTitle.replace(/\.|\:|\ /g, '_');
    return `${filename}.txt`;
  }
};
