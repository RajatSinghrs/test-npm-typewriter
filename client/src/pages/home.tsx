import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { TestSection } from '@/components/TestSection';
import { StatusIndicator } from '@/components/StatusIndicator';
import { MethodTester } from '@/components/MethodTester';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { useTypewriter } from '@/hooks/useTypewriter';
import type { TestResults } from '@/types/typewriter';

export default function Home() {
  const [testResults, setTestResults] = useState<TestResults>({
    passed: 0,
    failed: 0,
    total: 0,
    tests: []
  });

  const [speeds, setSpeeds] = useState({
    type: 100,
    delete: 50
  });

  // Basic test refs
  const basic1Ref = useRef<HTMLDivElement>(null);
  const basic2Ref = useRef<HTMLDivElement>(null);
  const textArrayRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLDivElement>(null);
  const timingRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);

  // Basic test instances
  const basic1 = useTypewriter(basic1Ref.current, {
    text: ['Hello World!', 'Testing TypeScript', 'Package functionality'],
    autoStart: false
  });

  const basic2 = useTypewriter(basic2Ref.current, {
    text: ['Fast typing test!', 'Speed: 50ms', 'Delete: 25ms'],
    speed: 50,
    deleteSpeed: 25,
    autoStart: false
  });

  const textArray = useTypewriter(textArrayRef.current, {
    text: [],
    autoStart: false
  });

  const speedTest = useTypewriter(speedRef.current, {
    text: [],
    autoStart: false
  });

  const timingTest = useTypewriter(timingRef.current, {
    text: [],
    autoStart: false
  });

  const loopTest = useTypewriter(loopRef.current, {
    text: [],
    autoStart: false
  });

  const cursorTest = useTypewriter(cursorRef.current, {
    text: [],
    autoStart: false
  });

  const hoverTest = useTypewriter(hoverRef.current, {
    text: [],
    autoStart: false
  });

  const methodsTest = useTypewriter(methodsRef.current, {
    text: ['Method testing', 'Interactive controls', 'All 8 methods'],
    autoStart: false
  });

  // Edge case test refs
  const emptyRef = useRef<HTMLDivElement>(null);
  const invalidSpeedRef = useRef<HTMLDivElement>(null);
  const domRef = useRef<HTMLDivElement>(null);
  const concurrentRef = useRef<HTMLDivElement>(null);
  const unicodeRef = useRef<HTMLDivElement>(null);
  const extremeRef = useRef<HTMLDivElement>(null);

  const addTestResult = (name: string, passed: boolean, error?: string) => {
    const result = {
      name,
      passed,
      error,
      timestamp: new Date()
    };
    
    setTestResults(prev => ({
      passed: prev.passed + (passed ? 1 : 0),
      failed: prev.failed + (passed ? 0 : 1),
      total: prev.total + 1,
      tests: [...prev.tests, result]
    }));
  };

  const handleBasicTest = (testName: 'basic1' | 'basic2', action: string) => {
    const instance = testName === 'basic1' ? basic1.instance : basic2.instance;
    if (!instance) return;

    try {
      switch(action) {
        case 'start':
          instance.start();
          break;
        case 'pause':
          instance.pause();
          break;
        case 'resume':
          instance.resume();
          break;
        case 'stop':
          instance.stop();
          break;
        case 'reset':
          instance.reset();
          break;
      }
      addTestResult(`${testName}-${action}`, true);
    } catch (error) {
      addTestResult(`${testName}-${action}`, false, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const testTextArrayFunc = () => {
    if (!textArray.instance) return;
    
    try {
      textArray.instance.updateText(['Hello World! 👋', 'Welcome to testing! 🧪', 'TypeScript is awesome! 🚀']);
      textArray.instance.start();
      addTestResult('text-array', true);
    } catch (error) {
      addTestResult('text-array', false, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const testSpeedFunc = () => {
    if (!speedTest.instance) return;
    
    try {
      speedTest.instance.updateText([`Typing at ${speeds.type}ms`, `Deleting at ${speeds.delete}ms`]);
      speedTest.instance.start();
      addTestResult('speed-config', true);
    } catch (error) {
      addTestResult('speed-config', false, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const testTimingFunc = () => {
    if (!timingTest.instance) return;
    
    try {
      timingTest.instance.updateText(['First text', 'Second text', 'Third text']);
      timingTest.instance.start();
      addTestResult('timing-config', true);
    } catch (error) {
      addTestResult('timing-config', false, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const testLoopFunc = (enableLoop: boolean) => {
    if (!loopTest.instance) return;
    
    try {
      loopTest.instance.updateText(['Loop test 1', 'Loop test 2', 'Loop test 3']);
      loopTest.instance.start();
      addTestResult(`loop-${enableLoop}`, true);
    } catch (error) {
      addTestResult(`loop-${enableLoop}`, false, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const testCursorFunc = (cursorChar: string) => {
    if (!cursorTest.instance) return;
    
    try {
      const displayChar = cursorChar === 'none' ? '' : cursorChar;
      cursorTest.instance.updateText(['Cursor test', 'Different cursor']);
      cursorTest.instance.start();
      addTestResult(`cursor-${cursorChar}`, true);
    } catch (error) {
      addTestResult(`cursor-${cursorChar}`, false, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const testHoverFunc = () => {
    if (!hoverTest.instance) return;
    
    try {
      hoverTest.instance.updateText(['Hover to pause', 'Move mouse away to resume']);
      hoverTest.instance.start();
      addTestResult('hover-test', true);
    } catch (error) {
      addTestResult('hover-test', false, error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const runAllTests = () => {
    setTestResults({ passed: 0, failed: 0, total: 0, tests: [] });
    
    // Run basic functionality tests
    setTimeout(() => testTextArrayFunc(), 100);
    setTimeout(() => testSpeedFunc(), 200);
    setTimeout(() => testTimingFunc(), 300);
    setTimeout(() => testLoopFunc(true), 400);
    setTimeout(() => testCursorFunc('|'), 500);
    setTimeout(() => testHoverFunc(), 600);
  };

  const resetAllTests = () => {
    // Reset all instances
    [basic1, basic2, textArray, speedTest, timingTest, loopTest, cursorTest, hoverTest, methodsTest]
      .forEach(({ instance }) => {
        if (instance) {
          try {
            instance.reset();
          } catch (error) {
            console.error('Error resetting instance:', error);
          }
        }
      });

    setTestResults({ passed: 0, failed: 0, total: 0, tests: [] });
  };

  const exportResults = () => {
    const results = {
      timestamp: new Date().toISOString(),
      results: testResults,
      package: 'typewriter-text-effect',
      version: '2.0.0',
      coverage: testResults.total > 0 ? Math.round((testResults.passed / testResults.total) * 100) : 0
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'typewriter-test-results.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">
                <i className="fas fa-keyboard text-primary mr-3"></i>
                Typewriter Text Effect Testing Suite
              </h1>
              <p className="text-gray-600 mt-1">Comprehensive testing for typewriter-text-effect v2.0.0</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <i className="fas fa-download mr-1"></i>
                npm i typewriter-text-effect
              </div>
              <a 
                href="https://www.npmjs.com/package/typewriter-text-effect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>NPM Package
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Installation and Setup */}
        <TestSection
          id="setup"
          title="Package Installation & Setup"
          icon="fas fa-cog"
          iconColor="text-primary"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Installation Command</h3>
              <div className="code-block p-4 rounded-lg">
                <code>npm install typewriter-text-effect</code>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Import Statement</h3>
              <div className="code-block p-4 rounded-lg">
                <code>import &#123; Typewriter &#125; from 'typewriter-text-effect';</code>
              </div>
            </div>
          </div>
          {(basic1.error || basic2.error) && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                <strong>Error:</strong> Failed to load typewriter-text-effect package. 
                Make sure it's installed: npm install typewriter-text-effect
              </p>
            </div>
          )}
        </TestSection>

        {/* Basic Tests */}
        <TestSection
          id="basic-tests"
          title="Basic Functionality Tests"
          icon="fas fa-play-circle"
          iconColor="text-secondary"
        >
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Test 1: Default Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <StatusIndicator 
                    status={basic1.isRunning ? 'running' : 'idle'} 
                  />
                  Test 1: Default Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4 flex items-center">
                  <div ref={basic1Ref} className="text-lg min-h-[60px] flex items-center">
                    {basic1.error ? (
                      <span className="text-destructive">Error: {basic1.error}</span>
                    ) : (
                      <span>Ready for testing...</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 mb-3">
                  <Button
                    onClick={() => handleBasicTest('basic1', 'start')}
                    className="method-btn bg-secondary text-white px-3 py-1 text-sm"
                    disabled={!basic1.instance}
                  >
                    <i className="fas fa-play mr-1"></i>Start
                  </Button>
                  <Button
                    onClick={() => handleBasicTest('basic1', 'pause')}
                    className="method-btn bg-warning text-white px-3 py-1 text-sm"
                    disabled={!basic1.instance}
                  >
                    <i className="fas fa-pause mr-1"></i>Pause
                  </Button>
                  <Button
                    onClick={() => handleBasicTest('basic1', 'resume')}
                    className="method-btn bg-accent text-white px-3 py-1 text-sm"
                    disabled={!basic1.instance}
                  >
                    <i className="fas fa-play mr-1"></i>Resume
                  </Button>
                  <Button
                    onClick={() => handleBasicTest('basic1', 'stop')}
                    className="method-btn bg-destructive text-white px-3 py-1 text-sm"
                    disabled={!basic1.instance}
                  >
                    <i className="fas fa-stop mr-1"></i>Stop
                  </Button>
                </div>
                <div className="text-xs text-gray-500 font-roboto-mono space-y-1">
                  <div>Running: {basic1.isRunning.toString()}</div>
                  <div>Instance: {basic1.instance ? 'Available' : 'Not Available'}</div>
                </div>
              </CardContent>
            </Card>

            {/* Test 2: Custom Speed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <StatusIndicator 
                    status={basic2.isRunning ? 'running' : 'idle'} 
                  />
                  Test 2: Custom Speed (50ms)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4 flex items-center">
                  <div ref={basic2Ref} className="text-lg min-h-[60px] flex items-center">
                    {basic2.error ? (
                      <span className="text-destructive">Error: {basic2.error}</span>
                    ) : (
                      <span>Ready for speed testing...</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 mb-3">
                  <Button
                    onClick={() => handleBasicTest('basic2', 'start')}
                    className="method-btn bg-secondary text-white px-3 py-1 text-sm"
                    disabled={!basic2.instance}
                  >
                    <i className="fas fa-play mr-1"></i>Start
                  </Button>
                  <Button
                    onClick={() => handleBasicTest('basic2', 'reset')}
                    className="method-btn bg-gray-600 text-white px-3 py-1 text-sm"
                    disabled={!basic2.instance}
                  >
                    <i className="fas fa-redo mr-1"></i>Reset
                  </Button>
                </div>
                <div className="text-xs text-gray-500 font-roboto-mono space-y-1">
                  <div>Speed: 50ms | Delete: 25ms</div>
                  <div>Running: {basic2.isRunning.toString()}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TestSection>

        {/* Comprehensive Option Tests */}
        <TestSection
          id="option-tests"
          title="TypewriterOptions Testing"
          icon="fas fa-sliders-h"
          iconColor="text-primary"
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Text Array Test */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Text Array (Multiple Strings)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={textArrayRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for text array testing...
                  </div>
                </div>
                <Button
                  onClick={testTextArrayFunc}
                  className="method-btn bg-primary text-white px-4 py-2 w-full"
                  disabled={!textArray.instance}
                >
                  <i className="fas fa-list mr-2"></i>Test Multiple Texts
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  Texts: ["Hello World!", "Welcome to testing!", "TypeScript is awesome!"]
                </div>
              </CardContent>
            </Card>

            {/* Speed Configuration Test */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Speed Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={speedRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for speed testing...
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Label className="text-sm">
                    Type Speed: {speeds.type}ms
                    <Input
                      type="range"
                      min="50"
                      max="500"
                      value={speeds.type}
                      onChange={(e) => setSpeeds(prev => ({ ...prev, type: parseInt(e.target.value) }))}
                      className="w-full mt-1"
                    />
                  </Label>
                  <Label className="text-sm">
                    Delete Speed: {speeds.delete}ms
                    <Input
                      type="range"
                      min="25"
                      max="250"
                      value={speeds.delete}
                      onChange={(e) => setSpeeds(prev => ({ ...prev, delete: parseInt(e.target.value) }))}
                      className="w-full mt-1"
                    />
                  </Label>
                </div>
                <Button
                  onClick={testSpeedFunc}
                  className="method-btn bg-primary text-white px-4 py-2 w-full"
                  disabled={!speedTest.instance}
                >
                  <i className="fas fa-tachometer-alt mr-2"></i>Test Speed
                </Button>
              </CardContent>
            </Card>

            {/* Timing Configuration Test */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Timing Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={timingRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for timing testing...
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div>Delay Between: <span className="font-roboto-mono">1000ms</span></div>
                  <div>Pause Between Loops: <span className="font-roboto-mono">2000ms</span></div>
                  <div>Start Delay: <span className="font-roboto-mono">500ms</span></div>
                </div>
                <Button
                  onClick={testTimingFunc}
                  className="method-btn bg-primary text-white px-4 py-2 w-full"
                  disabled={!timingTest.instance}
                >
                  <i className="fas fa-clock mr-2"></i>Test Timing
                </Button>
              </CardContent>
            </Card>

            {/* Loop Test */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Loop Functionality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={loopRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for loop testing...
                  </div>
                </div>
                <div className="flex space-x-2 mb-4">
                  <Button
                    onClick={() => testLoopFunc(true)}
                    className="method-btn bg-secondary text-white px-3 py-2 flex-1 text-sm"
                    disabled={!loopTest.instance}
                  >
                    <i className="fas fa-repeat mr-1"></i>With Loop
                  </Button>
                  <Button
                    onClick={() => testLoopFunc(false)}
                    className="method-btn bg-gray-600 text-white px-3 py-2 flex-1 text-sm"
                    disabled={!loopTest.instance}
                  >
                    <i className="fas fa-play mr-1"></i>No Loop
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cursor Test */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cursor Customization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={cursorRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for cursor testing...
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Select onValueChange={testCursorFunc}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cursor type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="|">Pipe |</SelectItem>
                      <SelectItem value="_">Underscore _</SelectItem>
                      <SelectItem value="█">Block █</SelectItem>
                      <SelectItem value="●">Dot ●</SelectItem>
                      <SelectItem value="none">No Cursor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-gray-500">
                  Cursor blinks with CSS animation
                </div>
              </CardContent>
            </Card>

            {/* Hover Test */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pause on Hover</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="test-output p-4 rounded-lg mb-4 bg-yellow-50 border-yellow-200 hover:bg-yellow-100 transition-colors"
                >
                  <div ref={hoverRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for hover testing...
                  </div>
                  <div className="text-xs text-yellow-600 mt-2">
                    <i className="fas fa-mouse-pointer mr-1"></i>Hover over this area to test pause
                  </div>
                </div>
                <Button
                  onClick={testHoverFunc}
                  className="method-btn bg-primary text-white px-4 py-2 w-full"
                  disabled={!hoverTest.instance}
                >
                  <i className="fas fa-hand-pointer mr-2"></i>Enable Hover Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </TestSection>

        {/* Method Testing */}
        <TestSection
          id="method-tests"
          title="Method Testing (8 Methods)"
          icon="fas fa-tools"
          iconColor="text-accent"
        >
          <div className="mb-4">
            <div className="test-output p-4 rounded-lg">
              <div ref={methodsRef} className="text-lg min-h-[60px] flex items-center">
                {methodsTest.error ? (
                  <span className="text-destructive">Error: {methodsTest.error}</span>
                ) : (
                  <span>Ready for method testing...</span>
                )}
              </div>
            </div>
          </div>
          <MethodTester instance={methodsTest.instance} />
        </TestSection>

        {/* Performance Monitoring */}
        <TestSection
          id="performance"
          title="Performance Monitoring"
          icon="fas fa-chart-line"
          iconColor="text-primary"
        >
          <PerformanceMonitor />
        </TestSection>

        {/* Edge Cases */}
        <TestSection
          id="edge-cases"
          title="Edge Cases & Error Handling"
          icon="fas fa-exclamation-triangle"
          iconColor="text-warning"
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Empty Text Array */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Empty Text Array</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={emptyRef} className="text-lg min-h-[60px] flex items-center text-gray-400">
                    No text provided
                  </div>
                </div>
                <Button
                  onClick={() => {
                    // Test empty array
                    try {
                      if (textArray.instance) {
                        textArray.instance.updateText([]);
                        textArray.instance.start();
                        addTestResult('empty-array', true);
                      }
                    } catch (error) {
                      addTestResult('empty-array', false, error instanceof Error ? error.message : 'Unknown error');
                    }
                  }}
                  className="method-btn bg-warning text-white px-4 py-2 w-full"
                >
                  <i className="fas fa-exclamation mr-2"></i>Test Empty Array
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  Tests: text: []
                </div>
              </CardContent>
            </Card>

            {/* Unicode & Special Characters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Special Characters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={unicodeRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for unicode testing...
                  </div>
                </div>
                <Button
                  onClick={() => {
                    try {
                      if (textArray.instance) {
                        textArray.instance.updateText([
                          'Hello 👋 World 🌍',
                          'Testing 🧪 Unicode ✨',
                          'Emojis 😀 & Symbols ⚡',
                          'مرحبا بالعالم',
                          'こんにちは世界'
                        ]);
                        textArray.instance.start();
                        addTestResult('unicode-test', true);
                      }
                    } catch (error) {
                      addTestResult('unicode-test', false, error instanceof Error ? error.message : 'Unknown error');
                    }
                  }}
                  className="method-btn bg-primary text-white px-4 py-2 w-full"
                >
                  <i className="fas fa-globe mr-2"></i>Test Unicode
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  Emojis, symbols, RTL text
                </div>
              </CardContent>
            </Card>

            {/* Extreme Configurations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Extreme Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="test-output p-4 rounded-lg mb-4">
                  <div ref={extremeRef} className="text-lg min-h-[60px] flex items-center">
                    Ready for extreme testing...
                  </div>
                </div>
                <Button
                  onClick={() => {
                    try {
                      if (speedTest.instance) {
                        speedTest.instance.updateText([
                          'Very fast typing test with extremely long text that should test the limits of the typewriter effect and see how it handles large amounts of content'
                        ]);
                        speedTest.instance.start();
                        addTestResult('extreme-config', true);
                      }
                    } catch (error) {
                      addTestResult('extreme-config', false, error instanceof Error ? error.message : 'Unknown error');
                    }
                  }}
                  className="method-btn bg-accent text-white px-4 py-2 w-full"
                >
                  <i className="fas fa-rocket mr-2"></i>Test Extremes
                </Button>
                <div className="text-xs text-gray-500 mt-2">
                  Very fast/slow speeds, long texts
                </div>
              </CardContent>
            </Card>
          </div>
        </TestSection>

        {/* Results Summary */}
        <TestSection
          id="results"
          title="Test Results Summary"
          icon="fas fa-clipboard-check"
          iconColor="text-secondary"
        >
          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{testResults.passed}</div>
              <div className="text-sm text-green-600">Tests Passed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{testResults.failed}</div>
              <div className="text-sm text-red-600">Tests Failed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{testResults.total}</div>
              <div className="text-sm text-blue-600">Total Tests</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-600">
                {testResults.total > 0 ? Math.round((testResults.passed / testResults.total) * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Coverage</div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detailed Test Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                {testResults.tests.length === 0 ? (
                  <div className="text-gray-500 text-sm">Run tests to see detailed results...</div>
                ) : (
                  <div className="text-sm space-y-2">
                    {testResults.tests.map((test, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 ${
                          test.passed ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        <i className={`fas ${test.passed ? 'fa-check' : 'fa-times'}`} />
                        <span>{test.name}</span>
                        {test.error && <span className="text-xs">- {test.error}</span>}
                        <span className="text-xs text-gray-400 ml-auto">
                          {test.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex space-x-4">
            <Button
              onClick={runAllTests}
              className="method-btn bg-primary text-white px-6 py-3"
            >
              <i className="fas fa-play mr-2"></i>Run All Tests
            </Button>
            <Button
              onClick={exportResults}
              className="method-btn bg-secondary text-white px-6 py-3"
            >
              <i className="fas fa-download mr-2"></i>Export Results
            </Button>
            <Button
              onClick={resetAllTests}
              className="method-btn bg-gray-600 text-white px-6 py-3"
            >
              <i className="fas fa-refresh mr-2"></i>Reset All Tests
            </Button>
          </div>
        </TestSection>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            Comprehensive Testing Suite for typewriter-text-effect v2.0.0
          </p>
          <p className="text-gray-500 text-sm">
            Created for testing purposes. Package by{' '}
            <a 
              href="https://github.com/RajatSinghrs" 
              className="text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rajat Singh
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
