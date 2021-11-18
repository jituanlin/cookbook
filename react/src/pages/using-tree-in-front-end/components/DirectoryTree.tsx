import {Title} from '../types';
import React, {useCallback, useMemo} from 'react';
import {array, option, tree} from 'fp-ts';
import {transformTreeTitle2antdTree} from '../helpers/transformTreeTitle2antdTree';
import {Tree} from 'antd';
import {pipe} from 'fp-ts/function';
import {Option} from 'fp-ts/Option';
import {head} from 'fp-ts/ReadonlyArray';

const DirectoryTree_ = (props: {
  treeTitle: tree.Tree<Title>;
  setSelectedTitleId: (opt: Option<number>) => void;
}) => {
  const antdTree = useMemo(
    () => pipe(props.treeTitle, transformTreeTitle2antdTree, array.of),
    [props.treeTitle]
  );
  const onSelected = useCallback(
    (keys: readonly number[]) =>
      pipe(keys, head, option.map(Number), props.setSelectedTitleId),
    [props.setSelectedTitleId]
  );
  return <Tree treeData={antdTree} onSelect={onSelected as any} />;
};

export const DirectoryTree = React.memo(DirectoryTree_);
