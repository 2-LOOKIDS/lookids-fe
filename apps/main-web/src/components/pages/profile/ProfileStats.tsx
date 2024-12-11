import { Fragment } from 'react';

export default function ProfileStats({
  stats,
}: {
  stats: { id: number; data: string; label: string }[];
}) {
  return (
    <ul className="flex gap-4">
      {stats.map((item) => (
        <Fragment key={item.id}>
          {item.id > 0 && (
            <li className="h-8 w-[1px] bg-[#D9D9D9]" aria-hidden="true" />
          )}
          <li className="flex flex-col items-center">
            <p className="xs:text-base text-sm font-semibold">{item.data}</p>
            <p className="xs:text-sm text-xs text-[#838383]">{item.label}</p>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
