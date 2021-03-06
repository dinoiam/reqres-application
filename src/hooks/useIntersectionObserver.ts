import { useRef, useCallback } from 'react';

export const useIntersectionObserver = (
  callback: () => void,
  loading: boolean
): ((node: HTMLDivElement) => void) => {
  const observer = useRef<IntersectionObserver>();

  return useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [callback, loading]
  );
};
