import {Title} from '../types';
import {tree} from 'fp-ts2';
import {renderTreeSection} from '../helpers/renderTreeSection';
import {useQuery} from 'react-query';
import {fetchTreeSection} from '../helpers/fetchTree';
import * as queryHelpers from '../helpers/queryHelpers';
import React from 'react';

export const Article = (props: {treeTitle: tree.Tree<Title>}) => {
  const treeSectionQ = useQuery('treeSectionQ', async () => {
    return fetchTreeSection(props.treeTitle);
  });
  return <>{queryHelpers.fold(treeSectionQ)(renderTreeSection)}</>;
};
