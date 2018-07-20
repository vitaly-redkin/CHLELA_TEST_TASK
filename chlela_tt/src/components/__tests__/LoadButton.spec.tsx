import * as React from "react";
import { shallow } from "enzyme";

import {LoadButton} from "../loadbutton/LoadButton";
import {acceptFile} from "../../util/Util";

const pngFile = new File(["111"], "test.png", {type: "image/png"});
const txtFile = new File(["111"], "test.txt", {type: "text/plain"});

[null, pngFile, txtFile].forEach( (file) => {
    const wrapper = shallow(<LoadButton file={file}/>);
    const loadButton = wrapper.find('#loadButton');
    const clearButton = wrapper.find('#clearButton');

//    console.log(wrapper.debug());

    // No sense to check if buttons are rendered every time
    if (file === null)
    {
        it("Renders the Load button", () => {
            expect(loadButton.length === 1).toBeTruthy();
        });

        it("Renders the Clear button", () => {
            expect(clearButton.length === 1).toBeTruthy();
        });
    }

    const fileProvided = (file !== null);
    it("Clear button is " + (fileProvided ? "enabled for uploaded file" : "disabled for empty file"), () => {
        expect(clearButton.props().disabled).toEqual(!fileProvided);
    });

    if (fileProvided) {
        const fileNameUp = file.name.toUpperCase();
        const accepted = 
            fileNameUp.endsWith(".PNG") || 
            fileNameUp.endsWith(".GIF") ||
            fileNameUp.endsWith(".JPG") ||
            fileNameUp.endsWith(".JPEG");
        it(file.name + (accepted ? " is accepted" : " is rejected"), () => {
            expect(acceptFile(file)).toEqual(accepted);
        });
    }

});