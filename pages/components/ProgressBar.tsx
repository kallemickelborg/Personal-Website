import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  headings: { text: string }[];
  activeHeading: string | null;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ headings }) => {
  const [viewportPosition, setViewportPosition] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [headingPositions, setHeadingPositions] = useState<{ text: string; position: number }[]>([]);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);

  const headingRefs = headings?.map((heading) => ({
    id: heading.text,
    ...heading,
    ref: React.createRef<HTMLHeadingElement>(),
  })) || [];

  const offset = typeof window !== 'undefined' ? window.innerHeight / 4 : 0;

  useEffect(() => {
    const getHeadingOffsets = () => {
      const headings = Array.from(document.querySelectorAll('h2'));
      const headingOffsets = headings.map((heading, index) => {

        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
        return {
          text: heading.textContent || '',
          position: heading.offsetTop,
        };
      });
      setHeadingPositions(headingOffsets);
    };

    const updateMetrics = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const viewportPosition = scrollPosition + viewportHeight - offset;

      setDocumentHeight(documentHeight);
      setViewportPosition(viewportPosition);
    };

    getHeadingOffsets();
    updateMetrics();
    const intervalId = setInterval(() => {
      getHeadingOffsets();
      updateMetrics();
    }, 2000);

    window.addEventListener('resize', updateMetrics);
    window.addEventListener('scroll', updateMetrics);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('scroll', updateMetrics);
    };
  }, [headings]);

  useEffect(() => {
    for (let i = 0; i < headingPositions.length; i++) {
      if (viewportPosition >= headingPositions[i].position) {
        setActiveHeadingIndex(i);
      }
    }
  }, [viewportPosition, headingPositions]);

  const scrollToHeading = (ref: React.RefObject<HTMLHeadingElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="progress-nav">
      <ul className="progress-list">
        {headingRefs.map((heading, index) => {
          const headingPosition = headingPositions.find(h => h.text === heading.text)?.position || 0;
          const progress = headingPosition;
          const isActive = index === activeHeadingIndex;
          return (
            <li 
              key={heading.text} 
              className={isActive ? 'active' : ''}
              style={{ backgroundSize: `${progress}% 100%` }}
              onClick={() => scrollToHeading(heading.ref)}
            >
              <a href={`#heading-${index}`} className={isActive ? 'active' : ''}>{heading.text}</a>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        .progress-nav {
          position: fixed;
          top: 4rem;
          right: 6rem;
          width: 18%;
        }
        .progress-list {
          padding: 0;
        }
        .progress-list li {
          display: flex;
          flex-wrap: wrap;
          flex-flow: column;
          justify-content: center;
          margin: 10px 0;
          padding: 10px;
          background: #011428;
        }
        .progress-list li.active {
          color: #0070f3 !important;
          background: #021e3c;
          border-left: 1px solid #FFF;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .progress-list li a {
          font-size: 0.8rem;
          color: #E0E0E0;
          text-align: right;
          margin: 0 !important;
        }
        .progress-list li.active a {
          color: inherit !important;
        }
      `}</style>
    </nav>
  );
};

export default ProgressBar;