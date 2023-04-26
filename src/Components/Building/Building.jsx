import React from "react";
import { useParams } from "react-router";
import { Loader } from "semantic-ui-react";
import { axios } from "../../system";
import { IncomeBuilding } from "../Incomes/Income";
import BuildingTable from "./BuildingTable";

const Buildings = () => {

    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState({});

    React.useEffect(() => {

        setLoading(true);

        axios.get(`building/${id}/get`)
            .then(({ data }) => {
                setData(data);
            })
            .catch(e => { })
            .then(() => setLoading(false));

    }, [id]);

    if (loading) {
        return <div className="text-center mt-3">
            <Loader inline="centered" active />
        </div>
    }

    return <BuildingTable data={data} />
}

export default Buildings;