import { useEffect, useState } from "react";
import {
  formatBirthday,
  invertColor,
  swapCurrentAndPreviousState,
  checkIfBirthdayIsToday
} from "./utils";

const useUser = () => {
  // if this comes from outside, both
  // previousState and currentState would get this
  // value on loading
  const initialState = {
    name: "Elton John",
    birthday: new Date(),
    color: "#ffffff",
    invertedColor: invertColor("#ffffff"),
    formattedBirthday: formatBirthday(new Date())
  };
  const [userState, setState] = useState({
    previousState: initialState,
    currentState: initialState,
    editMode: false,
    prevStateAvilable: false,
    isBirthdayToday: false
  });
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const isBirthdayToday = checkIfBirthdayIsToday(
      userState.currentState.birthday
    );
    setState(state => ({
      ...state,
      isBirthdayToday
    }));
  }, [userState.currentState.birthday]);

  const updatePreviousState = ({ name, value }) => {
    setState(state => ({
      ...state,
      previousState: {
        ...state.previousState,
        [name]: value
      }
    }));
  };

  const undoChanges = () => {
    const { newCurrentState, newPreviousState } = swapCurrentAndPreviousState(
      userState.currentState,
      userState.previousState
    );

    setState(state => ({
      ...state,
      currentState: newCurrentState,
      previousState: newPreviousState
    }));
  };

  const handleOnBlur = () => {
    setState(state => ({
      ...state,
      editMode: false
    }));
  };

  const handleOnDateChange = birthday => {
    updatePreviousState({
      name: "birthday",
      value: userState.currentState.birthday
    });
    updatePreviousState({
      name: "formattedBirthday",
      value: userState.currentState.formattedBirthday
    });

    setState(state => ({
      ...state,
      currentState: {
        ...state.currentState,
        birthday,
        formattedBirthday: formatBirthday(birthday)
      },
      prevStateAvilable: true // as soon as something is changed, we have previous version as well
    }));
  };

  const handleOnColorChange = color => {
    // this is temp choice, save cahnges will save color userState
    console.log(color);
    setSelectedColor(color);
  }

  const updateColor = color => {

    updatePreviousState({ name: "color", value: userState.currentState.color });
    updatePreviousState({
      name: "invertedColor",
      value: userState.currentState.invertedColor
    });
    setState(state => ({
      ...state,
      currentState: {
        ...state.currentState,
        color,
        invertedColor: invertColor(color, 1)
      },
      prevStateAvilable: true
    }));
  };

  const updateEditMode = () => {
    if (userState.editMode && selectedColor &&
      selectedColor !== userState.currentState.color){
        updateColor(selectedColor);
        setSelectedColor("");
    }
    setState(state => ({
      ...state,
      editMode: !state.editMode
    }));
  };

  const handleOnNameChange = name => {
    updatePreviousState({ name: "name", value: userState.currentState.name });
    setState(state => ({
      ...state,
      currentState: {
        ...state.currentState,
        name
      },
      prevStateAvilable: true
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
    setState,
    updatePreviousState,
    updateColor,
    selectedColor
  };
};

export default useUser;
