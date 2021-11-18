import {fetchTitles} from './apis';
import {Title} from './types';
import {Empty} from 'antd';
import React, {useCallback, useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {option, tree} from 'fp-ts';
import * as queryHelpers from './helpers/queryHelpers';
import styled from 'styled-components';
import {DirectoryTree} from './components/DirectoryTree';
import {transformTitles2tree} from './helpers/transformTitles2tree';
import {Article} from './components/Article';
import {none, Option} from 'fp-ts/Option';
import {useRemoteData} from '../../utils/remoteData';

const RenderBody = (context: {
  selectedTitleId: Option<number>;
  setSelectedTitleId: (opt: Option<number>) => void;
}) =>
  option.fold(
    () => <Empty />,
    (tree: tree.Tree<Title>) => (
      <>
        <aside className="sider">
          <DirectoryTree
            treeTitle={tree}
            setSelectedTitleId={context.setSelectedTitleId}
          />
        </aside>
        <section className="content">
          <Article treeTitle={tree} selectedTitleId={context.selectedTitleId} />
        </section>
      </>
    )
  );

export const UsingTreeInFrontEnd = () => {
  const treeTitleQ = useQuery('titlesQ', async () => {
    const titles = await fetchTitles();
    return transformTitles2tree(titles);
  });
  const [selectedTitleId, setSelectedTitleId] = useState<Option<number>>(none);
  const renderBody = useCallback(
    RenderBody({
      selectedTitleId,
      setSelectedTitleId,
    }),
    [selectedTitleId, setSelectedTitleId]
  );

  const treeTitleR = useRemoteData(treeTitleQ);

  const body = useMemo(
    () => queryHelpers.foldPartially(renderBody)(treeTitleR),
    [treeTitleQ, renderBody]
  );

  return <Styled>{body}</Styled>;
};

const Styled = styled.div`
  display: flex;
  justify-content: space-around;
  .sider {
    min-width: 220px;
  }
`;
