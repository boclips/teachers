import { Video } from 'src/types/Video';
import axios from 'axios';

export const fetchVideoTranscript = (video: Video): Promise<void> => {
  const uri = video.links.transcript;
  return axios.get(uri.getOriginalLink()).then((response) => {
    const disposition: string = response.headers['Content-Disposition'];
    const regex = /filename="(.*?)"/;
    const matches = regex.exec(disposition);
    const filename =
      (matches && matches.length > 1 && matches[1]) || video.title;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
