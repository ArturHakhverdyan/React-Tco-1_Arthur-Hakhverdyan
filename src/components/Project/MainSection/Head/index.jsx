
import { HeadRight } from "./HeadRight";
import "./styles.css";
export const Head = ({setFilterField}) => {
  
  return <div className="main-section-head">

        <HeadRight  setFilterField = {setFilterField}/>
  </div>;
};
