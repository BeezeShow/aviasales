import cls from "./Items.module.css";
import { useDispatch, useSelector } from "react-redux";

function Items() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const stopsValidation = (n) => {
    if (n === 1) return "пересадка";
    else if (n === 2 || n === 3 || n === 4) return "пересадки";
    else return "пересадок";
  };

  const dateValidation = (date, duration) => {
    const h =
      new Date(date).getHours() < 10
        ? "0" + new Date(date).getHours()
        : new Date(date).getHours();
    const m =
      new Date(date).getMinutes() < 10
        ? "0" + new Date(date).getMinutes()
        : new Date(date).getMinutes();
    const time1 = [h, m].join(":");
    const date2 = new Date(new Date(date).getTime() + duration * 60000);
    const h2 =
      new Date(date2).getHours() < 10
        ? "0" + new Date(date2).getHours()
        : new Date(date2).getHours();
    const m2 =
      new Date(date2).getMinutes() < 10
        ? "0" + new Date(date2).getMinutes()
        : new Date(date2).getMinutes();
    const time2 = [h2, m2].join(":");
    return [time1, time2];
  };

  const ticketsFilter = (tickets) => {
    if (tickets.length) {
      const tickClone = tickets.slice(0);
      const one = state.one
        ? tickClone.filter(
            (el) =>
              el.segments[0].stops.length === 1 &&
              el.segments[1].stops.length === 1
          )
        : [];
      const two = state.two
        ? tickClone.filter(
            (el) =>
              el.segments[0].stops.length === 2 &&
              el.segments[1].stops.length === 2
          )
        : [];
      const three = state.three
        ? tickClone.filter(
            (el) =>
              el.segments[0].stops.length === 3 &&
              el.segments[1].stops.length === 3
          )
        : [];
      const withOut = state.withOut
        ? tickClone.filter(
            (el) =>
              el.segments[0].stops.length === 0 &&
              el.segments[1].stops.length === 0
          )
        : [];
      const fullTickArr = state.all
        ? tickClone
        : [...one, ...two, ...three, ...withOut];
      if (fullTickArr.length === 0) return;
      if (state.price) fullTickArr.sort((a, b) => (a.price > b.price ? 1 : -1));
      if (state.speed)
        fullTickArr.sort((a, b) =>
          a.segments[0].duration + a.segments[1].duration >
          b.segments[0].duration + b.segments[1].duration
            ? 1
            : -1
        );
      return fullTickArr.slice(0, state.tickCount);
    }
  };

  const moreTickClick = () => {
    dispatch({ type: "MORE_TICKETS" });
  };
  
  let tickets = [];
  if (
    (state.all || state.one || state.two || state.three || state.withOut) &&
    state.tickets.length !== 0
  ) {
    let key = 1;
    for (let el of ticketsFilter(state.tickets)) {
      tickets.push(
        <div key={key} className={cls.item}>
          <div className={cls.price}>
            <div className={cls.cost}>{el.price} Р</div>
            <img src={"//pics.avs.io/99/36/" + el.carrier + ".png"} alt="img"></img>
          </div>
          <div className={cls.info}>
            <div className={cls.gray}>
              {el.segments[0].origin} - {el.segments[0].destination}
            </div>
            <div className={cls.gray}>В пути</div>
            <div className={cls.gray}>
              {el.segments[0].stops.length}{" "}
              {stopsValidation(el.segments[0].stops.length)}
            </div>
            <div>
              {dateValidation(
                el.segments[0].date,
                el.segments[0].duration
              ).join("-")}
            </div>
            <div>
              {Math.floor(el.segments[0].duration / 60)}ч{" "}
              {Math.floor(
                el.segments[0].duration -
                  Math.floor(el.segments[0].duration / 60) * 60
              )}
              м
            </div>
            <div>{el.segments[0].stops.join(" ")}</div>
          </div>
          <div className={cls.info}>
            <div className={cls.gray}>
              {el.segments[1].origin} - {el.segments[1].destination}
            </div>
            <div className={cls.gray}>В пути</div>
            <div className={cls.gray}>
              {el.segments[1].stops.length}{" "}
              {stopsValidation(el.segments[1].stops.length)}
            </div>
            <div>
              {dateValidation(
                el.segments[1].date,
                el.segments[1].duration
              ).join("-")}
            </div>
            <div>
              {Math.floor(el.segments[1].duration / 60)}ч{" "}
              {Math.floor(
                el.segments[1].duration -
                  Math.floor(el.segments[1].duration / 60) * 60
              )}
              м
            </div>
            <div>{el.segments[1].stops.join(" ")}</div>
          </div>
        </div>
      );
      key++;
    }
  } else if (state.tickets.length !== 0)
    return (
      <div className={cls.not_res}>
        Рейсов, подходящих под заданные фильтры, не найдено
      </div>
    );
  return (
    <>
      {tickets}
      {tickets.length !== 0 ? (
        <button className={cls.moreTickButton} onClick={() => moreTickClick()}>
          Показать еще 5 билетов
        </button>
      ) : null}
    </>
  );
}

export default Items;
