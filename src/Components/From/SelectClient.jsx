import React from "react";
import { Form } from "semantic-ui-react";
import { axios } from "../../system";

const SelectClient = props => {

    const timeout = React.useRef();
    const [loading, setLoading] = React.useState(true);
    const [options, setOptions] = React.useState([]);
    const [search, setSearch] = React.useState(null);

    const searchHandler = React.useCallback((e, { searchQuery }) => {
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            setSearch(searchQuery);
        }, 300);
    }, []);

    React.useEffect(() => {

        return () => {
            setOptions([]);
        }

    }, []);

    React.useEffect(() => {

        setLoading(true);

        axios.get('clients', {
            params: search ? { name: search } : {}
        })
            .then(({ data }) => {
                setOptions(data.data);
            })
            .catch()
            .then(() => setLoading(false));

    }, [search]);

    return <Form.Dropdown
        label="Клиент"
        placeholder="Выберите клиента"
        options={options.map((r, i) => ({
            key: i,
            value: r.id,
            text: r.name,
        }))}
        search
        selection
        allowAdditions
        additionLabel="Добавить в список: "
        noResultsMessage="Ничего не найдено..."
        loading={loading}
        onSearchChange={searchHandler}
        onAddItem={(e, { name, value }) => {
            setOptions(p => ([
                ...p,
                { id: value, name: value }
            ]));
            typeof props.onChange == "function" && props.onChange(e, { name, value });
        }}
        {...props}
    />

}

export default SelectClient;