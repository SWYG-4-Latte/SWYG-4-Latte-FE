import { useCallback, useEffect, useRef } from 'react';

export const useIntersect = (onIntersect: () => void) => {
  const observeTargetRef = useRef(null);

  // 관찰 대상(target)이 등록되거나 가시성에 변화가 생기면 실행되는 callback 함수
  const observerCallback: IntersectionObserverCallback = useCallback(
    ([entry, observer]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!observeTargetRef.current) return;

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    observer.observe(observeTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observeTargetRef, onIntersect]);

  return observeTargetRef;
};
