import React from "react";
import PropTypes from "prop-types";
import { renderHook, act } from "@testing-library/react-hooks";
import useUser from "./useUser";

describe("Testing useUser hook", () => {
  it("should update previous state", async () => {
    const { result } = renderHook(() => useUser());
    await act(async () => {
      result.current.updatePreviousState({
        name: "color",
        value: "myColor"
      });
    });

    expect(result.current.userState.previousState).toEqual(
      expect.objectContaining({ color: "myColor" })
    );
  });

  it("should undo changes", async () => {
    const { result } = renderHook(() => useUser());
    await act(async () => {
      result.current.updatePreviousState({
        name: "color",
        value: "myColor"
      });
    });

    await act(async () => {
      result.current.undoChanges();
    });

    expect(result.current.userState.previousState).not.toEqual(
      expect.objectContaining({ color: "myColor" })
    );
    expect(result.current.userState.currentState).toEqual(
      expect.objectContaining({ color: "myColor" })
    );
  });

  it("should update edit mode", async () => {
    const { result } = renderHook(() => useUser());
    await act(async () => {
      result.current.updateEditMode();
    });

    expect(result.current.userState.editMode).toEqual(true);
    await act(async () => {
      result.current.updateEditMode();
    });

    expect(result.current.userState.editMode).toEqual(false);
  });

  it("should update edit mode", async () => {
    const { result } = renderHook(() => useUser());
    await act(async () => {
      result.current.setState(state => ({
        ...state,
        editMode: true
      }));
    });

    expect(result.current.userState.editMode).toEqual(true);
    await act(async () => {
      result.current.handleOnBlur();
    });

    expect(result.current.userState.editMode).toEqual(false);
  });

  it("should handle color change", async () => {
    const { result } = renderHook(() => useUser());
    await act(async () => {
      result.current.setState(state => ({
        ...state,
        currentState: {
          ...state.currentState,
          color: "Color",
          invertedColor: "invColor"
        }
      }));
    });

    await act(async () => {
      result.current.handleOnColorChange("#98a66b");
    });

    expect(result.current.userState.currentState.color).toEqual(
      "#98a66b"
    );
    expect(result.current.userState.currentState.invertedColor).toEqual(
      "#FFFFFF"
    );
    expect(result.current.userState.previousState.color).toEqual(
      "Color"
    );
    expect(result.current.userState.previousState.invertedColor).toEqual(
      "invColor"
    );
    expect(result.current.userState.prevStateAvilable).toEqual(true);
  });
  it("should handle name change", async () => {
    const { result } = renderHook(() => useUser());
    await act(async () => {
      result.current.setState(state => ({
        ...state,
        currentState: {
          ...state.currentState,
          name: "Name",
          
        }
      }));
    });

    await act(async () => {
      result.current.handleOnNameChange("New Name");
    });

    expect(result.current.userState.currentState.name).toEqual(
      "New Name"
    );
   expect(result.current.userState.previousState.name).toEqual(
      "Name"
    );
    expect(result.current.userState.prevStateAvilable).toEqual(true);
  });
});
