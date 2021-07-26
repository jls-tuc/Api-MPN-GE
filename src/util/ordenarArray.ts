export const orderArray = (elemt) => {
  console.log(elemt);
  const order = elemt.sort(function (a1, a2) {
    if (a1.nroReg < a2.nroReg) {
      return 1;
    } else if (a1.nroReg > a2.nroReg) {
      return -1;
    }
    return 0;
  });
  return order;
};
