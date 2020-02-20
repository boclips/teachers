import { Button } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AttachmentFactory } from '../../../../test-support/factories';
import { analyticsMock } from '../../../../test-support/getAnalyticsMock';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Attachment } from '../../../types/Attachment';
import { LessonPlan } from './LessonPlan';

jest.mock('../../../services/analytics/AnalyticsFactory');

AnalyticsFactory.externalAnalytics = jest.fn(() => analyticsMock);

it('will render a lesson plan container', () => {
  const attachment: Attachment = AttachmentFactory.sample();

  const component = shallow(<LessonPlan attachment={attachment} />);

  const container = component.find('section');
  expect(container).toExist();
});

it('will render a header', () => {
  const attachment: Attachment = AttachmentFactory.sample();

  const component = shallow(<LessonPlan attachment={attachment} />);

  const header = component.find('h1');

  expect(header).toExist();
  expect(header.text()).toEqual('Lesson plan outline');
});

it('will render the description in a markdown component', () => {
  const attachment: Attachment = AttachmentFactory.sample();

  const component = shallow(<LessonPlan attachment={attachment} />);

  const markdown = component.find(ReactMarkdown);

  expect(markdown).toExist();
  expect(markdown.prop('children')).toEqual(attachment.description);
});

it('will add a link to the content', () => {
  const attachment: Attachment = AttachmentFactory.sample();

  const component = shallow(<LessonPlan attachment={attachment} />);

  const link = component.find(Button);

  expect(link).toExist();
  expect(link.prop('href')).toEqual(
    attachment.links.download.getOriginalLink(),
  );
  expect(link.prop('children')).toEqual('Visit plan');
});

it('will emit a mixpanel, when the link is clicked', () => {
  const collectionId = 'collectionId';
  const attachment: Attachment = AttachmentFactory.sample();

  const component = shallow(
    <LessonPlan collectionId={collectionId} attachment={attachment} />,
  );

  const link = component.find(Button);

  link.simulate('click');

  expect(
    analyticsMock.trackCollectionAttachmentLinkVisited,
  ).toHaveBeenCalledWith(collectionId, attachment);
});
