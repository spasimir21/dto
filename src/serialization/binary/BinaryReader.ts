import { BinaryAdapter } from './BinaryAdapter';
import { Binary, toBinary } from './Binary';

class BinaryReader {
  readonly binary: Binary;

  constructor(buffer: Uint8Array) {
    this.binary = toBinary(buffer);
  }

  read<T, Args extends any[]>(adapter: BinaryAdapter<T, Args>, ...args: Args) {
    return adapter.read(this.binary, ...args);
  }
}

export { BinaryReader };
