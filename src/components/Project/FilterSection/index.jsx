import *as moment from "moment";
import {  useCallback, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import {  FILTER_DATE_PICKERS } from "../../../consts";
import {  getTasksStatusThunk } from "../../../redux/actions/task-actions";
import { DatePick } from "../../DatePick";
import './styles.css'

 const FilterSectionConnected = ({setFilterField,setTasks,getTaskStatus}) => {

  
  const createdLte = useState(new Date());
  const createdGte = useState(new Date());
  const completedLte = useState(new Date());
  const completedGte = useState(new Date());
  
  const getFilterState = useCallback(
    (name) => {
      switch (name) {
        case "create_lte":
          return createdLte;
        case "create_gte":
          return createdGte;
        case "complete_lte":
          return completedLte;
        case "complete_gte":
          return completedGte;
        default:
          return null;
      }
    },
    [createdLte, createdGte, completedLte, completedGte]
  );
  

  const showDoneStatus = (e) => {
    const status = e.target.innerHTML.toLowerCase()

    getTaskStatus(status)
  }

  // const showActiveStatus = () => {
  //   fetch(`${BACKEND_URL}/task?status=active`)
  //   .then(res => res.json())
  //   .then(data => setTasks(data))
  // }

  return <div className="filter-section">
    <div className="filter-section-status">
      <p className="filter-section-status-p">Status</p>
      <Button color='info' onClick = {showDoneStatus} style = {{marginRight:'20px',border:'1px solid black',borderRadius:'25px',width:'100px'}}>Done</Button>
      <Button color='info' onClick={showDoneStatus} style = {{border:'1px solid black',borderRadius:'25px',width:'100px'}}>Active</Button>
    </div>
   <div>
      {FILTER_DATE_PICKERS.map((pickerData,index) => {
        const[date,setDate] = getFilterState(pickerData.value)
      
      return (
        <div key={index}>
          <p>
            {pickerData.label}
          </p>
          <DatePick 
          startDate={date}
          setStartDate = {(date) => {
            setDate(date)
            setFilterField([
              pickerData.value,
              moment(date).format("YYYY-MM-DD")
            ])
          }}
          name ={pickerData.value}
          /> 
          <button
              onClick={() => {
                setDate(new Date());
                setFilterField([pickerData.value, ""]);
              }}
            >
              Reset
            </button>
        </div>
      )
      })}
      
   </div>
  </div>;
};

export const FilterSection = connect(null, {
  getTaskStatus:getTasksStatusThunk
})(FilterSectionConnected)

