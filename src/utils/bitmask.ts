const getBitMaskLength = (flagCount: number) => Math.ceil(flagCount / 8);

const toBitMask = (flags: boolean[]) => {
  const bitMask = new Uint8Array(getBitMaskLength(flags.length));

  for (let i = 0; i < flags.length; i++) {
    if (!flags[i]) continue;

    const numberIndex = Math.floor(i / 8);
    const bitIndex = i % 8;

    bitMask[numberIndex] |= 1 << bitIndex;
  }

  return bitMask;
};

const fromBitMask = (mask: Uint8Array, flagCount: number) => {
  const flags = new Array<boolean>(flagCount).fill(false);

  for (let i = 0; i < flagCount; i++) {
    const numberIndex = Math.floor(i / 8);
    const bitIndex = i % 8;

    flags[i] = (mask[numberIndex] & (1 << bitIndex)) !== 0;
  }

  return flags;
};

export { getBitMaskLength, toBitMask, fromBitMask };
