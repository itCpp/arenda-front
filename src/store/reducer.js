import * as ACTIONS from "./actions";
import { combineReducers } from "redux";
import { expensesReducer } from "./expenses/reducer";
import { incomesReducer } from "./incomes/reducers";
import { cashboxReducer } from "./cashbox/reducer";
import { clientReducer } from "./client/reducer";
import { contractReducer } from "./contract/reducer";

const defaultMainState = {
    user: {},
    login: false,
    payTypes: [
        {
            key: 0,
            text: "Наличные",
            value: 1,
            icon: {
                name: "money",
                color: "green",
            }
        },
        {
            key: 1,
            text: "б/н",
            value: 2,
            icon: {
                name: "credit card",
                color: "blue",
            }
        },
        {
            key: 3,
            text: "р/с",
            value: 3,
            icon: {
                name: "file text",
                color: "orange",
            }
        },
        {
            key: 4,
            text: "Неучтенные",
            value: 4,
            icon: {
                name: "question circle",
                color: "red",
            }
        }
    ],
    showShedule: false,
    showSalaryMore: false,
    showEmployeeAddPay: false,
    buildings: [],
};

export default combineReducers({
    cashbox: cashboxReducer,
    expenses: expensesReducer,
    incomes: incomesReducer,
    client: clientReducer,
    contract: contractReducer,
    main: (state = defaultMainState, action) => {

        switch (action.type) {

            case ACTIONS.IS_LOGIN:
                return { ...state, login: action.payload }

            case ACTIONS.USER_DATA:
                return { ...state, user: action.payload }

            case ACTIONS.SHOW_SHEDULE:
                return { ...state, showShedule: action.payload }

            case ACTIONS.SHOW_SALARY_MORE:
                return { ...state, showSalaryMore: action.payload }

            case ACTIONS.SHOW_ADD_SALARY:
                return { ...state, showEmployeeAddPay: action.payload }

            case ACTIONS.SET_BUILDINGS:
                return { ...state, buildings: action.payload }

            default:
                return state;
        }
    }
});