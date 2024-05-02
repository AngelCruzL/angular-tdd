import { TestRequest } from '@angular/common/http/testing';

const users = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@mail.com',
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@mail.com',
  },
  {
    id: 3,
    username: 'user3',
    email: 'user3@mail.com',
  },
  {
    id: 4,
    username: 'user4',
    email: 'user4@mail.com',
  },
  {
    id: 5,
    username: 'user5',
    email: 'user5@mail.com',
  },
  {
    id: 6,
    username: 'user6',
    email: 'user6@mail.com',
  },
  {
    id: 7,
    username: 'user7',
    email: 'user7@mail.com',
  },
];

export type PageParam = string | null | number;

export function getPage(page: number, size: number) {
  const start = page * size;
  const end = start + size;

  return {
    content: users.slice(start, end),
    page,
    size,
    totalPages: Math.ceil(users.length / size),
  };
}

export function parseRequestParams(request: TestRequest) {
  let size: PageParam = request.request.params.get('size');
  let page: PageParam = request.request.params.get('page');
  size = Number.isNaN(+size!) ? 5 : +size!;
  page = Number.isNaN(+page!) ? 0 : +page!;

  return { size, page };
}
