import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RoutesComponent } from "./components/routes";
import { Header } from "./layout/Header";
import { getUserData } from "./api/index";
import {
  setIsLogedInUserTrueAction,
  setIsLogedInUserFalseAction,
  setUserDataAction,
} from "./redux/actions/auth-actions";
import "./App.css"

function ConnectedApp({
  setIsLogedInUserTrue,
  setUserData,
}) {
  useEffect(() => {
    getUserData()
      .then((data) => {
        setUserData(data);
        setIsLogedInUserTrue();
      })
      .catch((err) => {
        console.log("🚀 ~ err", err);
      });
  }, [setUserData,setIsLogedInUserTrue]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <RoutesComponent />
      </BrowserRouter>
    </div>
  );
}

const App = connect(null, {
  setIsLogedInUserTrue: setIsLogedInUserTrueAction,
  setIsLogedInUserFalse: setIsLogedInUserFalseAction,
  setUserData: setUserDataAction,
})(ConnectedApp);

export default App;
