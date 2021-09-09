import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';

type Props = {
  code: any;
  language: Language;
};

export const CodeHighlight: React.FC<Props> = ({ code, language }) => (
  <Highlight {...defaultProps} code={code} language={language} theme={theme}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default CodeHighlight;
