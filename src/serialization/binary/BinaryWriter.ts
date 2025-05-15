import { BinaryAdapter } from './BinaryAdapter';
import { createBinary } from './Binary';

interface BinaryPart<T = any> {
  adapter: BinaryAdapter<T>;
  value: T;
  next: BinaryPart | null;
}

class BinaryWriter {
  size: number = 0;

  firstPart: BinaryPart | null = null;
  lastPart: BinaryPart | null = null;

  write<T>(value: T, adapter: BinaryAdapter<T, any>) {
    const part: BinaryPart<T> = { adapter, value, next: null };
    this.size += adapter.size(value);

    if (this.firstPart == null || this.lastPart == null) {
      this.firstPart = part;
      this.lastPart = part;
      return;
    }

    this.lastPart.next = part;
    this.lastPart = part;
  }

  toBuffer() {
    const binary = createBinary(this.size);

    let part = this.firstPart;
    while (part != null) {
      part.adapter.write(part.value, binary);
      part = part.next;
    }

    return binary.buffer;
  }
}

export { BinaryWriter };
