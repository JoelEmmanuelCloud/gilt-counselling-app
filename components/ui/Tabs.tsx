'use client';

import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  label: string;
  tabs: TabItem[];
}

export default function Tabs({ label, tabs }: TabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(tabs[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const isValid = useCallback((id: string) => tabs.some((tab) => tab.id === id), [tabs]);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && isValid(hash)) {
        setActiveId(hash);
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [isValid]);

  const activate = (id: string, focus = false) => {
    setActiveId(id);
    window.history.replaceState(null, '', `#${id}`);
    if (focus) {
      tabRefs.current[id]?.focus();
    }
    const container = containerRef.current;
    const navHeight = window.matchMedia('(min-width: 768px)').matches ? 120 : 104;
    if (container && container.getBoundingClientRect().top < navHeight) {
      container.scrollIntoView({ block: 'start' });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = tabs.length - 1;
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === null) return;
    event.preventDefault();
    activate(tabs[nextIndex].id, true);
  };

  return (
    <div ref={containerRef} className="scroll-mt-[104px] md:scroll-mt-[120px]">
      <div className="sticky top-[104px] z-40 border-b border-gray-200 bg-white/95 backdrop-blur md:top-[120px]">
        <div
          role="tablist"
          aria-label={label}
          className="max-w-6xl mx-auto flex gap-1 overflow-x-auto px-4 scrollbar-hide sm:gap-2 sm:px-6 lg:px-8"
        >
          {tabs.map((tab, index) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[tab.id] = element;
                }}
                id={`${baseId}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => activate(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`relative min-h-[48px] whitespace-nowrap px-3 text-[15px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900 sm:px-4 ${
                  selected
                    ? 'font-semibold text-gray-900 after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-full after:bg-soft-terracotta sm:after:inset-x-4'
                    : 'font-medium text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeId}
          tabIndex={0}
          className="focus:outline-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
