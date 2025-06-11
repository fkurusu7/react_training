function getFirstElement<T>(array: T[]): T {
  return array[0];
}

const numbers = [1, 2, 3];
const firstNum = getFirstElement(numbers);
console.log(firstNum);

const strings = ['1, 2', 'tres'];
const firstStr = getFirstElement(strings);
console.log(firstStr);

const input = document.querySelector<HTMLInputElement>('.input');
const val = input?.value;
console.log(val);

const a = [2, 3, 4];
a.map((n: number): number => n * 2);

const map = new Map<string, number>();
map.set('key', 43);
map.set('dsd', 433);

type ApiResponse<Data> = {
  data: Data;
  isError: boolean;
};

type UserResponse = ApiResponse<{ name: string; age: number }>;
type BlogResponse = ApiResponse<{ title: string }>;

const response: UserResponse = {
  data: { name: 'Kyle', age: 44 },
  isError: false,
};
const responseBlog: BlogResponse = {
  data: { title: 'Kyle' },
  isError: false,
};

console.log(response);
console.log(responseBlog);
