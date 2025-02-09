import { DragEvent, FC, memo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { ListItem, ListProps } from "./List";
import Form from "./Form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { formattedData } from "../App";

interface EditId {
    id: number;
    toggle: boolean;
}

const Division: FC<ListProps> = ({ list, setList }) => {
    const [editId, setEditId] = useState<EditId>({ id: 0, toggle: false });
    const [editData, setEditData] = useState<ListItem | null>(null);
    const [dropIndex, setDropIndex] = useState<number | null>(null);

    const handleEdit = (item: any) => {
        setEditId({ id: item.id, toggle: true });
        setEditData({ ...item });
    };

    const handleClose = () => {
        setEditId({ id: 0, toggle: false });
    };

    const handleSave = (data: any, id: number) => {
        if (!editData) return;

        setList((prevList: Array<any>) => prevList.map((itm) => itm.id === editData.id ? formattedData(data, id) : itm));
        setEditId({ id: 0, toggle: false });
    };

    const onDelete = (id: number) => {
        setList((prevList: Array<any>) => prevList.filter((itm) => itm.id !== id).map((it: any, ind: number) => ({ ...it, id: ind + 1 })));
    };

    const onDragStart = (event: React.DragEvent, id: number) => {
        event.dataTransfer.setData("id", id.toString());
    };

    const onDragOver = (event: React.DragEvent, index: number) => {
        event.preventDefault();
        setDropIndex(index);
    };

    const onDragLeave = () => {
        setDropIndex(null);
    };

    const onDrop = (event: React.DragEvent, dropIndex: number) => {
        event.preventDefault();
        const id = Number(event.dataTransfer.getData("id"));
        if (id === dropIndex) return;

        setList((prevList:any) => {
            const updatedList = [...prevList];
            const draggedItem = updatedList.find((item) => item.id === id);
            if (!draggedItem) return prevList;

            const filteredList = updatedList.filter((item) => item.id !== id);
            filteredList.splice(dropIndex, 0, draggedItem);

            return filteredList.map((item, index) => ({ ...item, id: index + 1 }));
        });

        setDropIndex(null);
    };

    return (
        <>
            {Array.isArray(list) ? (
                list?.map((lst: any, index: number) => (<>
                    <div key={lst.id}>
                        {/* Show drop indicator before this item */}
                        {dropIndex === index && <div className="border rounded p-5"></div>}

                        <div
                            className="row draggable-item"
                            draggable
                            onDragStart={(event) => onDragStart(event, lst.id)}
                            onDragOver={(event) => onDragOver(event, index)}
                            onDragLeave={onDragLeave}
                            onDrop={(event) => onDrop(event, index)}
                        >
                            <div className="col-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex mb-3">
                                            {editId.id === lst.id ? (
                                                <div>
                                                    <div className="d-flex">
                                                        <h5>Edit</h5>
                                                        <button className="btn p-0 fs-5 ms-auto" onClick={handleClose}><IoMdCloseCircleOutline /></button>
                                                    </div>
                                                    <hr />
                                                    <Form onSubmit={(data: any) => { handleSave(data, editId.id) }} item={lst} />
                                                </div>
                                            ) : (
                                                <div className="me-2">
                                                    <h5 className="card-title">{lst.title}</h5>
                                                    <p className={`card-text ${lst.status === "To Do" ? "text-primary" : lst.status === "In Progress" ? "text-warning" : "text-success"}`}>{lst.status}</p>
                                                </div>
                                            )}
                                            <div className="d-flex ms-auto">
                                                {editId.id !== lst.id && (
                                                    <>
                                                        <button className="btn p-0 fs-5 text-warning" onClick={() => handleEdit(lst)}><FaRegEdit /></button>
                                                        <button className="btn p-0 fs-5 text-danger" onClick={() => onDelete(lst.id)}><MdOutlineDelete /></button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            {editId.id !== lst.id && Array.isArray(lst.category) && lst.category.map((cat: any, indy: number) => (<span key={indy} className="badge rounded text-bg-primary me-1">{cat}</span>))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ))
            ) : (
                <h6 className="text-center">NO Data Found</h6>
            )}
        </>
    );
};

export default memo(Division);
