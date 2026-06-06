import React from 'react';
import { chakra, Box, BoxProps } from '@chakra-ui/react';
import BaseHighlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const RE = /{([\d,-]+)}/;

const editorStyle: React.CSSProperties = {
  fontSize: 14,
  overflowX: 'auto',
  fontFamily: 'SF Mono, Menlo, monospace',
};

const calculateLinesToHighlight = (meta?: string) => {
  if (!meta) return () => false;

  const ok = RE.test(meta);
  const res = RE.exec(meta);

  if (!ok || !res || res?.length < 2) {
    return () => false;
  }

  const lineNumbers = res[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

interface HighlightProps extends BoxProps {
  codeString: string;
  language: Language;
  metastring?: string;
  showLines?: boolean;
}

export const Highlight: React.FC<HighlightProps> = ({
  codeString,
  language,
  metastring,
  showLines,
  ...props
}) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <Box padding="5" rounded="8px" bg="#011627" {...props}>
      <BaseHighlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
        {...props}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div style={editorStyle} data-language={language}>
            <pre className={className} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });
                return (
                  <chakra.div
                    key={i}
                    bg={shouldHighlightLine(i) ? 'whiteAlpha.200' : undefined}
                    {...lineProps}
                  >
                    {showLines && (
                      <chakra.span opacity={0.3} mr="6" fontSize="xs">
                        {i + 1}
                      </chakra.span>
                    )}
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </chakra.div>
                );
              })}
            </pre>
          </div>
        )}
      </BaseHighlight>
    </Box>
  );
};

export default Highlight;
