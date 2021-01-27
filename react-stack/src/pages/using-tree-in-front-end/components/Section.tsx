import {Section as S} from '../types';
import styled from 'styled-components';
import React, {ReactNode} from 'react';
import {eq, readonlyArray} from 'fp-ts';

const _Section = (props: {self: S; children: readonly ReactNode[]}) => {
  console.log('section render');
  return (
    <Styled isSelected={props.self.isSelected}>
      <div className="self">
        <div className="title">{props.self.title}</div>
        <pre className="content">{props.self.content}</pre>
      </div>
      <div className="children">{props.children}</div>
    </Styled>
  );
};

type CoRecArgs = {
  self: S;
  children: readonly ReactNode[];
};
const eqBySelf = eq.contramap<S, CoRecArgs>(({self}) => self)(eq.eqStrict);

const eqByChildren = eq.contramap<readonly ReactNode[], CoRecArgs>(
  ({children}) => children
)(readonlyArray.getEq<ReactNode>(eq.eqStrict));

const eqSectionProps = eq.getMonoid<CoRecArgs>().concat(eqBySelf, eqByChildren);

export const Section = React.memo(_Section, eqSectionProps.equals);

interface StyledProps {
  isSelected: boolean;
}

const Styled = styled.div`
  text-align: left;
  .children {
    padding-left: 32px;
    background: inherit;
  }
  .self {
    .content {
      padding-left: 12px;
    }
    background: inherit;
  }
  & {
    .self,
    .title,
    .content,
    .children > div {
      background: ${(props: StyledProps) =>
        props.isSelected ? 'lightyellow' : ''}!important;
    }
  }
`;
