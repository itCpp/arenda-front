import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { setIncomeFilter } from "../store/incomes/actions";
import { axios } from "../system";
import CashboxHeaderButtons from "./Cashbox/CashboxHeaderButtons";
import { ExpenseHeaderButtons } from "./Expenses";
import { IncomeHeaderButtons } from "./Incomes";
import ParkingHeaderButtons from "./Parking/ParkingHeaderButtons";

const defaultMenu = [
    {
        "title": "Строение 1",
        "url": "/income/1",
        "icon": "building"
    },
    {
        "title": "Строение 2",
        "url": "/income/2",
        "icon": "building"
    },
    {
        "title": "Парковка",
        "url": "/income/parking",
        "icon": "car"
    },
    {
        "title": "Юридические адреса",
        "url": "/income/address",
        "icon": "point"
    },
    {
        "title": "Раcходы",
        "url": "/expenses",
        "icon": "cart"
    },
    {
        "title": "Сотрудники",
        "url": "/employees",
        "icon": "users"
    },
    {
        "title": "Зарплата",
        "url": "/salary",
        "icon": "money"
    },
    {
        "title": "Касса",
        "url": "/cashbox",
        "icon": "calculator"
    }
];

const Header = () => {

    const { pathname } = useLocation();
    const [show, setShow] = useState(false);
    const menu = useRef();
    const d = useDispatch();
    const [points, setPoints] = useState([]);

    const eraseFilter = [
        "/income/1",
        "/income/2"
    ];

    useEffect(() => {
        axios.get('/menu')
            .then(({ data }) => setPoints(data))
            .catch(() => setPoints(defaultMenu));
    }, []);

    useEffect(() => {

        if (show) {
            menu.current.classList.add('show');
        } else {
            menu.current.classList.remove('show');
        }

    }, [show]);

    return <div className="body-header">

        <div ref={menu} className="header-body" onClick={() => setShow(false)}>

            <div className="header-menu">

                <div className="header-header d-flex align-items-center">
                    <Icon name="bars" link size="large" className="me-3" />
                    <NavLink to="/"><strong>CRM</strong></NavLink>
                </div>

                {points.map((r, k) => <NavLink
                    key={k}
                    to={r.url}
                    className="header-link"
                    onClick={() => eraseFilter.indexOf(r.url) >= 0 && d(setIncomeFilter({}))}
                    children={<>
                        {r.icon && <Icon name={r.icon} className="me-3" />}
                        <span>{r.title}</span>
                    </>}
                />)}

                {/* <NavLink to="/income/1" className="header-link" onClick={() => d(setIncomeFilter({}))}>
                    <Icon name="building" className="me-3" /><span>Строение 1</span>
                </NavLink>

                <NavLink to="/income/2" className="header-link" onClick={() => d(setIncomeFilter({}))}>
                    <Icon name="building" className="me-3" /><span>Строение 2</span>
                </NavLink>

                <NavLink to="/income/parking" className="header-link">
                    <Icon name="car" className="me-3" /><span>Парковка</span>
                </NavLink>

                <NavLink to="/income/address" className="header-link">
                    <Icon name="point" className="me-3" /><span>Юридические адреса</span>
                </NavLink>

                <NavLink to="/expenses" className="header-link">
                    <Icon name="cart arrow down" className="me-3" /><span>Раcходы</span>
                </NavLink>

                <NavLink to="/employees" className="header-link">
                    <Icon name="users" className="me-3" /><span>Сотрудники</span>
                </NavLink>

                <NavLink to="/salary" className="header-link">
                    <Icon name="money" className="me-3" /><span>Зарплата</span>
                </NavLink>

                <NavLink to="/cashbox" className="header-link">
                    <Icon name="calculator" className="me-3" /><span>Касса</span>
                </NavLink> */}
            </div>

        </div>

        <div className="d-flex align-items-center">
            <Icon name="bars" link size="large" className="me-3" onClick={() => setShow(p => !p)} />
            <NavLink to="/"><strong>CRM</strong></NavLink>
        </div>

        <div className="flex-grow-1">

            {pathname.indexOf("/expenses") >= 0 && <ExpenseHeaderButtons />}
            {pathname.indexOf("/income/1") >= 0 && <IncomeHeaderButtons />}
            {pathname.indexOf("/income/2") >= 0 && <IncomeHeaderButtons />}
            {pathname.indexOf("/cashbox") >= 0 && <CashboxHeaderButtons />}
            {pathname.indexOf("/income/parking") >= 0 && <ParkingHeaderButtons />}

        </div>

    </div>

}

export default Header;