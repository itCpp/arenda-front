import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { Dimmer, Form, Icon, Loader, Message, Modal } from "semantic-ui-react";
import { setShowContractEdit } from "../../store/contract/actions";
import { axios } from "../../system";
import SelectClient from "../From/SelectClient";
import SelectSource from "../From/SelectSource";

const ContractsEdit = props => {

    const { callback } = props;
    const { showEdit, types } = useSelector(s => s.contract);
    const d = useDispatch();
    const [loading, setLoading] = React.useState(true);
    const [formdata, setFormdata] = React.useState({});
    const [error, setError] = React.useState(null);
    const [errorLoading, setErrorLoading] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const [save, setSave] = React.useState(false);

    const close = React.useCallback(() => d(setShowContractEdit(false)), []);

    const handleChange = React.useCallback((e, { name, value }) => {
        setFormdata(p => ({ ...p, [name]: value }));
    }, []);

    React.useEffect(() => {

        if (save) {
            axios.post(`contracts/${typeof showEdit == "boolean" ? 'create' : `${showEdit.id}/save`}`, formdata)
                .then(({ data }) => {
                    typeof callback == "function" && callback(data);
                    close();
                })
                .catch(e => {
                    setErrors(axios.getErrors(e));
                    setError(axios.getError(e));
                })
                .then(() => {
                    setSave(false);
                })
        }

    }, [save]);

    React.useEffect(() => {

        if (typeof showEdit == "object") {

            setFormdata(showEdit);

            axios.get(`contracts/${showEdit?.id}/get`)
                .then(({ data }) => {
                    setFormdata(data);
                })
                .catch(e => {
                    setErrorLoading(axios.getError(e));
                })
                .then(() => {
                    setLoading(false);
                });

        } else if (Boolean(showEdit)) {
            setLoading(false);
        }

        return () => {
            setLoading(true);
            setFormdata({});
            setError(null);
            setErrors({});
            setSave(false);
            setErrorLoading(null);
        }

    }, [showEdit]);

    return <Modal
        open={Boolean(showEdit)}
        header={"Добавить договор"}
        centered={false}
        closeIcon={<Icon name="close" link onClick={close} />}
        size="small"
        content={{
            content: <div className="position-relative">

                <Form>

                    <Form.Group widths="equal">

                        <SelectClient
                            label="Клиент"
                            placeholder="Выберите клиента"
                            name="client_id"
                            value={formdata?.client_id || ""}
                            onChange={handleChange}
                            error={Boolean(errors?.client_id)}
                            required
                        />

                        <Form.Select
                            label="Тип договора"
                            placeholder="Выберите тип"
                            options={types.map((r, i) => ({ ...r, key: i }))}
                            name="type"
                            value={formdata?.type || ""}
                            onChange={(e, { name, value}) => {
                                setFormdata(p => ({ ...p, [name]: value, sources: null}))
                            }}
                            error={Boolean(errors?.type)}
                            required
                        />

                    </Form.Group>

                    <Form.Group widths="equal">

                        <Form.Input
                            label="Номер договора"
                            placeholder="Укажите номер договора"
                            name="number"
                            value={formdata?.number || ""}
                            onChange={handleChange}
                            error={Boolean(errors?.number)}
                            required
                        />

                        <Form.Input
                            label="Дата заключения"
                            placeholder="Укажите дату заключения договора"
                            type="date"
                            name="date"
                            value={formdata?.date || ""}
                            onChange={handleChange}
                            error={Boolean(errors?.date)}
                            required
                            style={{ maxHeight: 38 }}
                        />

                        <Form.Input
                            label="Стоимость договора"
                            placeholder="Укажите стоимость"
                            name="price"
                            type="number"
                            step="0.01"
                            value={formdata?.price || ""}
                            onChange={handleChange}
                            error={Boolean(errors?.price)}
                            required
                        />

                    </Form.Group>

                    <Form.Group widths="equal">

                        <Form.Input
                            label="Дата начала действия"
                            placeholder="Укажите дату начала"
                            type="date"
                            name="date_start"
                            value={formdata?.date_start || ""}
                            onChange={handleChange}
                            error={Boolean(errors?.date_start)}
                            style={{ maxHeight: 38 }}
                        />

                        <Form.Input
                            label="Дата окончания"
                            placeholder="Укажите дату окончания"
                            type="date"
                            name="date_stop"
                            value={formdata?.date_stop || ""}
                            onChange={handleChange}
                            error={Boolean(errors?.date_stop)}
                            style={{ maxHeight: 38 }}
                        />

                    </Form.Group>

                    <SelectSource
                        name="sources"
                        value={formdata?.sources || []}
                        onChange={handleChange}
                        error={Boolean(errors?.sources)}
                        contract={formdata?.type || null}
                        disabled={formdata?.type !== "rent"}
                    />

                    <Form.TextArea
                        label="Комментарий"
                        placeholder="Укажите комментарий"
                        name="comment"
                        value={formdata?.comment || ""}
                        onChange={handleChange}
                        error={Boolean(errors?.comment)}
                    />

                </Form>

                {(error || errorLoading) && <Message
                    error
                    content={error || errorLoading}
                    size="mini"
                    className="mb-0"
                />}

                <Dimmer active={save || loading} inverted>
                    <Loader />
                </Dimmer>

            </div>
        }}
        actions={[
            {
                key: 0,
                content: "Отмена",
                onClick: () => !save && close(),
                disabled: save || loading,
            },
            {
                key: 1,
                content: "Сохранить",
                icon: "save",
                labelPosition: "right",
                color: "green",
                onClick: () => setSave(true),
                disabled: save || loading,
            }
        ]}
    />

}

export default ContractsEdit;