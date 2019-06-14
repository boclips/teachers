import * as queryString from 'querystring';

class GoogleClassroomUrlBuilder {
  private readonly baseUrl: string = 'https://classroom.google.com/u/0/share';
  private videoUrl: string;
  private videoTitle: string;

  public setTitle(title: string) {
    this.videoTitle = title;
    return this;
  }

  public setVideoUrl(url: string) {
    this.videoUrl = url;
    return this;
  }

  public build(): string {
    const paramsToEncode = {
      url: this.videoUrl,
      title: this.videoTitle,
    };

    const query = queryString.stringify(paramsToEncode);

    return `${this.baseUrl}?${query}`;
  }
}

export default GoogleClassroomUrlBuilder;
