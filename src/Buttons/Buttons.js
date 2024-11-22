import { useDispatch, useSelector } from "react-redux";
import cls from "./Buttons.module.css";

function Buttons() {
  const dispatch = useDispatch();
  const { all, withOut, one, two, three } = useSelector((state) => state);
  const toggleAll = () => {
    dispatch({ type: "TOGGLE_ALL" });
  };
  const toggleWithOut = () => {
    dispatch({ type: "TOGGLE_WITHOUT" });
  };
  const toggleOne = () => {
    dispatch({ type: "TOGGLE_ONE" });
  };
  const toggleTwo = () => {
    dispatch({ type: "TOGGLE_TWO" });
  };
  const toggleThree = () => {
    dispatch({ type: "TOGGLE_THREE" });
  };

  return (
    <div className={cls.buttons}>
      <span className={cls.label}>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
      <div className={cls.button} onClick={() => toggleAll()}>
        <input className={cls.input} type="checkbox" checked={all} />
        <span>Все</span>
      </div>
      <div className={cls.button} onClick={() => toggleWithOut()}>
        <input  className={cls.input} type="checkbox" checked={withOut} />
        <span>Без пересадок</span>
      </div>
      <div className={cls.button} onClick={() => toggleOne()}>
        <input className={cls.input} type="checkbox" checked={one} />
        <span>1 пересадка</span>
      </div>
      <div className={cls.button} onClick={() => toggleTwo()}>
        <input className={cls.input} type="checkbox" checked={two} />
        <span>2 пересадки</span>
      </div>
      <div className={cls.button} onClick={() => toggleThree()}>
        <input className={cls.input} type="checkbox" checked={three} />
        <span>3 пересадки</span>
      </div>
    </div>
  );
}

export default Buttons;
