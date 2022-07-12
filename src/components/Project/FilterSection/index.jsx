import *as moment from "moment";
import { useCallback, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { FILTER_DATE_PICKERS } from "../../../consts";
import { getTasksStatusThunk, logOutThunk } from "../../../redux/actions/task-actions";
import { DatePick } from "../../DatePick";
import { useNavigate } from 'react-router-dom';

import './styles.css'

const FilterSectionConnected = ({ setFilterField, getTaskStatus, logOut }) => {
  const navigate = useNavigate()

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

  const onLogOut = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    logOut(token)
    navigate("/login")
  }

  return (
    <div className="filter-section">
      <i className='bx log bx-log-out' onClick={onLogOut}>log out</i>
      <div className='inner-filter-section'>
        {FILTER_DATE_PICKERS.map((pickerData, index) => {
          const [date, setDate] = getFilterState(pickerData.value);

          return (

            <div  className='datapicker-section' key={index}>

              <span>{pickerData.label}</span>
              <span className='reset-pick'>   <i className='bx reset bxs-message-rounded-x'
                onClick={() => {
                  setDate(new Date());
                  setFilterField([pickerData.value, ""]);
                }}
              > 
              </i></span>
              <DatePick
                startDate={date}
                setStartDate={(date) => {
                  setDate(date);
                  setFilterField([
                    pickerData.value,
                    moment(date).format("YYYY-MM-DD"),
                  ]);
                }}
                name={pickerData.value}
              />

            </div>

          );

        })}

        <div className='status-section'>
          <p>Status</p>
          <div className='status-btn'>
            <Button style={{ margin: "10px" }} onClick={showDoneStatus}>Done</Button>
            <Button onClick={showDoneStatus}>Active</Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export const FilterSection = connect(null, {
  getTaskStatus: getTasksStatusThunk,
  logOut: logOutThunk
})(FilterSectionConnected)

