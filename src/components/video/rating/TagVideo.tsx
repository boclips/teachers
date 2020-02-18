import { Col, Radio, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { TagState } from 'src/types/State';
import { Tag } from 'src/types/Tag';
import { Video } from 'src/types/Video';
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
  public render() {
    if (!this.props.video.links.tag) {
      return null;
    }

    return (
      <section data-qa="tag-video" className="tag-video--container">
        <h2>How would you use it in class?</h2>
        <Radio.Group value={this.props.selectedTag}>
          <Row>
            {this.props.tags.map(t => (
              <Col md={8} xs={24} key={t.id}>
                <span
                  data-state={t.label}
                  data-qa="tag-radio"
                  className="tag-video--radio"
                  onClick={this.triggerChange(t)}
                >
                  <Radio value={t}>{t.label}</Radio>
                </span>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </section>
    );
  }

  public triggerChange(tag: Tag) {
    return () => this.props.onChange(tag);
  }
}

function mapStateToProps(state: TagState): StateProps {
  return {
    tags: state.tags,
  };
}

export default connect(mapStateToProps)(TagVideo);
