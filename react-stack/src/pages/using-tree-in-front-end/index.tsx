import {fetchTitles} from './apis';
import {Title} from './types';
import {Empty} from 'antd';
import React, {useMemo} from 'react';
import {useQuery} from 'react-query';
import {option, tree} from 'fp-ts2';
import * as queryHelpers from './helpers/queryHelpers';
import styled from 'styled-components';
import {DirectoryTree} from './components/DirectoryTree';
import {transformTitles2tree} from './helpers/transformTitles2tree';
import {Article} from './components/Article';

const renderBody = option.fold(
  () => <Empty />,
  (tree: tree.Tree<Title>) => (
    <>
      <aside className="sider">
        <DirectoryTree treeTitle={tree} />
      </aside>
      <section className="content">
        <Article treeTitle={tree} />
      </section>
    </>
  )
);

export const UsingTreeInFrontEnd = () => {
  const treeTitleQ = useQuery('titlesQ', async () => {
    const titles = await fetchTitles();
    return transformTitles2tree(titles);
  });

  const body = useMemo(() => queryHelpers.fold(treeTitleQ)(renderBody), [
    treeTitleQ,
  ]);

  return <Styled>{body}</Styled>;
};

const Styled = styled.div`
  display: flex;
  justify-content: space-around;
  .sider {
    min-width: 220px;
  }
`;
