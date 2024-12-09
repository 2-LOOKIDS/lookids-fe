import SearchBar from '../../components/common/SearchBar';
import { X } from 'lucide-react';

export default function page() {
  return (
    <main>
      <section className="pt-13">
        <div className="flex items-center w-full">
          {/* <div onClick={() => setIsSearch(!isSearch)}>
            <Search color="#ffa200" size={22} />
          </div> */}
          <div className="flex-1">
            <SearchBar />
          </div>
          <div onClick={() => setIsSearch(!isSearch)}>
            <X color="#ffa200" size={22} />
          </div>
        </div>
      </section>
    </main>
  );
}
