import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class DataService implements DataSourceService {
    search(term: string | null): Observable<string[]> {
        return of(Items.filter(i => term !== null && i.name.toUpperCase().startsWith(term.toUpperCase())).map(i => i.name));
    }
}

@Injectable()
export abstract class DataSourceService {
  /**
   * Returns a list of dropdown options.
   */
  abstract search(term: string | null): Observable<string[]>;
}

export class TEntity {
    id: number | null = null;
    name: string = '';
}

// test data, usually it comes asynchronously from some source (db, endpoint, etc.)
const Items: TEntity[] = [
    {
      "id": 1,
      "name": "John"
    },
    {
      "id": 2,
      "name": "Jane"
    },
    {
      "id": 3,
      "name": "Bob"
    },
    {
      "id": 4,
      "name": "Alice"
    },
    {
      "id": 5,
      "name": "Tom"
    },
    {
      "id": 6,
      "name": "Sara"
    },
    {
      "id": 7,
      "name": "Mike"
    },
    {
      "id": 8,
      "name": "Emily"
    },
    {
      "id": 9,
      "name": "David"
    },
    {
      "id": 10,
      "name": "Linda"
    },
    {
        "id": 11,
        "name": "Laura"
    },
    {
        "id": 12,
        "name": "Agata"
      }
  ];
  