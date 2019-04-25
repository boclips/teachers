import { Pageable } from './State';

class Page<T> {
  constructor(private pageable: Pageable<T>) {}

  public hasNextPage(): boolean {
    return (
      this.pageable && this.pageable.links && this.pageable.links.next && true
    );
  }

  public items(): T[] {
    return this.pageable && this.pageable.items;
  }
}

export default Page;
