import { FC, memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineAddToPhotos } from "react-icons/md";
import Select from "react-select";

interface TaskFormData {
    title: string;
    category?: { label: string; value: string }[];
    status: { label: string; value: string };
}

interface FormProps {
    onSubmit: (data: TaskFormData) => void;
    item?: any;
}

const categories = [
    { label: "Choose Categories", value: "" },
    { label: "React", value: "React" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "HTML5", value: "HTML5" },
    { label: "Css3", value: "Css3" },
    { label: "Redux", value: "React" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Tailwind", value: "Tailwind" },
    { label: "Bootstrap", value: "Bootstrap" }
];

export const statuses = [
    { label: "Choose Status", value: "" },
    { label: "To Do", value: "To Do" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" },
];

const Form: FC<FormProps> = ({ onSubmit, item }) => {
    const { register, control, handleSubmit, reset } = useForm<TaskFormData>();

    const fSubmit = (data: any) => {
        onSubmit(data)
        reset({
            title: '',
            category: [],
            status: { label: "Choose Status", value: "" }
        });
    }
    
    return (
        <form onSubmit={handleSubmit(fSubmit)} className="row g-3">
            <div className="col-12">
                <label className="form-label">Title</label>
                <input {...register("title", { required: true })} type="text" className="form-control" placeholder="Title" />
            </div>
            <div className="col-sm-6 col-12">
                <label className="form-label">Category</label>
                <Controller name="category" control={control} render={({ field }) => (<Select {...field} options={categories} isMulti />)} />
            </div>
            <div className="col-sm-6 col-12">
                <label className="form-label">Status</label>
                <Controller name="status" control={control} render={({ field }) => (<Select {...field} options={statuses} />)} />
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit"><MdOutlineAddToPhotos /> Add</button>
            </div>
        </form>

    );
};

export default memo(Form);
