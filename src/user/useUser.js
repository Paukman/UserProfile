import { useEffect, useState } from "react";
import {
  formatBirtday,
  invertColor,
  swapCurrentAndPreviousState,
} from "./utils";

const useUser = () => {
  // if this comes from outside, both
  // previousState and currentState would get this
  // value on loading
  const initialState = {
    name: "My name is initial name",
    birthday: new Date(),
    color: "#ffffff",
    invertedColor: invertColor("#ffffff"),
    formattedBirthday: formatBirtday(new Date()),
  };
  const [userState, setState] = useState({
    previousState: initialState,
    currentState: initialState,
    editMode: false,
    prevStateAvilable: false,
    isBirthdayToday: false,
  });

  useEffect(() => {
    const today = new Date();
    const isBirthdayToday =
      today.getDate() === userState.currentState.birthday.getDate() &&
      today.getMonth() === userState.currentState.birthday.getMonth();
    setState((state) => ({
      ...state,
      isBirthdayToday,
    }));
  }, [userState.currentState.birthday]);

  const updatePreviousState = ({ name, value }) => {
    setState((state) => ({
      ...state,
      previousState: {
        ...state.previousState,
        [name]: value,
      },
    }));
  };

  const undoChanges = () => {
    const { currentState, previousState } = swapCurrentAndPreviousState(
      userState.currentState,
      userState.previousState
    );
    setState((state) => ({
      ...state,
      currentState,
      previousState,
    }));
  };

  const updateEditMode = () => {
    setState((state) => ({
      ...state,
      editMode: !state.editMode,
    }));
  };

  const handleOnBlur = () => {
    setState((state) => ({
      ...state,
      editMode: false,
    }));
  };

  const handleOnDateChange = (birthday) => {
    updatePreviousState("birthday", userState.birthday);
    updatePreviousState("formattedBirthday", userState.formattedBirthday);

    setState((state) => ({
      ...state,
      currentState: {
        ...state.currentState,
        birthday,
        formattedBirthday: formatBirtday(birthday),
      },
      prevStateAvilable: true, // as soon as something is changed, we have previous version as well
    }));
  };

  const handleOnColorChange = (color) => {
    updatePreviousState("color", userState.color);
    updatePreviousState("invertedColor", userState.invertedColor);
    setState((state) => ({
      ...state,
      currentState: {
        ...state.currentState,
        color: color,
        invertedColor: invertColor(color, 1),
      },
      prevStateAvilable: true,
    }));
  };

  const handleOnNameChange = (name) => {
    updatePreviousState("name", userState.name);
    setState((state) => ({
      ...state,
      currentState: {
        ...state.currentState,
        name,
      },
      prevStateAvilable: true,
    }));
  };

  return {
    userState,
    handleOnBlur,
    handleOnDateChange,
    handleOnColorChange,
    handleOnNameChange,
    updateEditMode,
    undoChanges,
  };
};

export default useUser;
