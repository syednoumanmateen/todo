import { useEffect, useState } from 'react'
import './App.css'
import Form from './components/Form'
import List from './components/List'

interface list {
  id: number;
  title: string;
  category?: Array<any>;
  status: string
}

export const formattedData = (data: any, list?: any) => {
  let objData: any = {
    id: list,
    title: data.title,
    category: data.category?.map((cat: any) => cat.value) || [],
    status: (data.status as any)?.value || ""
  }

  if (list && list.length) {
    objData.id = list.length + 1
    objData.category = data.category?.map((cat: any) => cat.value) || []
    objData.status = (data.status as any)?.value || ""
  }

  return objData
};

const App = () => {
  const getStoredList = (): list[] => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  };
  const [list, setList] = useState<list[]>(getStoredList())

  const onSubmit = (data: any) => {
    const updatedData = formattedData(data, list)
    localStorage.setItem("list", JSON.stringify(list))
    setList(prevList => [...prevList, updatedData])
  }

  useEffect(() => {
    getStoredList()
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  return (
    <>
      <div className="container-fluid px-md-5">
        <nav className='d-flex justify-content-center'>
          <h3 className="p-3">To DO Project</h3>
        </nav>
        <div className="mb-5 sc-f-height">
          <h5>Form</h5>
          <hr />
          <Form onSubmit={onSubmit} />
        </div>
        <div className='sc-l-height'>
          <h5>List</h5>
          <hr />
          <List list={list} setList={setList} />
        </div>
      </div>
    </>
  )
}

export default App
