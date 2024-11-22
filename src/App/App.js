import Filters from "../Filters/Filters";
import Items from "../Items/Items";
import Buttons from "../Buttons/Buttons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cls from "./App.module.css";
import Loader from "../ui_components/spinner";
import NetWorkAlert from "../ui_components/Alert";


function App() {
  const dispatch = useDispatch();
  const { id, load, internet } = useSelector((state) => state);

  async function addId() {
    const promiseId = await fetch(
      "https://aviasales-test-api.kata.academy/search"
    );
    const id = await promiseId.json();
    dispatch({ type: "ADD_ID", payload: id.searchId });
  }

  async function addTickets() {
    if (id !== 0) {
      try {
        const promiseTickets = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`
        );
        const tickets = await promiseTickets.json();
        dispatch({ type: "ADD_TICKETS", payload: tickets.tickets });
        if (!tickets.stop) addTickets();
        if (tickets.stop) dispatch({ type: "IS_LOAD", payload: false });
      } catch (e) {
        if (e.name !== "TypeError") addTickets();
      }
    }
  }
  useEffect(() => {
    addId();
  }, []);

  useEffect(() => {
    addTickets();
  }, [id, internet]);

  useEffect(() => {
    window.onoffline = () => {
      dispatch({ type: "INTERNET_OFF" });
    };
    window.ononline = () => {
      dispatch({ type: "INTERNET_ON" });
    };
  });

  return (
    <div className={cls.app}>
      <div className={cls.header}> <img src='/Logo.svg'/></div>
      <div className={cls.content}>
      <Buttons />
      <div>
        <Filters />
        {load && internet ? <Loader /> : null}
        {internet ? null : <NetWorkAlert />}
        <Items />
      </div>
      </div>
    </div>
  );
}

export default App;
