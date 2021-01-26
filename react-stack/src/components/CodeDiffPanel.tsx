import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {solarizedlight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import styled from 'styled-components';

interface Props {
  leftCodeStr: string;
  rightCodeStr: string;
}

export const CodeDiffPanel = (props: Props) => {
  return (
    <Styled>
      <CodePanel>
        <SyntaxHighlighter language="typescript" style={solarizedlight}>
          {props.leftCodeStr}
        </SyntaxHighlighter>
      </CodePanel>
      <CodePanel>
        <SyntaxHighlighter language="typescript" style={solarizedlight}>
          {props.rightCodeStr}
        </SyntaxHighlighter>
      </CodePanel>
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  top: 0;
  background: white;
  align-items: stretch;
`;

const CodePanel = styled.div`
  width: 50%;
  :first-child {
    margin-right: 8px;
  }
  display: flex;
  & pre {
    flex: 1;
  }
`;
