const defaultState = {
    internet: true,
    id: 0,
    load: true,
    tickets: [],
    tickCount: 5,
    all: true,
    withOut: true,
    one: true,
    two: true,
    three: true,
    price: true,
    speed: false,
    optimal: false,
  };

const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case "TOGGLE_ALL":
        if (!state.all)
          return {
            ...state,
            all: true,
            withOut: true,
            one: true,
            two: true,
            three: true,
            tickCount: 5,
          };
        else
          return {
            ...state,
            all: false,
            withOut: false,
            one: false,
            two: false,
            three: false,
            tickCount: 5,
          };
      case "TOGGLE_WITHOUT":
        if (state.all)
          return {
            ...state,
            all: !state.all,
            withOut: !state.withOut,
            tickCount: 5,
          };
        if (!state.all && state.one && state.two && state.three)
          return {
            ...state,
            all: !state.all,
            withOut: !state.withOut,
            tickCount: 5,
          };
        return { ...state, withOut: !state.withOut, tickCount: 5 };
      case "TOGGLE_ONE":
        if (state.all)
          return { ...state, all: !state.all, one: !state.one, tickCount: 5 };
        if (!state.all && state.withOut && state.two && state.three)
          return { ...state, all: !state.all, one: !state.one, tickCount: 5 };
        return { ...state, one: !state.one, tickCount: 5 };
      case "TOGGLE_TWO":
        if (state.all)
          return { ...state, all: !state.all, two: !state.two, tickCount: 5 };
        if (!state.all && state.withOut && state.one && state.three)
          return { ...state, all: !state.all, two: !state.two, tickCount: 5 };
        return { ...state, two: !state.two, tickCount: 5 };
      case "TOGGLE_THREE":
        if (state.all)
          return { ...state, all: !state.all, three: !state.three, tickCount: 5 };
        if (!state.all && state.withOut && state.one && state.two)
          return { ...state, all: !state.all, three: !state.three, tickCount: 5 };
        return { ...state, three: !state.three, tickCount: 5 };
      case "ADD_TICKETS":
        return { ...state, tickets: [...state.tickets, ...action.payload] };
      case "ADD_ID":
        return { ...state, id: action.payload };
      case "MORE_TICKETS":
        return { ...state, tickCount: state.tickCount + 5 };
      case "TOGGLE_PRICE":
        return { ...state, price: true, speed: false, optimal: false };
      case "TOGGLE_SPEED":
        return { ...state, price: false, speed: true, optimal: false };
      case "TOGGLE_OPTIMAL":
        return { ...state, price: false, speed: false, optimal: true };
      case "IS_LOAD":
        return { ...state, load: action.payload };
        case "INTERNET_OFF":
            return {...state, internet: false};
            case "INTERNET_ON":
            return {...state, internet: true};
      default:
        return state;
    }
  };

  export default reducer