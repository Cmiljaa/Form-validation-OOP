class Validator{
    constructor(config){
        this.elementsConfig = config;
        this.errors = {};

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject() {
        for(let field in this.elementsConfig)
        {
            this.errors[field] = [];
        }
    }

    inputListener() {
        let inputselector = this.elementsConfig;

        for(let field in inputselector){
            let selector = `input[name="${field}"]`;
            let element = document.querySelector(selector);
            element.addEventListener('input', this.validate.bind(this));
        }
    }

    validate(e){
        let elfields = this.elementsConfig;

        let field = e.target;
        let fieldname = field.getAttribute('name');
        let fieldvalue = field.value;
        this.errors[fieldname] = [];
        
        if(elfields[field].required)
        

    }


}