//MERGES DEFAULT STATE WITH PROVIDER STATE
export const mergeDefaultWProvider = (base, state) => {
  const newMerge = base.map((b) => {
    const match = state?.find((s) => s.id === b.id);
    if (match) {
      const { Icon, Guide, ...s } = { Icon: {}, Guide: {}, ...match };
      return { ...b, ...s };
    } else {
      return b;
    }
  });
  return [...newMerge, ...state.filter((s) => s.isCustom)];
};
