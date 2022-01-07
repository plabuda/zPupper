

type boolHandlerType = (() => boolean);

let dummyHandler: boolHandlerType = () => false;

export class WindowInterface {
    private readonly InputForm: HTMLFormElement;
    OnSubmitHandler = dummyHandler;

    constructor() {
        const inputForm = document.getElementsByTagName('form').item(0);
        if (inputForm instanceof HTMLFormElement) {
            this.InputForm = inputForm;
            inputForm.onsubmit = (event) => { return this.OnSubmitHandler(); };
        } else {
            throw "inputForm was null";
        }
    }
}