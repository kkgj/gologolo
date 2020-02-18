import AppsterController from '../appster/AppsterController.js'
import {AppsterHTML, AppsterGUIId, AppsterCallback} from '../appster/AppsterConstants.js'
import { GoLogoLoGUIId, GoLogoLoCallback } from './GoLogoLoConstants.js';


export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    registerEditEventHandlers(){
        // Enter
        console.log("Hi");
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_EDIT_TEXT_BUTTON]);   
        //this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, AppsterHTML.SLI, this[GoLogoLoCallback.GOLOGOLO_FONT_SIZE]);
    }

    processEnterButton = () => {
        let textField = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD).value;
        this.model.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        if(textField.length < 1 || this.model.getRecentWork(textField) !== null){
            this.model.view.showDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL);
        } else {
            this.model.addToList(textField);
            this.model.view.refreshRecentWork(this.model.recentWork); 
        }
    }

    processEditText() {
        console.log("Text");
        this.model.view.showDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL2);
        this.model.updateText();
    }

    processFontSize = () => {
    }

    addFunction= () => {
        this.registerEditEventHandlers();
    }


}