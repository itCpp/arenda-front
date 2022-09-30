import React from "react";
import { Grid, Header, Icon, Loader, Message } from "semantic-ui-react";
import { axios, moment } from "../../system";
import MySegment from "../UI/Segment";
import { typePayCash, typePayCard, typePayCheckingAccount } from "./CashboxDataTableRow";
import "./calendar.css";

const CashboxCalendar = props => {

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [month, setMonth] = React.useState(null);
    const [calendar, setCalendar] = React.useState({});

    React.useEffect(() => {

        return () => {
            setLoading(true);
            setError(null);
            setMonth(null);
        }

    }, []);

    React.useEffect(() => {

        setLoading(true);

        axios.post('cashbox/calendar', { month })
            .then(({ data }) => {
                setCalendar(data.calendar);
            })
            .catch(e => {
                setError(axios.getError(e));
            })
            .then(() => {
                setLoading(false);
            });

    }, [month]);

    return <div className="p-2">

        {loading && <Loader active inline="centered" className="mt-2" />}

        {!loading && error && <Message
            size="mini"
            className="mx-auto"
            error
            content={error}
            style={{ maxWidth: 500 }}
        />}

        {!loading && !error && <Calendar
            data={calendar}
            month={month}
            setMonth={setMonth}
            setLoading={setLoading}
        />}

    </div>
}

const Calendar = props => {

    const { month, setMonth, setLoading } = props;
    const [calendar, setCalendar] = React.useState([]);

    React.useEffect(() => {

        let start = moment(month || new Date).startOf('month').format("YYYY-MM-DD"),
            stop = moment(month || new Date).endOf('month').format("YYYY-MM-DD"),
            startWeek = moment(start).startOf('week').format("YYYY-MM-DD"),
            stopWeek = moment(stop).endOf('week').format("YYYY-MM-DD"),
            step = startWeek,
            day = 0,
            week = 0,
            calendar = [];

        while (step <= stopWeek) {

            if (day === 7) {
                day = 0;
                week++;
            }

            if (step >= stop && day === 0)
                break;

            step = moment(step).add(1, 'd').format("YYYY-MM-DD");

            Boolean(!calendar[week]) && calendar.push([]);

            calendar[week].push({
                date: step,
                toMonth: step >= start && step <= stop,
            });

            day++;
        }

        setCalendar(calendar);

    }, [month]);

    return <MySegment style={{ maxWidth: 1300 }} className="mx-auto pt-5">

        <div className="d-flex justify-content-center align-items-center mb-5">

            <span>
                <Icon
                    link
                    name="chevron left"
                    onClick={() => {
                        setLoading(true);
                        setMonth(p => moment(p || new Date).subtract(1, 'month').format("YYYY-MM"));
                    }}
                />
            </span>

            <Header
                content={moment(month || new Date).format("MMMM YYYY").toLocaleUpperCase()}
                className="text-center my-0 mx-3"
                as="h2"
            />

            <span>
                <Icon
                    link
                    name="chevron right"
                    onClick={() => {
                        setLoading(true);
                        setMonth(p => moment(p || new Date).add(1, 'month').format("YYYY-MM"));
                    }}
                />
            </span>

        </div>

        <Grid divided>

            {calendar.map((r, i) => {
                return <Grid.Row columns={7} className="calendar-row" key={i}>{r.map(row => <CalendarDay
                    key={row.date}
                    {...props}
                    row={row}
                />)}</Grid.Row>
            })}

        </Grid>

    </MySegment>

}

const CalendarDay = props => {

    const { data, row } = props;
    const dateKey = moment(row.date).format("YYYYMMDD");

    return <Grid.Column className="calendar-cell">

        <div className="text-center" style={{ fontSize: "130%" }}>
            <strong className={row.toMonth ? "opacity-100" : "opacity-30"}>{moment(row.date).format("DD")}</strong>
        </div>

        <StatDayCell data={typeof data[dateKey] == "object" ? data[dateKey] : {}} />

    </Grid.Column>;
}

const StatDayCell = props => {

    const { data } = props;

    return <div className={`d-flex static-cell mt-3 my-2 ${((data.incoming || 0) + (data.expense || 0)) === 0 ? "opacity-20" : "opacity-100"}`}>

        <div className={`d-flex flex-column w-100 text-success ${((data.incoming || 0) === 0 && (data.expense || 0) !== 0) ? "opacity-20" : "opacity-100"}`}>
            <div className="d-flex">
                <span>{typePayCash}</span>
                <code>{data.incomingCash || 0}</code>
            </div>
            <div className="d-flex">
                <span>{typePayCard}</span>
                <code>{data.incomingCard || 0}</code>
            </div>
            <div className="d-flex">
                <span>{typePayCheckingAccount}</span>
                <code>{data.incomingCheckingAccount || 0}</code>
            </div>
            <div className="d-flex">
                <code>{data.incoming || 0}</code>
            </div>
        </div>

        <div className={`d-flex flex-column w-100 text-danger ${((data.expense || 0) === 0 && (data.incoming || 0) !== 0) ? "opacity-20" : "opacity-100"}`}>
            <div className="d-flex">
                <span>{typePayCash}</span>
                <code>{data.expenseCash || 0}</code>
            </div>
            <div className="d-flex">
                <span>{typePayCard}</span>
                <code>{data.expenseCard || 0}</code>
            </div>
            <div className="d-flex">
                <span>{typePayCheckingAccount}</span>
                <code>{data.expenseCheckingAccount || 0}</code>
            </div>
            <div className="d-flex">
                <code>{data.expense || 0}</code>
            </div>
        </div>

    </div>
}

export default CashboxCalendar;