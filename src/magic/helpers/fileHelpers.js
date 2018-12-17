export const setLocalStorage = (fileName, state) => {
    localStorage.setItem('rcell', JSON.stringify(state))
}