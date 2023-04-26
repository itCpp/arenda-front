import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dropdown, Icon, Table } from "semantic-ui-react";
import { setShowShedule, setShowSalaryMore, setShowAddSalary } from "../../store/actions";

const SalaryTable = props => {

    const { rows } = props;
    const dispatch = useDispatch();
    const [stat, setStat] = useState(null);

    useEffect(() => {

        let counter = {
            toPayoff: 0,
            prepayment: 0,
            debt: 0,
            balance: 0,
            premium: 0,
            tax: 0,
            fine: 0,
        }

        rows.forEach(r => {
            counter.toPayoff += Number(r.toPayoff || 0);
            counter.prepayment += Number(r.prepayment || 0);
            counter.debt += Number(r.duty || 0);
            counter.balance += Number(r.balance || 0);
            counter.premium += Number(r?.premium || 0);
            counter.tax += Number(r?.tax || 0);
            counter.fine += Number(r?.fine || 0);
        });

        setStat(counter);

    }, [rows]);

    return <Table className="mx-auto" style={{ maxWidth: 1000 }} compact selectable>

        <Table.Header>
            <Table.Row textAlign="center">
                {/* <Table.HeaderCell /> */}
                <Table.HeaderCell textAlign="left">ФИО</Table.HeaderCell>
                <Table.HeaderCell>Должность</Table.HeaderCell>
                <Table.HeaderCell>Оклад</Table.HeaderCell>
                <Table.HeaderCell>Зарплата</Table.HeaderCell>
                <Table.HeaderCell>Долг</Table.HeaderCell>
                <Table.HeaderCell>Аванс</Table.HeaderCell>
                <Table.HeaderCell>Премия</Table.HeaderCell>
                <Table.HeaderCell>НДФЛ</Table.HeaderCell>
                <Table.HeaderCell>Штраф</Table.HeaderCell>
                <Table.HeaderCell>Остаток</Table.HeaderCell>
                <Table.HeaderCell />
            </Table.Row>
        </Table.Header>

        <Table.Body>

            {rows.map(row => <SalaryTableRow
                key={row.id}
                {...props}
                row={row}
                dispatch={dispatch}
            />)}

            {rows.length > 0 && Boolean(stat) && <Table.Row active textAlign="center">
                {/* <Table.Cell /> */}
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
                <Table.Cell
                    content={stat.toPayoff.toFixed((stat.toPayoff - stat.toPayoff.toFixed(0) !== 0) ? 2 : 0)}
                />
                <Table.Cell
                    content={stat.debt.toFixed((stat.debt - stat.debt.toFixed(0) !== 0) ? 2 : 0)}
                />
                <Table.Cell
                    content={stat.prepayment.toFixed((stat.prepayment - stat.prepayment.toFixed(0) !== 0) ? 2 : 0)}
                />
                <Table.Cell
                    content={stat.premium.toFixed((stat.premium - stat.premium.toFixed(0) !== 0) ? 2 : 0)}
                />
                <Table.Cell
                    content={stat.tax.toFixed((stat.tax - stat.tax.toFixed(0) !== 0) ? 2 : 0)}
                />
                <Table.Cell
                    content={stat.fine.toFixed((stat.fine - stat.fine.toFixed(0) !== 0) ? 2 : 0)}
                />
                <Table.Cell
                    content={stat.balance.toFixed((stat.balance - stat.balance.toFixed(0) !== 0) ? 2 : 0)}
                />
                <Table.Cell />
            </Table.Row>}

            {rows.length === 0 && <Table.Row>
                <Table.Cell disabled colSpan={9}>
                    <div className="text-center py-4">Данных еще нет</div>
                </Table.Cell>
            </Table.Row>}

        </Table.Body>

    </Table>
}

const SalaryChanged = props => {

    const { row } = props;

    return <div>
        <span className="text-nowrap">{row.salary}{row.salary_one_day ? <span className="text-muted">/день</span> : ""}</span>
        {Boolean(row.salary_story) && row.salary_story.map((r, i) => <div key={i}>
            <small className="text-nowrap text-muted">{'c '}{moment(r.date).format("DD MMM")}{' '}{r.salary}{r.salary_one_day ? "/день" : ""}</small>
        </div>)}
    </div>
}

const SalaryTableRow = props => {

    const { row, dispatch, load } = props;

    return <Table.Row textAlign="center" negative={row.is_fired} disabled={load === row.id}>
        {/* <Table.Cell>{row.pin}</Table.Cell> */}
        <Table.Cell textAlign="left">{row.fullname}</Table.Cell>
        <Table.Cell><small className="opacity-70">{row.job_title}</small></Table.Cell>
        <Table.Cell content={<SalaryChanged row={row} />} />
        <Table.Cell>{row.toPayoff || <span className="opacity-30">0</span>}</Table.Cell>
        <Table.Cell>{row.duty || <span className="opacity-30">0</span>}</Table.Cell>
        <Table.Cell>{row.prepayment || <span className="opacity-30">0</span>}</Table.Cell>
        <Table.Cell>{row.premium || <span className="opacity-30">0</span>}</Table.Cell>
        <Table.Cell>
            <strong className={`${load === row.id ? "opacity-40" : ((row.balance || 0) > 0 ? "text-success" : ((row.balance || 0) < 0 ? "text-danger" : ""))}`}>{row.balance || 0}</strong>
        </Table.Cell>
        <Table.Cell
            content={<Dropdown
                direction="left"
                pointing="right"
                icon={null}
                trigger={<Icon
                    name="ellipsis vertical"
                    link
                    className="mx-1"
                />}
            >
                <Dropdown.Menu>
                    <Dropdown.Item
                        icon="calendar alternate"
                        content="График работы"
                        onClick={() => dispatch(setShowShedule(row))}
                    />
                    <Dropdown.Item
                        icon="plus"
                        content="Добавить выплату"
                        onClick={() => dispatch(setShowAddSalary(row))}
                    />
                    <Dropdown.Item
                        icon="info"
                        content="Подробнее"
                        onClick={() => dispatch(setShowSalaryMore(row))}
                    />
                </Dropdown.Menu>
            </Dropdown>}
        />
    </Table.Row>
}

export default SalaryTable;