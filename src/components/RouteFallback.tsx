// Shown while a page chunk loads. Same pulse-block style as the case study loading skeleton.
const RouteFallback = () => (
    <div className="max-w-6xl w-full mx-auto py-20 px-6 flex-grow" role="status" aria-label="Loading page">
        <div className="animate-pulse space-y-6 max-w-4xl">
            <div className="h-6 w-48 bg-elevated rounded-lg" />
            <div className="h-12 w-3/4 bg-elevated rounded-xl" />
            <div className="h-4 w-full bg-elevated rounded" />
            <div className="h-4 w-5/6 bg-elevated rounded" />
            <div className="h-4 w-2/3 bg-elevated rounded" />
        </div>
        <span className="sr-only">Loading…</span>
    </div>
);

export default RouteFallback;
