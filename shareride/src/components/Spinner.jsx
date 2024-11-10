function Spinner() {
  return (
    <div className="w-16 h-16 rounded-full bg-[radial-gradient(farthest-side,var(--color-brand-600)_94%,transparent)_top/10px_10px_no-repeat,conic-gradient(transparent_30%,var(--color-brand-600))] mask-[radial-gradient(farthest-side,transparent_calc(100%-10px),black_0)] animate-spin m-12 mx-auto">
    </div>
  );
}

export default Spinner;
