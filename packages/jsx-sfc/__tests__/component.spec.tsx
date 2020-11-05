import React, { Fragment, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import sfc, { Template } from '../src/index';

interface AppProps {
  test?: string;
}

const App = sfc.component({
  template(data, { styles: { Container }, components: Sub }) {
    return (
      <Container>
        <Sub.Hl>{data.a}</Sub.Hl>
      </Container>
    );
  },

  Component(props) {
    return props.template({ a: 1 });
  },

  style: () => ({
    Container: styled.section`
      color: #fff;
    `,
    hl: css`
      width: 50px;
    `
  }),

  components({ hl }) {
    const Hl: React.FC = props => (
      <section css={hl}>
        <div>{props.children}</div>
      </section>
    );
    return { Hl };
  }
});

describe('component basic', function() {
  const app = mount(<App />);
  it('example 1', () => {
    expect(app.html()).toContain('<div>1</div>');
  });
});