import { useEffect, useRef, useState } from 'react';
import type { TypewriterOptions, TypewriterInstance } from '@/types/typewriter';

export function useTypewriter(element: HTMLElement | null, options: TypewriterOptions) {
  const [instance, setInstance] = useState<TypewriterInstance | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!element) return;

    let typewriterInstance: TypewriterInstance | null = null;

    const initTypewriter = async () => {
      try {
        // Import the actual typewriter-text-effect package
        const { Typewriter } = await import('typewriter-text-effect');
        typewriterInstance = new Typewriter(element, options) as unknown as TypewriterInstance;
        setInstance(typewriterInstance);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize typewriter:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize typewriter');
      }
    };

    initTypewriter();

    return () => {
      if (typewriterInstance) {
        try {
          typewriterInstance.destroy();
        } catch (err) {
          console.error('Error destroying typewriter instance:', err);
        }
      }
    };
  }, [element, JSON.stringify(options)]);

  useEffect(() => {
    if (instance) {
      const interval = setInterval(() => {
        try {
          setIsRunning(instance.isRunning());
        } catch (err) {
          console.error('Error checking running state:', err);
          setIsRunning(false);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [instance]);

  return { instance, isRunning, error };
}

export function useTypewriterMethod() {
  const [lastMethod, setLastMethod] = useState<string>('None');
  const [lastReturn, setLastReturn] = useState<any>('—');
  const [lastTimestamp, setLastTimestamp] = useState<string>('—');

  const callMethod = (instance: TypewriterInstance | null, methodName: string, ...args: any[]) => {
    if (!instance) {
      setLastReturn('Instance not available');
      return null;
    }

    try {
      const method = (instance as any)[methodName];
      if (typeof method !== 'function') {
        throw new Error(`Method ${methodName} not found`);
      }

      const result = method.apply(instance, args);
      
      setLastMethod(methodName);
      setLastReturn(typeof result === 'boolean' ? result.toString() : 
                   result === instance ? 'TypewriterInstance' : 
                   result || 'void');
      setLastTimestamp(new Date().toLocaleTimeString());

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLastReturn(`Error: ${errorMessage}`);
      setLastTimestamp(new Date().toLocaleTimeString());
      throw error;
    }
  };

  return { callMethod, lastMethod, lastReturn, lastTimestamp };
}
