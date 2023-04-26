export const IS_LOGIN = "IS_LOGIN";
export const setIsLogin = data => ({
    type: IS_LOGIN,
    payload: data
});

export const USER_DATA = "USER_DATA";
export const setUserData = data => ({
    type: USER_DATA,
    payload: data
});

export const SHOW_SHEDULE = "SHOW_SHEDULE";
export const setShowShedule = data => ({
    type: SHOW_SHEDULE,
    payload: data
});

export const SHOW_SALARY_MORE = "SHOW_SALARY_MORE";
export const setShowSalaryMore = data => ({
    type: SHOW_SALARY_MORE,
    payload: data
});

export const SHOW_ADD_SALARY = "SHOW_ADD_SALARY";
export const setShowAddSalary = data => ({
    type: SHOW_ADD_SALARY,
    payload: data
});

export const SET_BUILDINGS = "SET_BUILDINGS";
export const setBuildings = data => ({
    type: SET_BUILDINGS,
    payload: data
});
