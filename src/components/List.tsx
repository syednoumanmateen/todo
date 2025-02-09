import { DragEvent, FC, memo } from "react";
import Division from "./Division";
import Card from "./Card";
import { FaBarsProgress } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { IoMdDoneAll } from "react-icons/io";

export interface ListItem {
  id: number;
  title: string;
  status: string;
  category?: Array<any>;
}

export interface ListProps {
  list: ListItem[];
  setList: (data: any) => void;
}

const statusList = [
  { title: "To Do", value: "To Do", icon: <LuListTodo /> },
  { title: "In Progress", value: "In Progress", icon: <FaBarsProgress /> },
  { title: "Done", value: "Done", icon: <IoMdDoneAll /> },
];

const List: FC<ListProps> = ({ list, setList }) => {
  const onDrop = (event: DragEvent, newStatus: string) => {
    event.preventDefault();
    const id = parseInt(event.dataTransfer.getData("id"), 10);

    setList((prevList: any) =>
      prevList.map((task: any) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-2">
        {statusList.map((status: any, ind: number) => (
          <div key={ind} className="col-sm-4 col-12" onDragOver={allowDrop} onDrop={(event) => onDrop(event, status.title)}>
            <Card title={status.title} icon={status.icon}>
              <div className="overflow-auto sc-l-height">
                <Division list={list.filter((task) => task.status === status.title)} setList={setList} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(List);
