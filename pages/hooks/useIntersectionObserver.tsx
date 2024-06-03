import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  ref: React.RefObject<HTMLHeadingElement>;
}

const useIntersectionObserver = (headings: Heading[]) => {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
      }
    );

    headings.forEach((heading) => {
      if (heading.ref.current) {
        observer.observe(heading.ref.current);
      }
    });

    return () => {
      headings.forEach((heading) => {
        if (heading.ref.current) {
          observer.unobserve(heading.ref.current);
        }
      });
    };
  }, [headings]);

  return activeHeading;
};

export default useIntersectionObserver;