export const checkQuantity = (_: any, value: number) => {
    if (value > 0) return Promise.resolve();
    return Promise.reject(new Error('Quantity must be greater than zero!'));
};

export const checkPrice = (_: any, value: number) => {
    if (value > 0) return Promise.resolve();
    return Promise.reject(new Error('Price must be greater than zero!'));
};