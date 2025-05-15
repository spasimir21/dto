interface Binary {
  buffer: Uint8Array;
  view: DataView;
  offset: number;
  size: number;
}

const toBinary = (buffer: Uint8Array): Binary => ({
  buffer,
  view: new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength),
  offset: 0,
  size: buffer.byteLength
});

const createBinary = (size: number) => toBinary(new Uint8Array(size));

export { Binary, toBinary, createBinary };
