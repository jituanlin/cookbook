import {Title} from '../types';
import React, {useCallback} from 'react';
import {array, option, tree} from 'fp-ts';
import {transformTreeTitle2antdTree} from '../helpers/transformTreeTitle2antdTree';
import {Tree} from 'antd';
import {pipe} from 'fp-ts/function';
import {Option} from 'fp-ts/Option';
import {head} from 'fp-ts/ReadonlyArray';

export const DirectoryTree = (props: {
  treeTitle: tree.Tree<Title>;
  setSelectedTitleId: (opt: Option<number>) => void;
}) => {
  const antdTree = pipe(props.treeTitle, transformTreeTitle2antdTree, array.of);
  const onSelected = useCallback(
    (keys: readonly number[]) =>
      pipe(keys, head, option.map(Number), props.setSelectedTitleId),
    [props.setSelectedTitleId]
  );
  return <Tree treeData={antdTree} onSelect={onSelected as any} />;
};
