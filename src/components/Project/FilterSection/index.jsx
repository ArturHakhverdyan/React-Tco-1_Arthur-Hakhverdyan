import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "reactstrap";
import { BACKEND_URL } from "../../../consts";
import './styles.css'

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
  );
};
export const FilterSection = ({tasks,setTasks}) => {
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
      <Example />
    </div>
    <div className="filter-section-date">
      <p>create_gte</p>
      <Example />
    </div>
    <div className="filter-section-date">
      <p>complete_lte</p>
      <Example />
    </div>
    <div className="filter-section-date">
      <p>complete_gte</p>
      <Example />
    </div>
  </div>;
};


