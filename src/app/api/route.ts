// app/api/execute/route.ts
import { NextResponse } from 'next/server';
import ivm from 'isolated-vm';

interface ExecuteRequest {
  code: string;
}

export async function POST(req: Request) {
  try {
    const body: ExecuteRequest = await req.json();
    const { code } = body;

    console.log(code);

    const isolate = new ivm.Isolate({ memoryLimit: 32 });
    const context = isolate.createContextSync();
    const jail = context.global;
    const timeoutMs = 1000;
    let consoleOutput = '';

    const logFunction = new ivm.Reference((...args: any[]) => {
      consoleOutput += args.map(String).join(' ') + '\n';
    });

    jail.setSync('log', logFunction.deref());
    const wrappedCode = `(function() { ${code} })()`;
    const script = isolate.compileScriptSync(wrappedCode);

    let result: any;
    try {
      result = script.runSync(context, { timeout: timeoutMs });
    } catch (error: any) {
      result = `Isolated-VM Error: ${error.message}`;
    } finally {
      isolate.dispose();
      logFunction.release();
    }

    const fullOutput = consoleOutput + (result !== undefined ? `\nResult: ${String(result)}` : '');

    return NextResponse.json({ output: fullOutput });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ output: `API Error: ${error.message}` }, { status: 500 });
  }
}
