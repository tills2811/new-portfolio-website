export default function SectionHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-9 flex flex-col items-start gap-4 border-b-[3px] border-ink pb-[18px] min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-8">
      <h2 className="cond text-[clamp(48px,6vw,84px)]">{title}</h2>
      {hint && <p className="max-w-[40ch] text-[15px] text-muted">{hint}</p>}
    </div>
  );
}
