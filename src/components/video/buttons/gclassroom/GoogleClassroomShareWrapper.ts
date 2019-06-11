/**
 * This is a wrapper for the Google Classroom Share button
 * https://developers.google.com/classroom/guides/sharebutton
 * @param targetWindow window instance
 */
const loadGoogleClassroom = (
  targetWindow: Window,
): Promise<ShareToClassroom> => {
  const scriptElement = targetWindow.document.createElement('script');
  scriptElement.setAttribute('src', 'https://apis.google.com/js/platform.js');
  scriptElement.setAttribute('async', 'true');
  scriptElement.setAttribute('defer', 'true');

  targetWindow.document.head.appendChild(scriptElement);

  return new Promise<ShareToClassroom>((resolve, reject) => {
    scriptElement.onload = () => {
      // @ts-ignore
      resolve(window.gapi);
    };

    scriptElement.onerror = () => {
      reject();
    };
  });
};

export const gapi = loadGoogleClassroom(window);

export interface ShareToClassroom {
  sharetoclassroom: any;
}
