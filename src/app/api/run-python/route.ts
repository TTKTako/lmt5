import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code, input } = await request.json();

    // Here you would integrate with a Python execution service
    // Options:
    // 1. Use Pyodide (Python in WebAssembly) - client-side
    // 2. Use a sandboxed Python execution service like Piston API
    // 3. Run Python in a Docker container (requires backend setup)
    
    // For now, this is a placeholder that would connect to a Python execution service
    // Example using Piston API (free code execution API):
    
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: 'python',
        version: '3.10.0',
        files: [
          {
            name: 'main.py',
            content: code,
          },
        ],
        stdin: input,
      }),
    });

    const data = await response.json();

    if (data.run) {
      return NextResponse.json({
        output: data.run.stdout || data.run.stderr || '(No output)',
        error: data.run.stderr && data.run.code !== 0 ? data.run.stderr : null,
      });
    }

    return NextResponse.json({
      output: '',
      error: 'Failed to execute code',
    });
  } catch (error) {
    return NextResponse.json(
      {
        output: '',
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 }
    );
  }
}
