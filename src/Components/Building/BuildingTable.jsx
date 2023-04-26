import { Header, Table } from "semantic-ui-react";
import BuildTableBodyRow from "./BuildTableBodyRow";

const BuildingTable = props => {

    const { data } = props;

    console.log(data);

    return <div className="mx-2 my-3">

        <div className="d-flex align-items-center mb-3">
            <Header
                as="h3"
                content={data.name}
                subheader={data.address}
                className="flex-grow-1 mb-0"
            />
        </div>

        {data.parts.map(row => <Table key={row.id} compact="very">

            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell
                        className="py-2"
                        content={<div>
                            <b>{row.name}</b>
                            {row.comment && <span className="text-muted ms-3">{row.comment}</span>}
                        </div>}
                        colSpan={7}
                    />
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell className="py-2">Кабинет</Table.HeaderCell>
                    <Table.HeaderCell className="py-2">Компания</Table.HeaderCell>
                    <Table.HeaderCell className="py-2">Контакты</Table.HeaderCell>
                    <Table.HeaderCell className="py-2">Дата</Table.HeaderCell>
                    <Table.HeaderCell className="py-2">Платежи</Table.HeaderCell>
                    <Table.HeaderCell className="py-2">Индикация</Table.HeaderCell>
                    <Table.HeaderCell className="py-2" />
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <BuildTableBody data={row.cabinets} />
            </Table.Body>

        </Table>)}

    </div>
}

const BuildTableBody = props => {

    const { data } = props;

    if (data.length === 0) {
        return <Table.Row>
            <Table.Cell
                colSpan={7}
                disabled
                content={<div className="text-center my-3">
                    <div>Данных ещё нет</div>
                </div>}
            />
        </Table.Row>
    }

    return data.map(row => <BuildTableBodyRow
        key={row.id}
        row={row}
    />);

}

export default BuildingTable;