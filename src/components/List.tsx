import { DragEvent, FC, memo } from "react";
import Division from "./Division";
import Card from "./Card";
import { FaBarsProgress } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { IoMdDoneAll } from "react-icons/io";
import { BsMenuButton } from "react-icons/bs";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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

  const data = [
    { name: "To Do", value: list.filter((i) => i.status === "To Do").length },
    { name: "In Progress", value: list.filter((i) => i.status === "In Progress").length },
    { name: "Done", value: list.filter((i) => i.status === "Done").length },
  ];
  const COLORS = ["#FF6384", "#36A2EB", "#4CAF50"];

  return (
    <div className="container-fluid p-0">
      <div className="row g-2">
        <div className="col-sm-3 col-12">
          <Card title="Dashboard" icon={<BsMenuButton />}>
            <div className="overflow-auto sc-l-height">
              <div className="card mb-3">
                <div className="card-body">
                  <h4>Total Tasks Created: {list.length}</h4>
                  {data.map(i => (
                    <h6>{i.name} Tasks: {i.value}</h6>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="card-header">Chart</div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </Card>
        </div>
        {statusList.map((status: any, ind: number) => (
          <div key={ind} className="col-sm-3 col-12" onDragOver={allowDrop} onDrop={(event) => onDrop(event, status.title)}>
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
