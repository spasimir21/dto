import { Binary } from './Binary';

interface BinaryAdapter<T = any, ReadArgs extends any[] = []> {
  write(value: T, binary: Binary): void;
  read(binary: Binary, ...args: ReadArgs): T;
  size(value: T): number;
}

export { BinaryAdapter };
