export const ADD_ING = 'ADD_INGREDIENT'
export const REM_ING = 'REMOVE_INGREDIENT'

export const addIng = ingName => {
    return {type: ADD_ING, ing:ingName}
}

export const removeIng = ingName => {
    return {type: REM_ING, ing:ingName}
}