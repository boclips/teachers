import React from 'react';
import { forceReRender, storiesOf } from '@storybook/react';
import { Col } from 'antd';
import { FiniteGrid } from './FiniteGrid';
import { InfiniteGrid } from './InfiniteGrid';

const cellStyle = {
  outline: '1px solid green',
};

const contentStyle = {
  outline: '1px solid blue',
  background: 'rgba(0,0,0,0.2)',
};

let elements = Array.from(Array(10).keys());

const addMoreElements = () => {
  setTimeout(() => {
    elements = elements.concat(Array.from(Array(10).keys()));
    forceReRender();
  }, 1000);
};

storiesOf('Grids', module)
  .add('A finite grid', () => (
    <React.Fragment>
      <p>The green outline shows the outline of each cell.</p>
      <p>The blue outline shows the outline of the content of each cell.</p>
      <FiniteGrid>
        <Col span={12} style={cellStyle}>
          <div style={contentStyle}>
            Cell 1<br />
            With multiple lines
          </div>
        </Col>
        <Col span={12} style={cellStyle}>
          <div style={contentStyle}>Cell 2</div>
        </Col>
        <Col span={12} style={cellStyle}>
          <div style={contentStyle}>Cell 3</div>
        </Col>
        <Col span={12} style={cellStyle}>
          <div style={contentStyle}>Cell 4</div>
        </Col>
      </FiniteGrid>
    </React.Fragment>
  ))
  .add('An infinite grid', () => (
    <React.Fragment>
      <p>The green outline shows the outline of each cell.</p>
      <p>The blue outline shows the outline of the content of each cell.</p>
      <p>Count: {elements.length}</p>
      <InfiniteGrid
        dataLength={elements.length}
        next={addMoreElements}
        loader={<span>Loading more!</span>}
        hasMore={true}
      >
        {elements.map((_, index) => (
          <Col key={index} style={cellStyle} span={8}>
            <div style={contentStyle}>
              Cell {index + 1}
              {index % 7 === 0 && (
                <p>
                  <br />
                  <br />
                  Extra stuff
                </p>
              )}
            </div>
          </Col>
        ))}
      </InfiniteGrid>
    </React.Fragment>
  ));
