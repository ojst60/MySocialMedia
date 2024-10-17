import { ChangeEvent, useReducer } from "react";

type IState = {
  username: string;
  password1: string;
  email: string;
};

type DispatchAction = {
  name: string;
  value: string;
};

interface IRegister extends IState {
  onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function useRegister(): IRegister {
  const [state, dispatch] = useReducer(
    (state: IState, action: DispatchAction) => {
      return {
        ...state,
        [action.name]: action.value,
      };
    },
    {
      username: "",
      email: "",
      password1: "",
    }
  );

  // Handles input field change
  function onFieldChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ name: e.target.name, value: e.target.value });
  }

  return {
    ...state,
    onFieldChange,
  };
}

export default useRegister;
