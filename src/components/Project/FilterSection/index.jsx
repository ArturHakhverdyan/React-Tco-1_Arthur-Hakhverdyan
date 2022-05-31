import { useCallback, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "reactstrap";
import { BACKEND_URL } from "../../../consts";
import { DatePickCompletedGte, DatePickCompletedLte, DatePickCreateGte, DatePickCreateLte } from "../../DatePick";
import './styles.css'


export const FilterSection = ({tasks,setTasks,setFilterField}) => {


  
  const [createLte, setCreateLte] = useState(new Date())
  const [createGte, setCreateGte] = useState(new Date())
  const [completeLte, setCompleteLte] = useState(new Date())
  const [completeGte, setCompleteGte] = useState(new Date())

  const handleCreateLte = useCallback((date) => {
    setCreateLte(date)
    setFilterField(['create_lte', createLte])
  }, [createLte,setFilterField])

  const handleCreateGte = useCallback((date) => {
    setCreateGte(date)
    setFilterField(['create_gte', createGte])
  }, [createGte,setFilterField])

  const handleCompletedLte = useCallback((date) => {
    setCompleteLte(date)
    setFilterField(['complete_lte', completeLte])
  }, [completeLte,setFilterField])

  const handleCompletedGte =useCallback((date) => {
    setCompleteGte(date)
    setFilterField(['complete_gte', completeGte])
  },[completeGte,setFilterField])

  const showDoneStatus = () => {

    fetch(`${BACKEND_URL}/task?status=done`)
    .then(res => res.json())
    .then(data => setTasks(data))
  }

  const showActiveStatus = () => {
    fetch(`${BACKEND_URL}/task?status=active`)
    .then(res => res.json())
    .then(data => setTasks(data))
  }

  return <div className="filter-section">
    <div className="filter-section-status">
      <p className="filter-section-status-p">Status</p>
      <Button color='info' onClick = {showDoneStatus} style = {{marginRight:'20px',border:'1px solid black',borderRadius:'25px',width:'100px'}}>Done</Button>
      <Button color='info' onClick={showActiveStatus} style = {{border:'1px solid black',borderRadius:'25px',width:'100px'}}>Active</Button>
    </div>
    <div className="filter-section-date">
      <p>create_lte</p>
      <DatePickCreateLte createLte = {createLte}  handleCreateLte={handleCreateLte}/>
    </div>
    <div className="filter-section-date">
      <p>create_gte</p>
      <DatePickCreateGte createGte = {createGte} handleCreateGte = {handleCreateGte} />
    </div>
    <div className="filter-section-date">
      <p>complete_lte</p>
      <DatePickCompletedLte completeLte = {completeLte} handleCompletedLte = {handleCompletedLte}/>
    </div>
    <div className="filter-section-date">
      <p>complete_gte</p>
      <DatePickCompletedGte completeGte = {completeGte} handleCompletedGte = {handleCompletedGte}/>
    </div>
  </div>;
};


