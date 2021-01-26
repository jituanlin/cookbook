import {Title} from '../types';
import {tree} from 'fp-ts';
import {renderTreeSection} from '../helpers/renderTreeSection';
import {useQuery} from 'react-query';
import {fetchTreeSection} from '../helpers/fetchTree';
import * as queryHelpers from '../helpers/queryHelpers';
import React, {useMemo} from 'react';
import {Option} from 'fp-ts/Option';
import {option} from 'fp-ts';
import {pipe} from 'fp-ts/function';
import {SectionM} from '../optics/section';

export const Article = (props: {
  treeTitle: tree.Tree<Title>;
  selectedTitleId: Option<number>;
}) => {
  const treeSectionQ = useQuery('treeSectionQ', async () => {
    return fetchTreeSection(props.treeTitle);
  });
  console.log(props.selectedTitleId);
  const body = useMemo(() => {
    return queryHelpers.fold(treeSectionQ)(tree =>
      pipe(
        props.selectedTitleId,
        option.fold(
          () => renderTreeSection(tree),
          id => {
            const newTree = SectionM(id).modify(section => ({
              ...section,
              isSelected: true,
            }))(tree);
            return renderTreeSection(newTree);
          }
        )
      )
    );
  }, [treeSectionQ, props.selectedTitleId]);
  return <>{body}</>;
};
