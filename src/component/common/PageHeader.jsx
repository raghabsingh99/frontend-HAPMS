function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-2">
      <h1 className="text-3xl font-bold tracking-wide text-[#1f2933]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-2 text-sm text-[#6b7280]">{subtitle}</p>
      ) : null}
    </div>
  );
}

export default PageHeader;