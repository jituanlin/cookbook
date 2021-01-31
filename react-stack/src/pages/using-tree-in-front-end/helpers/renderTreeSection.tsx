import {Tree} from 'fp-ts/Tree';
import {Section as S} from '../types';
import {tree} from 'fp-ts';
import React from 'react';
import {Section} from '../components/Section';

const coRec = (self: S, children: readonly JSX.Element[]) => {
  return (
    <Section self={self} key={self.id}>
      {children}
    </Section>
  );
};

export const renderTreeSection = (treeSection: Tree<S>): JSX.Element => {
  return tree.fold(coRec)(treeSection);
};
