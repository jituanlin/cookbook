import memoizeOne from 'memoize-one';
import {Tree} from 'fp-ts/Tree';
import {Section as S} from '../types';
import {eq, readonlyArray, tree} from 'fp-ts';
import React, {ReactNode} from 'react';
import {Section} from '../components/Section';

type CoRecArgs = readonly [self: S, children: readonly ReactNode[]];
const eqBySelf = eq.contramap<S, CoRecArgs>(([self]) => self)(eq.eqStrict);
const eqByChildren = eq.contramap<readonly ReactNode[], CoRecArgs>(
  ([_, children]) => children
)(readonlyArray.getEq<ReactNode>(eq.eqStrict));
const eqCoRec = eq.getMonoid<CoRecArgs>().concat(eqBySelf, eqByChildren);

// TODO: memorize not work because memorizeOne do only memorize only one...
const coRec = memoizeOne((self: S, children: readonly ReactNode[]) => {
  console.log('invoke coRec with', {self, children});
  return (
    <Section self={self} key={self.id}>
      {children}
    </Section>
  );
}, eqCoRec.equals as any);

export const renderTreeSection = (treeSection: Tree<S>): ReactNode => {
  return tree.fold(coRec)(treeSection);
};
