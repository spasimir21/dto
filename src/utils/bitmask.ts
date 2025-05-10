const getBitMaskLength = (flagCount: number) => Math.ceil(flagCount / 8);

const toBitMask = (flags: boolean[]) => {
  const bitMask = new Array<number>(getBitMaskLength(flags.length)).fill(0);

  for (let i = 0; i < flags.length; i++) {
    if (!flags[i]) continue;

    const numberIndex = Math.floor(i / 8);
    const bitIndex = i % 8;

    bitMask[numberIndex] |= 1 << bitIndex;
  }

  return bitMask;
};

const fromBitMask = (mask: number[], flagCount: number) => {
  const flags = new Array<boolean>(flagCount).fill(false);

  for (let i = 0; i < flagCount; i++) {
    const numberIndex = Math.floor(i / 8);
    const bitIndex = i % 8;

    flags[i] = (mask[numberIndex] & (1 << bitIndex)) !== 0;
  }

  return flags;
};

export { getBitMaskLength, toBitMask, fromBitMask };
