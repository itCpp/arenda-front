import React from "react";
import { Form } from "semantic-ui-react";
import { axios } from "../../system";

const SelectSource = props => {

    const { contract } = props;
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

        axios.get(`incomes/sources/free`, {
            params: contract ? { type: contract } : {}
        })
            .then(({ data }) => {
                setOptions(data.sources || []);
            })
            .catch(e => null)
            .then(() => setLoading(false));

    }, [search, contract]);

    return <Form.Dropdown
        label="Помещение"
        placeholder="Выберите занимаемые помещения"
        options={options.map((r, i) => ({
            key: i,
            value: r.id,
            text: r.name,
        }))}
        multiple
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

export default SelectSource;