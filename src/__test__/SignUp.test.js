/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../container/SignUp';
import { render, cleanup } from '@testing-library/react'
//import "jest-dom/extend-expect";
import renderer from 'react-test-renderer'

afterEach(cleanup)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignUp></SignUp>, div)
})
it("renders button correctly", () => {
    const { getByTestId } = render(<SignUp></SignUp>)
    expect(getByTestId('button')).toHaveTextContent("Register")
});
it("matches snapshot", () => {
    const tree = renderer.create(<SignUp></SignUp>).toJSON();
    expect(tree).toMatchSnapshot();
})
//<Button active={true} onClick={onSubmitSignIn} type="submit" label="Log In" primary /