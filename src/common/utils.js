export const getBlocks = (count) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}-${new Date().getTime()}`,
    }));

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};