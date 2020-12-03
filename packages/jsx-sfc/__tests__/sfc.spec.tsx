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

const App = sfc<AppProps>()({
  template({ data, style: { Container } }) {
    return (
      <Container>
        <div>{data.a}</div>
      </Container>
    );
  },

  Component(props) {
    return props.template({ a: props.test });
  },

  style: () => ({
    Container: styled.section`
      color: #fff;
    `,
    hl: css`
      width: 50px;
    `
  })
});

describe('basic', function() {
  const app = mount(<App test="1" />);
  it('example 1', () => {
    expect(app.html()).toContain('<div>1</div>');
  });
});

const AppMultiTmpls = sfc<AppProps>()({
  templates({ data, style: { Container } }, main, header: Template.Func<string>) {
    return (
      <>
        <Template name={header}>{content => <header>{content}</header>}</Template>

        <Template name={main}>
          {() => (
            <Container>
              {header.template(data.a)}
              <div>{data.a}</div>
            </Container>
          )}
        </Template>
      </>
    );
  },

  Component(props) {
    return props.template({ a: props.test });
  },

  style: () => ({
    Container: styled.section`
      color: #fff;
    `
  })
});

describe('with multiple templates', function() {
  const appMultiTmpls = mount(<AppMultiTmpls test="1" />);
  it('example 1', () => {
    expect(appMultiTmpls.html()).toContain('<header>1</header>');
  });
});
