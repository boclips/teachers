import { getTranscriptFilename } from 'src/services/videos/fetchVideoTranscript';

describe('fetchVideoTranscript', () => {
  it('can use the filename from the disposition header', () => {
    const filename = getTranscriptFilename(
      'attachment; filename="titleFromApi.txt"',
      'testTitle',
    );

    expect(filename).toBe('titleFromApi.txt');
  });

  it('can use a clean video title if disposition header does not contain any filename', () => {
    const filename = getTranscriptFilename(
      'attachment',
      'Fall of The Roman Empire...in the 15th Century: Crash Course World History #12',
    );

    expect(filename).toBe(
      'Fall_of_The_Roman_Empire___in_the_15th_Century__Crash_Course_World_History_#12.txt',
    );
  });
});
