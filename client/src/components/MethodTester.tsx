import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTypewriterMethod } from '@/hooks/useTypewriter';
import type { TypewriterInstance } from '@/types/typewriter';

interface MethodTesterProps {
  instance: TypewriterInstance | null;
}

interface LogEntry {
  timestamp: string;
  method: string;
  result: string;
  id: number;
}

export function MethodTester({ instance }: MethodTesterProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [logCounter, setLogCounter] = useState(0);
  const { callMethod, lastMethod, lastReturn, lastTimestamp } = useTypewriterMethod();

  const addLog = (method: string, result: string) => {
    const newLog: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      method,
      result,
      id: logCounter
    };
    setLogs(prev => [...prev, newLog]);
    setLogCounter(prev => prev + 1);
  };

  const handleMethodCall = async (methodName: string, ...args: any[]) => {
    try {
      const result = callMethod(instance, methodName, ...args);
      addLog(methodName, typeof result === 'boolean' ? result.toString() : 
                         result === instance ? 'TypewriterInstance' : 
                         result || 'void');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addLog(methodName, `Error: ${errorMessage}`);
    }
  };

  const clearLog = () => {
    setLogs([]);
    setLogCounter(0);
  };

  const methods = [
    { name: 'start', icon: 'fas fa-play', color: 'bg-secondary' },
    { name: 'pause', icon: 'fas fa-pause', color: 'bg-warning' },
    { name: 'resume', icon: 'fas fa-play', color: 'bg-accent' },
    { name: 'stop', icon: 'fas fa-stop', color: 'bg-destructive' },
    { name: 'reset', icon: 'fas fa-redo', color: 'bg-gray-600' },
    { name: 'updateText', icon: 'fas fa-edit', color: 'bg-purple-600' },
    { name: 'isRunning', icon: 'fas fa-question', color: 'bg-blue-600' },
    { name: 'destroy', icon: 'fas fa-trash', color: 'bg-red-800' }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Method Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Interactive Method Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="test-output p-4 rounded-lg mb-4">
            <div id="typewriter-methods" className="text-lg min-h-[60px] flex items-center">
              {!instance ? (
                <span className="text-gray-400">No typewriter instance available</span>
              ) : (
                <span>Ready for method testing...</span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {methods.map(({ name, icon, color }) => (
              <Button
                key={name}
                onClick={() => {
                  if (name === 'updateText') {
                    handleMethodCall(name, ['Updated text 1', 'Updated text 2', 'Method test complete']);
                  } else {
                    handleMethodCall(name);
                  }
                }}
                className={`method-btn ${color} text-white py-2 px-3 text-sm`}
                disabled={!instance}
              >
                <i className={`${icon} mr-1`} />
                {name}()
              </Button>
            ))}
          </div>

          <div className="text-xs space-y-1 text-muted-foreground font-roboto-mono">
            <div>Last Method: <span>{lastMethod}</span></div>
            <div>Return Value: <span>{lastReturn}</span></div>
            <div>Timestamp: <span>{lastTimestamp}</span></div>
          </div>
        </CardContent>
      </Card>

      {/* Method Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Method Execution Log</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 rounded-lg p-4 bg-gray-900 text-green-400 font-roboto-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-500">Method execution log will appear here...</div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="mb-1">
                  <span className="text-blue-400">[{log.timestamp}]</span>{' '}
                  {log.method}(){' '}
                  <span className="text-gray-500">→</span>{' '}
                  <span className="text-yellow-400">{log.result}</span>
                </div>
              ))
            )}
          </ScrollArea>
          <Button
            onClick={clearLog}
            className="method-btn bg-gray-600 text-white px-4 py-2 mt-3 w-full text-sm"
          >
            <i className="fas fa-eraser mr-2" />
            Clear Log
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
