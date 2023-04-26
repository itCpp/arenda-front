import { Icon, Table } from "semantic-ui-react";

const BuildTableBodyRow = props => {

    const { row } = props;

    return <Table.Row>
        <Table.Cell
            content={row.cabinet}
        />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell
            content={<div>
                {(row.space || row.price) && <div className="d-flex">
                    {row.space && <div className="me-3">
                        <Icon name="object ungroup" disabled />
                        <span>{row.space} м²</span>
                    </div>}
                    {row.price && <div className="me-3">
                        <Icon name="ruble" disabled />
                        <span>{row.price}</span>
                    </div>}
                    {(row.space && row.price) && <div className="me-3">
                        <Icon name="ruble" color="green" />
                        <span>{Number(row.space * row.price).toFixed(2)}</span>
                    </div>}
                </div>}
            </div>}
        />
        <Table.Cell />
    </Table.Row>
}

export default BuildTableBodyRow;