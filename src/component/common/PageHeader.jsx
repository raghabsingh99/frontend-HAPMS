function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-2">
      <h1 className="text-3xl font-bold tracking-wide text-white">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-slate-400">{subtitle}</p> : null}
    </div>
  );
}

export default PageHeader;