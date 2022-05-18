import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles.css'

const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
  );
};
export const FilterSection = () => {
  return <div className="filter-section">
    <div className="filter-section-status">
      <p className="filter-section-status-p">Status</p>
      <button className="filter-section-status-btn">done</button>
      <button className="filter-section-status-btn">active</button>
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


