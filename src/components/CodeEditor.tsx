"use client"

import { useEffect, useState } from 'react';
import Editor, { BeforeMount } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

interface CodeEditorProps {
  value: string;
  onChange: (code: string) => void;
  language?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = 'python',
  disabled = false,
  placeholder = '# Type your code here...',
}: CodeEditorProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const beforeMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('examThemeLight', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
      },
    });

    monaco.editor.defineTheme('examThemeDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      },
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative rounded-md border overflow-hidden">
      <Editor
        height="300px"
        defaultLanguage={language}
        value={value || placeholder}
        onChange={(value) => onChange(value || '')}
        theme={theme === 'dark' ? 'examThemeDark' : 'examThemeLight'}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineNumbers: 'on',
          readOnly: disabled,
          automaticLayout: true,
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
          },
          lineHeight: 21,
          padding: { top: 10, bottom: 10 },
        }}
        beforeMount={beforeMount}
        loading={<div className="h-[300px] w-full bg-background animate-pulse" />}
      />
    </div>
  );
}