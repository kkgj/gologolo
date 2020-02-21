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
        // Border Radius
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_BORDER_RADIUS]);
        // Border Thickness
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_BORDER_THICKNESS]);
        // Border Color
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_BORDER_COLOR_PICKER]);
        // Padding
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, AppsterHTML.CLICK, this[GoLogoLoCallback.GOLOGOLO_PADDING]);
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
        //kk.style.visibility = "visible";
        kk.style.display = "inline-block";
        this.model.view.showDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        let yy = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON);
        //yy.style.visibility = AppsterHTML.HIDDEN;
        yy.style.display = "none";
    }

    processFontSize = () => {
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        let fontValue = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER).value;
        text.style.fontSize = fontValue + "%";
    }

    addFunction = () => {
        this.registerEditEventHandlers();
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        let slider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        slider.max = 700;
        slider.min = 100;
        text.style.fontSize = slider.value + "%";
        let borderRad = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        borderRad.max = 45;
        borderRad.min = 0;
        text.style.borderRadius = borderRad.value + "px";
        let borderThick = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        borderThick.max = 16;
        borderThick.min = 0;
        text.style.borderWidth = borderThick.value + "px";
        text.style.borderStyle = "solid";
        // Border Color
        let borderCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER).value;
        text.style.borderColor = borderCol;
        // Padding
        let padding1 = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER);
        padding1.max = 30;
        padding1.min = 0;
        text.style.padding = padding1.value + "px";
    }

    processBorderRadius = () => {
        let borderRad = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.borderRadius = borderRad.value + "px";
    }

    processBorderThickness = () => {
        let borderThick = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.borderWidth = borderThick.value + "px";
    } 

    processBorderColor = () => {
        let borderCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.borderColor = borderCol;
    }

    processPadding = () => {
        let padding1 = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.padding = padding1 + "px";
    }
}