import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dimmer, Form, Header, Icon, Loader, Modal } from "semantic-ui-react";
import { setShowAddSalary } from "../../store/actions";
import { axios, moment } from "../../system";

const SalaryAdd = props => {

    const { month } = props;
    const { showEmployeeAddPay, payTypes } = useSelector(s => s.main);
    const data = showEmployeeAddPay;
    const open = Boolean(data);
    const d = useDispatch();

    const [formdata, setFormdata] = useState({});
    const [save, setSave] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = useCallback((e, { name, value }) => {
        setFormdata(p => ({ ...p, [name]: value }));
    }, []);

    const close = useCallback(() => d(setShowAddSalary(false)));

    useEffect(() => {

        if (data?.id) {

            let date = moment(new Date).format("YYYY-MM-DD"),
                day = Number(moment(date).format("DD"));

            setFormdata({
                expense_type_id: 1,
                expense_subtype_id: data.id,
                date,
                month,
                period_start: moment(date).startOf('month').format(`YYYY-MM-${day >= 16 ? '16' : 'DD'}`),
                period_stop: moment(date).endOf('month').format(`YYYY-MM-${day >= 16 ? 'DD' : '15'}`),
            });
        }

        return () => {
            setFormdata({});
            setErrors({});
            setError(null);
        }

    }, [data]);

    useEffect(() => {

        if (save) {
            axios.post('employees/salary/save', formdata)
                .then(() => {
                    close();
                })
                .catch(e => {
                    setError(axios.getError(e));
                    setErrors(axios.getErrors(e));
                })
                .then(() => setSave(false));
        }

    }, [save]);

    return <Modal
        open={open}
        header="Добавить оплату"
        size="tiny"
        centered={false}
        closeIcon={<Icon name="close" onClick={() => !save && close()} />}
        content={<Form className="content">

            <Header content={data?.fullname} as="h5" />

            <Form.Group widths={2}>
                <Form.Input
                    label="Сумма"
                    placeholder="Укажите сумму"
                    type="number"
                    step="0.01"
                    name="sum"
                    value={formdata.sum || ""}
                    onChange={handleChange}
                    required
                    error={Boolean(errors?.sum)}
                />
                <Form.Select
                    label="Вид расчета"
                    placeholder="Укажите вид расчета"
                    options={payTypes}
                    name="type_pay"
                    value={formdata?.type_pay || null}
                    onChange={handleChange}
                    error={Boolean(errors?.type_pay)}
                />
            </Form.Group>

            <Form.Group widths={2}>
                <Form.Select
                    label="Тип оплаты"
                    placeholder="Укажите тип оплаты"
                    options={[
                        { key: 0, text: "Аванс", value: 1 },
                        { key: 1, text: "Зарплата", value: 2 },
                        { key: 2, text: "Премия", value: 3 },
                        { key: 3, text: "НДФЛ", value: 4 },
                        { key: 4, text: "Штраф", value: 5 },
                    ]}
                    name="purpose_pay"
                    value={formdata?.purpose_pay || null}
                    onChange={handleChange}
                    error={Boolean(errors?.purpose_pay)}
                />
                <Form.Input
                    label="Дата выдачи"
                    type="date"
                    name="date"
                    value={formdata.date || ""}
                    onChange={(e, { value }) => {
                        setFormdata(p => {

                            let date = moment(value).format("YYYY-MM-DD"),
                                day = Number(moment(date).format("DD"));

                            return {
                                ...p,
                                date: value,
                                period_start: moment(date).startOf('month').format(`YYYY-MM-${day >= 16 ? '16' : 'DD'}`),
                                period_stop: moment(date).endOf('month').format(`YYYY-MM-${day >= 16 ? 'DD' : '15'}`),
                            }
                        })
                    }}
                    required
                    error={Boolean(errors?.date)}
                />
            </Form.Group>
            <Form.Group widths={2}>
                <Form.Input
                    label="Период с"
                    type="date"
                    name="period_start"
                    value={formdata.period_start || ""}
                    onChange={handleChange}
                    required
                    error={Boolean(errors?.period_start)}
                />
                <Form.Input
                    label="Период по"
                    type="date"
                    name="period_stop"
                    value={formdata.period_stop || ""}
                    onChange={handleChange}
                    required
                    error={Boolean(errors?.period_stop)}
                />
            </Form.Group>

            {error && <div className="text-danger mb-3">
                <strong>Ошибка{' '}</strong>
                <span>{error}</span>
            </div>}

            <Button
                color="green"
                content="Сохранить"
                fluid
                icon="save"
                labelPosition="right"
                onClick={() => setSave(true)}
                type="button"
            />

            <Dimmer active={save} inverted>
                <Loader />
            </Dimmer>
        </Form>}
    />
}

export default SalaryAdd;