import { Box, HStack } from '@chakra-ui/react'
import React,{useState,useRef} from 'react'
import LanguageSelector from './LanguageSelector'
import { CODE_SNIPPETS } from './Constants';
import { Editor } from '@monaco-editor/react';
import Output from './Output';

function CodeEditor({value, onChange}) {
  const editorRef = useRef();
  const [language, setLanguage] = useState("java");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    onChange(CODE_SNIPPETS[language]||"")
  };

  return (
    <Box h="100%" bg="#0f0a19" color="white" position="relative" px={6} py={8}>
      <HStack spacing={4} align="start">
        <Box w="65%" zIndex="dropdown">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="430px"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onChange={onChange}
            onMount={onMount}
          />
        </Box>
        <Output editorRef={editorRef} language={language}/>
      </HStack>
    </Box>
  );
}

export default CodeEditor
