export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-white">
      <div className="animate-pulse flex space-x-2">
        <div className="w-3 h-3 bg-p-blue rounded-full"></div>
        <div className="w-3 h-3 bg-p-blue rounded-full"></div>
        <div className="w-3 h-3 bg-p-blue rounded-full"></div>
      </div>
    </div>
  );
}
