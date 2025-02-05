import AppsterModel from '../appster/AppsterModel.js'
import GoLogoLoLogo from './GoLogoLoLogo.js'
import { GoLogoLoGUIClass } from './GoLogoLoConstants.js';
import { AppsterGUIId } from '../appster/AppsterConstants.js'

export default class GoLogoLoModel extends AppsterModel {
    constructor() {
        super();
        this.currentWork = null;
    }

    addToList(name){
        let work = new GoLogoLoLogo(name);
        this.prependWork(work);
    }

    createNewWork(workName) {
        let newRandomText = new GoLogoLoText(workName);
        return newRandomText;
    }

    loadWorkData(workToLoad) {
        console.log("load " + workToLoad.getName());
    }

    makeColor(colorData) {
        return "rgb(" + colorData.red + ", " + colorData.green + ", " + colorData.blue + ")";
    }

    buildAppWork(workArray, name) {
        let appWork = new GoLogoLoLogo();

        // FIND THE WORK DATA FROM THE JSON OBJECT
        for (let i = 0; i < workArray.length; i++) {
            let jsonWork = workArray[i];
            if (jsonWork.name === name) {
                // WE'VE FOUND IT, NOW LOAD ALL OF ITS DATA
                appWork.setName(name);
                appWork.setText(jsonWork.text);
                appWork.setFontSize(jsonWork.font_size);
                appWork.setTextColor(jsonWork.text_color);
                appWork.setBackgroundColor(jsonWork.background_color);
                appWork.setBorderColor(jsonWork.border_color);
                appWork.setBorderRadius(jsonWork.border_radius);
                appWork.setBorderThickness(jsonWork.border_thickness);
                appWork.setPadding(jsonWork.padding);
                appWork.setMargin(jsonWork.margin);
            }
        }

        return appWork;
    }

    goHome() {
        this.view.goToHomeScreen();
        let footer = document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_FOOTER);
        footer.textContent = "Creating New Logo";
    }

    updateText() {
        //this.view.
    }
}