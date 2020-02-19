import { mount } from 'enzyme';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { noOp } from 'src/utils';
import { CopyLinkButton } from './CopyLinkButton';

describe('CopyLinkButton', () => {
  it('sets the share link on the Copy component', () => {
    const wrapper = mount(
      <CopyLinkButton
        onClick={noOp}
        link="https://teachers.boclips.com/videos/123?referer=userId&segmentStart=1"
      />,
    );

    const copyToClipboard = wrapper.find(CopyToClipboard);
    expect(copyToClipboard.prop('text')).toEqual(
      'https://teachers.boclips.com/videos/123?referer=userId&segmentStart=1',
    );
  });

  it('calls the callback prop when clicked', () => {
    const onClickSpy = jest.fn();

    const wrapper = mount(
      <CopyLinkButton link="https://example.com" onClick={onClickSpy} />,
    );

    (wrapper.find(CopyToClipboard).prop('onCopy') as any)();

    expect(onClickSpy).toHaveBeenCalled();
  });
});
