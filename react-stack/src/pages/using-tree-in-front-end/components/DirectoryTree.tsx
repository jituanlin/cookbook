import {Title} from '../types';
import React from 'react';
import {array, tree} from 'fp-ts2';
import {transformTreeTitle2antdTree} from '../helpers/transformTreeTitle2antdTree';
import {Tree} from 'antd';
import {pipe} from 'fp-ts/function';

export const DirectoryTree = (props: {treeTitle: tree.Tree<Title>}) => {
  const antdTree = pipe(props.treeTitle, transformTreeTitle2antdTree, array.of);
  return <Tree treeData={antdTree} onSelect={(...args) => console.log(args)} />;
};
