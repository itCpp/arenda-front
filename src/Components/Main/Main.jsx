import React from "react";
import { axios } from "../../system";
import { Button, Loader } from "semantic-ui-react";
import ChartIncomesExpenses from "./ChartIncomesExpenses";
import Logout from "../Auth/Logout";
import { useDispatch } from "react-redux";
import { setShowClientEdit } from "../../store/client/actions";
import { setShowContractEdit } from "../../store/contract/actions";
import ClientEdit from "../Clients/ClientEdit";
import ContractsEdit from "../Contracts";
import { setBuildings } from "../../store/actions";

const Main = () => {

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [chart, setChart] = React.useState([]);
    const d = useDispatch();

    React.useEffect(() => {

        setLoading(true);

        axios.get('main')
            .then(({ data }) => {
                setChart(data.chart);
                d(setBuildings(data.buildings || []));
            })
            .catch(e => {
                setError(axios.getError(e));
            })
            .then(() => {
                setLoading(false);
            });

        return () => {
            setError(null);
            setChart([]);
        }

    }, []);

    return <div>

        {loading && <Loader active inline="centered" className="mt-4" />}

        {!loading && error && <div className="text-center mt-4 text-danger">
            <b>Ошибка</b>{' '}<span>{error}</span>
        </div>}

        {!loading && !error && <>

            <div className="text-center mt-4">

                <ClientEdit />
                <ContractsEdit />

                <Button
                    size="big"
                    icon="user plus"
                    color="green"
                    content="Новый клиент"
                    labelPosition="right"
                    onClick={() => d(setShowClientEdit(true))}
                />

                <Button
                    size="big"
                    icon="plus"
                    color="facebook"
                    content="Новый договор"
                    labelPosition="right"
                    onClick={() => d(setShowContractEdit(true))}
                />

            </div>

            <ChartIncomesExpenses data={chart} />

            <div className="mt-4 text-center">
                <Logout />
            </div>

        </>}

    </div>
}

export default Main;