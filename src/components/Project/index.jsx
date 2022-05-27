import { useCallback, useEffect, useState } from "react";
import { getTasksRequest } from "../../api";
import { generateQuery } from "../../helpers";
import { FilterSection } from "./FilterSection";
import { MainSection } from "./MainSection";

import "./styles.css";

export const Project = () => {
  const [tasks, setTasks] = useState([])
  const [queryObject, setQueryObject] = useState({})
  const [createLte , setCreateLte] = useState(new Date())
  const [createGte , setCreateGte] = useState(new Date())
  const [completedLte , setCompletedLte] = useState(new Date())
  const [completedGte , setSompletedGte] = useState(new Date())




  useEffect(() => {
    const query = generateQuery(queryObject)
    getTasksRequest(query).then((data) => {
      setTasks(data)
    })
  }, [queryObject])

  const setFilterField = useCallback((filterEntries) => {
    const [name, value] = filterEntries
    setQueryObject((prev) => {
      if (!value) {
        const newQueryObject = { ...prev }
        delete newQueryObject[name]
        return newQueryObject
      }
      if (prev[name] !== value) {
        return {
          ...prev,
          [name]: value
        }
      }
    })
  }, [])
  return (
    <div className="project-layout">
      <FilterSection 
      tasks={tasks}
      setTasks={setTasks} 
      createLte = {createLte}
      setCreateLte = {setCreateLte}
      createGte = {createGte}
      setCreateGte = {setCreateGte}
      completedLte = {completedLte}
      setCompletedLte = {setCompletedLte}
      completedGte = {completedGte}
      setSompletedGte = {setSompletedGte}

       />
      <MainSection tasks={tasks} setTasks={setTasks} setFilterField={setFilterField} />
    </div>
  );
};
