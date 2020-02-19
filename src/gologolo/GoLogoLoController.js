import AppsterController from '../appster/AppsterController.js'
import {AppsterHTML, AppsterGUIId, AppsterCallback} from '../appster/AppsterConstants.js'
import { GoLogoLoGUIId, GoLogoLoCallback, GoLogoLoText } from './GoLogoLoConstants.js';

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    registerEditEventHandlers(){
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_EDIT_TEXT]);   
        this.registerEventHandler(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON2, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_EDIT_ENTER]);   
        // Font 
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_FONT_SIZE]);
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

    processEditEnter = () => {
        let textField = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD).value;
        this.model.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        let text1 = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        if(textField.length < 1){
            text1.innerHTML = '&nbsp;';
        } else {
            text1.textContent = textField;
        }
    }

    processEditText = () => {
        let kk = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON2);
        kk.style.visibility = "show";
        this.model.view.showDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        let yy = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON);
        yy.style.visibility = AppsterHTML.HIDDEN;
    }

    processFontSize = () => {
        let fontsize = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        let fontValue = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER).value;
        fontsize.style.fontSize = fontValue + "%";
    }

    addFunction = () => {
        this.registerEditEventHandlers();
        let fontsize = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        let slider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        slider.max = 600;
        slider.min = 100;
        fontsize.style.fontSize = slider.value + "%";
    }
}