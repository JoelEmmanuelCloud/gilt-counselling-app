import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-off-white" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>

      <section className="panel-gold stripes-left">
        <div className="relative aspect-[16/10] w-full sm:aspect-[2/1] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
          <div className="absolute inset-0 bg-gray-900/15 motion-safe:animate-pulse" aria-hidden="true" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:flex lg:min-h-[480px] lg:items-center lg:px-8 lg:py-24">
          <div className="w-full lg:w-1/2 lg:pr-12" aria-hidden="true">
            <Skeleton tone="gold" className="mb-5 h-4 w-24" />
            <Skeleton tone="gold" className="mb-3 h-10 w-4/5 sm:h-12" />
            <Skeleton tone="gold" className="mb-6 h-10 w-3/5 sm:h-12" />
            <div className="max-w-md space-y-3">
              <Skeleton tone="gold" className="h-4 w-full" />
              <Skeleton tone="gold" className="h-4 w-11/12" />
              <Skeleton tone="gold" className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-container" aria-hidden="true">
        <div className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-3">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card">
              <Skeleton className="mb-5 h-10 w-10 rounded-full" />
              <Skeleton className="mb-3 h-5 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
