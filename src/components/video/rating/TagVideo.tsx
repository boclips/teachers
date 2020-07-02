import { Col, Radio, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { TagState } from '../../../types/State';
import { Tag } from '../../../types/Tag';
import { Video } from '../../../types/Video';
import './TagVideo.less';

interface Props {
  video: Video;
  onChange: (Tag) => void;
  selectedTag: Tag | null | undefined;
}

interface StateProps {
  tags: Tag[];
}

class TagVideo extends React.PureComponent<Props & StateProps> {
  public onKeyPress(e, tag) {
    if (e.keyCode === 13) {
      this.triggerChange(tag);
    }
  }

  public triggerChange(tag: Tag) {
    const { onChange } = this.props;
    return () => onChange(tag);
  }

  public render() {
    const { tags, selectedTag, video } = this.props;
    if (!video.links.tag) {
      return null;
    }

    return (
      <section data-qa="tag-video" className="tag-video--container">
        <h2>How would you use it in class?</h2>
        <Radio.Group value={selectedTag}>
          <Row>
            {tags.map((tag) => (
              <Col md={8} xs={24} key={tag.id}>
                <span
                  role="button"
                  tabIndex={0}
                  data-state={tag.label}
                  data-qa="tag-radio"
                  className="tag-video--radio"
                  onClick={this.triggerChange(tag)}
                  onKeyPress={(e) => this.onKeyPress(e, tag)}
                >
                  <Radio value={tag}>{tag.label}</Radio>
                </span>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </section>
    );
  }
}

function mapStateToProps(state: TagState): StateProps {
  return {
    tags: state.tags,
  };
}

export default connect(mapStateToProps)(TagVideo);
