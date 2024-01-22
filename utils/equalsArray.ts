// this function returs true it two arrays are equals or not
export const equalsCheck = (a: (number | string)[], b: (number | string)[]) => {
  return a?.length === b?.length && a?.every((v) => b?.includes(v));
};
