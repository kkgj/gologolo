import AppsterController from '../appster/AppsterController.js'
import {AppsterHTML, AppsterGUIId, AppsterCallback, AppsterGUIClass} from '../appster/AppsterConstants.js'
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
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_FONT_SIZE]);
        // Border Radius
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_BORDER_RADIUS]);
        // Border Thickness
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_BORDER_THICKNESS]);
        // Border Color
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_BORDER_COLOR]);
        // Padding
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_PADDING]);
        // Margin
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER, AppsterHTML.INPUT, this[GoLogoLoCallback.GOLOGOLO_MARGIN]);
        // Text Color
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_TEXT_COLOR]);
        // Background Color
        this.registerEventHandler(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER, AppsterHTML.CHANGE, this[GoLogoLoCallback.GOLOGOLO_BACKGROUND_COLOR]);

    }

    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processEnterButton = () => {
        let textField = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD).value.trim();
        this.model.view.hideDialog(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        let footer = document.getElementById(AppsterGUIId.APPSTER_CONFIRM_MODAL_FOOTER);
        let text = document.getElementById(AppsterGUIId.APPSTER_CONFIRM_MODAL_TEXT);
        textField = textField.replace(/  +/g, ' ');
        if(textField.length < 1) {
            footer.innerHTML = "Empty Name";
            text.innerHTML = "Illegal Name, logo name is empty";
            this.model.view.showDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL);
        } else if (this.model.getRecentWork(textField) !== null) {
            footer.innerHTML = "Duplicate Name";
            text.innerHTML = "Illegal Name, logo already exists with that name";
            this.model.view.showDialog(AppsterGUIId.APPSTER_CONFIRM_MODAL);
        } else {
            this.model.addToList(textField);
            // START EDITING THE SELECTED WORK
            this.model.editWork(textField);
            this.addFunction();
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
            this.model.workToEdit.setText(textField);
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
        if(yy.style.display === "none"){
            let textValue = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_TEXTFIELD);
            let originalText = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT).textContent;
            textValue.value = originalText;
        }
        let footer = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_FOOTER);
        footer.textContent = "Editing Logo Name";
    }

    processFontSize = () => {
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        let fontValue = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER).value;
        text.style.fontSize = fontValue + "%";
        this.model.workToEdit.setFontSize(fontValue);
    }

    addFunction = () => {
        this.registerEditEventHandlers();
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        let slider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        slider.max = 550;
        slider.min = 100;
        text.style.fontSize = slider.value + "%";
        let borderRad = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        borderRad.max = 70;
        borderRad.min = 0;
        text.style.borderRadius = borderRad.value + "px";
        let borderThick = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        borderThick.max = 30;
        borderThick.min = 0;
        text.style.borderWidth = borderThick.value + "px";
        text.style.borderStyle = "solid";
        // Border Color
        let borderCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER).value;
        text.style.borderColor = borderCol;
        // Padding
        let padding1 = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER);
        padding1.max = 45;
        padding1.min = 0;
        text.style.padding = padding1.value + "px";
        // Margin
        let marg = document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER);
        marg.max = 200;
        marg.min = 0;
        text.style.margin = marg.value + "px";
        // Text Color
        let textCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER).value;
        text.style.color = textCol;
        // Background Color
        let backCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER).value;
        text.style.background = backCol;
    }

    processBorderRadius = () => {
        let borderRad = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.borderRadius = borderRad + "px";
        this.model.workToEdit.setBorderRadius(borderRad);
    }

    processBorderThickness = () => {
        let borderThick = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.borderWidth = borderThick + "px";
        this.model.workToEdit.setBorderThickness(borderThick);
    } 

    processBorderColor = () => {
        let borderCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        console.log(borderCol);
        text.style.borderColor = borderCol;
        this.model.workToEdit.setBorderColor(borderCol);
    }

    processPadding = () => {
        let padding1 = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.padding = padding1 + "px";
        this.model.workToEdit.setPadding(padding1);
    }

    processMargin = () => {
        let marg = document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.margin = marg + "px";
        this.model.workToEdit.setMargin(marg);
    }

    processTextColor = () => {
        let textCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.color = textCol;
        this.model.workToEdit.setTextColor(textCol);
    }

    processBackGroundColor = () => {
        let backCol = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER).value;
        let text = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        text.style.background = backCol;
        this.model.workToEdit.setBackgroundColor(backCol);
    }
}