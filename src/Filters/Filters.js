import { useDispatch, useSelector } from "react-redux";
import cls from "./Filters.module.css";

function Filters() {
  const dispatch = useDispatch();
  const { price, speed, optimal } = useSelector((state) => state);
  return (
      <div className={cls.filters}>
          <button
              onClick={() => dispatch({type: "TOGGLE_PRICE"})}
              className={price ? [cls.active, cls.filter].join(' ') : cls.filter}
          >
              Самый дешевый
          </button>
          <button
              onClick={() => dispatch({type: "TOGGLE_SPEED"})}
              className={speed ? [cls.active, cls.filter].join(' ') : cls.filter}
          >
              Самый быстрый
          </button>
          <button
              onClick={() => dispatch({type: "TOGGLE_OPTIMAL"})}
              className={optimal ? [cls.active, cls.filter].join(' ') : cls.filter}
          >
              Оптимальный
          </button>
      </div>
  );
}

export default Filters;
