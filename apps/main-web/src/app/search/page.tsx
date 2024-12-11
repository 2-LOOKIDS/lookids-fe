import SearchHeader from '../../components/pages/search/SearchHeader';
import SearchResult from '../../components/pages/search/SearchResult';

export default function page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || '';
  return (
    <main>
      <header className="pt-[0.8rem]">
        <SearchHeader initialValue={query} />
      </header>
      <SearchResult query={query} />
    </main>
  );
}
