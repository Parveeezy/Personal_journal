export const INITIAL_STATE = {
  isValid: {
    text: true,
    title: true,
    date: true,
  },
  values: {
    text: "",
    title: "",
    date: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE": {
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    }
    case "CLEAR": {
      return { ...state, values: INITIAL_STATE.values };
    }
    case "RESET_VALIDATY": {
      return { ...state, isValid: INITIAL_STATE.isValid };
    }
    case "SUBMIT": {
      const titleValidity = state.values.title?.trim().length;
      const textValidity = state.values.text?.trim().length;
      const dateValidity = state.values.date;
      return {
        ...state,
        isValid: {
          text: textValidity,
          title: titleValidity,
          date: dateValidity,
        },
        isFormReadyToSubmit: titleValidity && textValidity && dateValidity,
      };
    }
  }
};
