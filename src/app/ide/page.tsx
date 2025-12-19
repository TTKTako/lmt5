'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Nav } from '../../components/nav';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function IDEContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('lang') === 'python' ? 'python' : 'website';
  
  const [mode, setMode] = useState<'python' | 'website'>(initialMode);
  const [pythonCode, setPythonCode] = useState('# Write your Python code here\nprint("Hello, World!")');
  const [pythonInput, setPythonInput] = useState('');
  const [pythonOutput, setPythonOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  const [htmlCode, setHtmlCode] = useState('<div class="container">\n  <h1>Hello World</h1>\n  <p>Start coding!</p>\n</div>');
  const [cssCode, setCssCode] = useState('.container {\n  padding: 20px;\n  text-align: center;\n}\n\nh1 {\n  color: #ffed00;\n  font-size: 2em;\n}\n\np {\n  color: #a855f7;\n}');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [previewKey, setPreviewKey] = useState(0);

  // Update iframe for website mode with debounce
  useEffect(() => {
    if (mode === 'website') {
      const timer = setTimeout(() => {
        updatePreview();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [htmlCode, cssCode, mode]);

  const updatePreview = () => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (iframeDoc) {
          const fullHTML = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  * { margin: 0; padding: 0; box-sizing: border-box; }
                  body { font-family: system-ui, -apple-system, sans-serif; }
                  ${cssCode}
                </style>
              </head>
              <body>
                ${htmlCode}
              </body>
            </html>
          `;
          
          iframeDoc.open();
          iframeDoc.write(fullHTML);
          iframeDoc.close();
        }
      } catch (error) {
        console.error('Error updating preview:', error);
      }
    }
  };

  const runPythonCode = async () => {
    setIsRunning(true);
    setPythonOutput('Running...');
    
    try {
      const response = await fetch('/api/run-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: pythonCode,
          input: pythonInput,
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        setPythonOutput(`Error:\n${data.error}`);
      } else {
        setPythonOutput(data.output || '(No output)');
      }
    } catch (error) {
      setPythonOutput(`Error: ${error instanceof Error ? error.message : 'Failed to run code'}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-[#0f0515] min-h-screen">
      <Nav />
      
      <section className="min-h-screen pt-20 pb-8 px-4">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-[#ffed00] neon-text mb-4">
              Interactive IDE
            </h1>
            
            {/* Mode Selector */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setMode('python')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  mode === 'python'
                    ? 'bg-[#ffed00] text-[#0f0515] neon-border'
                    : 'bg-[#1a0b2e]/80 text-purple-300 border border-purple-500/30 hover:border-[#ffed00]'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setMode('website')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  mode === 'website'
                    ? 'bg-[#ffed00] text-[#0f0515] neon-border'
                    : 'bg-[#1a0b2e]/80 text-purple-300 border border-purple-500/30 hover:border-[#ffed00]'
                }`}
              >
                Website
              </button>
            </div>
          </div>

          {/* Python Mode */}
          {mode === 'python' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-250px)]">
              {/* Editor Section */}
              <div className="flex flex-col gap-4">
                {/* Code Editor */}
                <div className="flex-1 bg-[#1a0b2e]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-[#0f0515] px-4 py-2 border-b border-purple-500/30">
                    <span className="text-[#ffed00] font-semibold">Code Editor</span>
                  </div>
                  <div className="flex-1">
                    <Editor
                      height="100%"
                      defaultLanguage="python"
                      value={pythonCode}
                      onChange={(value) => setPythonCode(value || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        automaticLayout: true,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        wordBasedSuggestions: 'matchingDocuments',
                        tabSize: 4,
                      }}
                    />
                  </div>
                </div>

                {/* Input Section */}
                <div className="h-32 bg-[#1a0b2e]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-[#0f0515] px-4 py-2 border-b border-purple-500/30">
                    <span className="text-[#ffed00] font-semibold">Input</span>
                  </div>
                  <textarea
                    value={pythonInput}
                    onChange={(e) => setPythonInput(e.target.value)}
                    placeholder="Enter input for your program..."
                    className="flex-1 bg-[#0a0312] text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none placeholder-gray-600"
                    spellCheck={false}
                  />
                </div>

                {/* Run Button */}
                <button
                  onClick={runPythonCode}
                  disabled={isRunning}
                  className="px-6 py-3 bg-transparent border-2 border-[#ffed00] text-[#ffed00] rounded-lg hover:bg-[#ffed00] hover:text-[#0f0515] transition-all duration-300 neon-border text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>

              {/* Output Section */}
              <div className="bg-[#1a0b2e]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-[#0f0515] px-4 py-2 border-b border-purple-500/30">
                  <span className="text-[#ffed00] font-semibold">Output</span>
                </div>
                <pre className="flex-1 bg-[#0a0312] text-gray-300 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
                  {pythonOutput || 'Click "Run Code" to see output here...'}
                </pre>
              </div>
            </div>
          )}

          {/* Website Mode */}
          {mode === 'website' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-250px)]">
              {/* Editors Section */}
              <div className="flex flex-col gap-4">
                {/* HTML Editor */}
                <div className="flex-1 bg-[#1a0b2e]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-[#0f0515] px-4 py-2 border-b border-purple-500/30">
                    <span className="text-[#ffed00] font-semibold">HTML</span>
                  </div>
                  <div className="flex-1">
                    <Editor
                      height="100%"
                      defaultLanguage="html"
                      value={htmlCode}
                      onChange={(value) => setHtmlCode(value || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        automaticLayout: true,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        wordBasedSuggestions: 'matchingDocuments',
                        tabSize: 2,
                      }}
                    />
                  </div>
                </div>

                {/* CSS Editor */}
                <div className="flex-1 bg-[#1a0b2e]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
                  <div className="bg-[#0f0515] px-4 py-2 border-b border-purple-500/30">
                    <span className="text-[#ffed00] font-semibold">CSS</span>
                  </div>
                  <div className="flex-1">
                    <Editor
                      height="100%"
                      defaultLanguage="css"
                      value={cssCode}
                      onChange={(value) => setCssCode(value || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        automaticLayout: true,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true,
                        wordBasedSuggestions: 'matchingDocuments',
                        tabSize: 2,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-[#1a0b2e]/80 backdrop-blur-sm border border-purple-500/30 rounded-lg overflow-hidden flex flex-col">
                <div className="bg-[#0f0515] px-4 py-2 border-b border-purple-500/30 flex items-center justify-between">
                  <span className="text-[#ffed00] font-semibold">Preview</span>
                  <span className="text-purple-400 text-xs">Updates automatically</span>
                </div>
                <iframe
                  ref={iframeRef}
                  key={previewKey}
                  sandbox="allow-scripts"
                  className="flex-1 bg-white w-full"
                  title="Preview"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function IDEPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#0f0515] min-h-screen flex items-center justify-center">
        <div className="text-[#ffed00] text-xl">Loading IDE...</div>
      </div>
    }>
      <IDEContent />
    </Suspense>
  );
}
