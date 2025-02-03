import { FC, memo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineAddToPhotos, MdOutlineDelete } from "react-icons/md";
import { ListItem, ListProps } from "./List";
import Form from "./Form";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface EditId {
    id: number;
    toggle: boolean;
}

const Division: FC<ListProps> = ({ list, setList }) => {
    const [editId, setEditId] = useState<EditId>({ id: 0, toggle: false });
    const [editData, setEditData] = useState<ListItem | null>(null);

    const handleEdit = (item: any) => {
        setEditId({ id: item.id, toggle: true });
        setEditData({ ...item });
    };

    const handleClose = () => {
        setEditId({ id: 0, toggle: false });
    }

    const handleSave = () => {
        if (!editData) return;

        setList((prevList: any) => prevList.map((itm: any) => (itm.id === editData.id ? editData : itm)));

        setEditId({ id: 0, toggle: false });
        setEditData(null);
    };

    const onDelete = (id: number) => {
        setList((prevList: any) => prevList.filter((itm: any) => itm.id !== id));
    };

    return (
        <>
            {list && list.length > 0 && list.map((lst) => (
                <div key={lst.id} className="row">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="d-flex mb-3">
                                    {editId.id === lst.id ? (
                                        <div>
                                            <div className="d-flex">
                                                <h5>Edit</h5><button className="btn p-0 fs-5 ms-auto" onClick={() => handleClose()}><IoMdCloseCircleOutline /></button>
                                            </div>
                                            <hr />
                                            <Form onSubmit={handleSave} item={lst} />
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
                                    {editId.id !== lst.id && lst?.category?.map((cat, ind) => (
                                        <span key={ind} className="badge rounded text-bg-primary me-1">{cat}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {list && !list.length && <h6 className="text-center">NO Data Found</h6>}
        </>

    );
};

export default memo(Division);
