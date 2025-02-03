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

const App = () => {
  const getStoredList = (): list[] => {
    const storedList = localStorage.getItem("list");
    return storedList ? JSON.parse(storedList) : [];
  };
  const [list, setList] = useState<list[]>(getStoredList())

  const onSubmit = (data: any) => {
    const formattedData: list = {
      id: list.length + 1,
      title: data.title,
      category: data.category?.map((cat: any) => cat.value) || [],
      status: (data.status as any)?.value || "",
    };
    localStorage.setItem("list", JSON.stringify(list))
    setList(prevList => [...prevList, formattedData])
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
