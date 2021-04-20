import React from "react";
import { render, act } from "@testing-library/react";
import UserProvider, { UserContext } from "./UserProvider";

describe(">> UserProvider tests", () => {
 
  it(">> should render children ", async () => {
    let component;
    await act(async () => {
      component = render(
          <UserProvider>
            <div />
          </UserProvider>
      );
      return component;
    });
    expect(component.container.hasChildNodes()).toBe(true);
  });

  it(">> the context is exported and should render children ", async () => {
    const { container } = render(
      <UserContext.Provider>
        <div />
      </UserContext.Provider>
    );
    expect(container.hasChildNodes()).toBe(true);
  });
});
