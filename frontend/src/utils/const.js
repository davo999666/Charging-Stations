export const createToken = (login, password) => `Basic ${btoa(login + ':' + password)}`;
export const telAvivPosition = [32.08, 34.78];