import { fitBand } from "@/lib/data";

export default function FitBand() {
  return (
    <div className="bg-ink text-page">
      <dl className="wrap grid grid-cols-2 min-[900px]:grid-cols-4">
        {fitBand.map((item, i) => (
          <div
            key={item.value}
            className={[
              "band-rule py-[22px] pr-5",
              i > 0 ? "min-[900px]:border-l min-[900px]:pl-5" : "",
              i % 2 === 1 ? "border-l pl-5" : "",
              i > 1 ? "border-t min-[900px]:border-t-0" : "",
            ].join(" ")}
          >
            <dt className="text-[26px] leading-none" style={{ fontVariationSettings: '"wdth" 70', fontWeight: 800 }}>
              {item.value}
            </dt>
            <dd className="mt-1 text-sm opacity-75">{item.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
