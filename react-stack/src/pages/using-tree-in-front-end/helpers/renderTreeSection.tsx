import memoizeOne from 'memoize-one';
import {Tree} from 'fp-ts/Tree';
import {Section as S} from '../types';
import {tree} from 'fp-ts';
import React, {ReactNode} from 'react';
import {Section} from '../components/Section';

const coRec = memoizeOne((self: S, children: readonly ReactNode[]) => {
  console.log('invoke coRec with', {self, children});
  return (
    <Section self={self} key={self.id}>
      {children}
    </Section>
  );
});

export const renderTreeSection = (treeSection: Tree<S>): ReactNode => {
  return tree.fold(coRec)(treeSection);
};
