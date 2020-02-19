import { Button } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import { noOp } from 'src/utils';
import { GoogleClassroomShareButton } from './GoogleClassroomShareButton';

describe('GoogleClassroomShareButton', () => {
  it('opens a new window with the correct url', () => {
    const open = jest.fn();
    (window as any).open = open;

    const wrapper = shallow(
      <GoogleClassroomShareButton
        link="https://example.com"
        postTitle="Title"
        postBody="Body"
        onClick={noOp}
      />,
    );

    wrapper.find(Button).simulate('click');

    expect(open).toHaveBeenCalledTimes(1);

    const [url, target, windowParams] = open.mock.calls[0];
    expect(url).toMatch(
      /https:\/\/classroom\.google\.com\/u\/0\/share\?url=.+&title=.+/,
    );
    expect(url).toContain('Title');
    expect(url).toContain('Body');
    expect(target).toEqual('_blank');
    expect(windowParams).toEqual('height=570,width=520');
  });

  it('calls onClick when clicked on', () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(
      <GoogleClassroomShareButton
        link="https://example.com"
        postTitle="Title"
        postBody="Body"
        onClick={onClickSpy}
      />,
    );

    wrapper.find(Button).simulate('click');

    expect(onClickSpy).toHaveBeenCalled();
  });
});
