export const common = {}

export const sortArrObject = (pre, next) => {
    const leftSide = typeof pre !== "number" ? pre.toUpperCase() : pre;
    const rightSide = typeof next !== "number" ? next.toUpperCase() : next;
    if (leftSide < rightSide) return -1;
    if (leftSide > rightSide) return 1;
    return 0;
}