import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTypewriter } from '@/hooks/useTypewriter';
import type { PerformanceMetrics } from '@/types/typewriter';

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    expectedSpeed: 100,
    actualSpeed: 0,
    accuracy: 0,
    startTime: 0,
    charCount: 0
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [instances, setInstances] = useState<any[]>([]);
  const [memoryStats, setMemoryStats] = useState({
    activeInstances: 0,
    eventListeners: 0,
    timers: 0,
    memoryStatus: 'Clean',
    lastCheck: '—'
  });

  const performanceElementRef = useRef<HTMLDivElement>(null);
  const performanceTypewriter = useTypewriter(performanceElementRef.current, {
    text: ['Performance test string for timing accuracy measurement'],
    speed: metrics.expectedSpeed,
    autoStart: false,
    loop: false,
    onComplete: () => {
      setIsRunning(false);
      calculateAccuracy();
    }
  });

  const calculateAccuracy = () => {
    if (metrics.charCount > 0) {
      const actualSpeed = (performance.now() - metrics.startTime) / metrics.charCount;
      const accuracy = Math.min(100, (metrics.expectedSpeed / actualSpeed) * 100);
      
      setMetrics(prev => ({
        ...prev,
        actualSpeed,
        accuracy
      }));
    }
  };

  const runPerformanceTest = () => {
    if (!performanceTypewriter.instance) return;

    setIsRunning(true);
    setMetrics(prev => ({
      ...prev,
      startTime: performance.now(),
      charCount: 0,
      actualSpeed: 0,
      accuracy: 0
    }));

    performanceTypewriter.instance.reset();
    performanceTypewriter.instance.start();
  };

  const createInstances = async () => {
    try {
      const { Typewriter } = await import('typewriter-text-effect');
      const newInstances: { instance: any; element: HTMLDivElement }[] = [];
      
      for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        div.style.display = 'none';
        document.body.appendChild(div);
        
        const instance = new Typewriter(div, {
          text: [`Instance ${i + 1}`],
          autoStart: true
        });
        
        newInstances.push({ instance, element: div });
      }
      
      setInstances(prev => [...prev, ...newInstances]);
      updateMemoryStats(instances.length + 5);
    } catch (error) {
      console.error('Error creating instances:', error);
    }
  };

  const destroyAllInstances = () => {
    instances.forEach(({ instance, element }) => {
      try {
        instance.destroy();
        document.body.removeChild(element);
      } catch (error) {
        console.error('Error destroying instance:', error);
      }
    });
    
    setInstances([]);
    updateMemoryStats(0);
  };

  const updateMemoryStats = (count: number) => {
    setMemoryStats({
      activeInstances: count,
      eventListeners: count * 2, // approximate
      timers: count,
      memoryStatus: count === 0 ? 'Clean' : 'Active Instances',
      lastCheck: new Date().toLocaleTimeString()
    });
  };

  const checkMemoryLeaks = () => {
    const status = instances.length === 0 ? 'Clean' : 'Potential Leaks';
    setMemoryStats(prev => ({
      ...prev,
      memoryStatus: status,
      lastCheck: new Date().toLocaleTimeString()
    }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Timing Accuracy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timing Accuracy Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="test-output p-4 rounded-lg mb-4">
            <div ref={performanceElementRef} className="text-lg min-h-[60px] flex items-center">
              {performanceTypewriter.error ? (
                <span className="text-destructive">Error: {performanceTypewriter.error}</span>
              ) : (
                <span>Ready for performance test...</span>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Expected Speed</span>
                <span>{metrics.expectedSpeed}ms</span>
              </div>
              <div className="performance-meter">
                <div className="performance-bar" style={{ width: '100%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Actual Speed</span>
                <span>{metrics.actualSpeed > 0 ? `${metrics.actualSpeed.toFixed(1)}ms` : '—'}</span>
              </div>
              <div className="performance-meter">
                <div 
                  className="performance-bar" 
                  style={{ 
                    width: metrics.actualSpeed > 0 
                      ? `${Math.min(100, (metrics.actualSpeed / metrics.expectedSpeed) * 100)}%` 
                      : '0%' 
                  }} 
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Accuracy</span>
                <span>{metrics.accuracy > 0 ? `${metrics.accuracy.toFixed(1)}%` : '—'}</span>
              </div>
              <div className="performance-meter">
                <div 
                  className="performance-bar" 
                  style={{ width: `${metrics.accuracy}%` }} 
                />
              </div>
            </div>
          </div>

          <Button
            onClick={runPerformanceTest}
            disabled={isRunning || !performanceTypewriter.instance}
            className="method-btn bg-primary text-white px-4 py-2 w-full mt-4"
          >
            <i className="fas fa-stopwatch mr-2" />
            {isRunning ? 'Running Test...' : 'Run Performance Test'}
          </Button>
        </CardContent>
      </Card>

      {/* Memory Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Memory & Cleanup Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Active Instances</span>
                <span className="font-roboto-mono">{memoryStats.activeInstances}</span>
              </div>
              <div className="flex justify-between">
                <span>Event Listeners</span>
                <span className="font-roboto-mono">{memoryStats.eventListeners}</span>
              </div>
              <div className="flex justify-between">
                <span>Timeouts/Intervals</span>
                <span className="font-roboto-mono">{memoryStats.timers}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={createInstances}
                className="method-btn bg-secondary text-white px-4 py-2 w-full text-sm"
              >
                <i className="fas fa-plus mr-2" />
                Create 5 Instances
              </Button>
              <Button
                onClick={destroyAllInstances}
                className="method-btn bg-destructive text-white px-4 py-2 w-full text-sm"
              >
                <i className="fas fa-trash mr-2" />
                Destroy All Instances
              </Button>
              <Button
                onClick={checkMemoryLeaks}
                className="method-btn bg-warning text-white px-4 py-2 w-full text-sm"
              >
                <i className="fas fa-search mr-2" />
                Check for Leaks
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div>Memory Status: <span className="font-roboto-mono">{memoryStats.memoryStatus}</span></div>
              <div>Last Check: <span className="font-roboto-mono">{memoryStats.lastCheck}</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
