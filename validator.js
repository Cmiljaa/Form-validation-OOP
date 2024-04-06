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
        {
            if(fieldvalue === '')
            {
                this.errors[fieldname].push('This field is empty');
            }
        }

        if(elfields[fieldname].email)
        {
            if(!this.validateEmail(elfields[fieldname].email)){
                this.errors[fieldname].push('Email is not valid');
            }
        }

        if(elfields[fieldname].minlength && elfields[fieldname].maxlength)
        {
            if(fieldvalue.length < elfields[fieldname].minlength || fieldvalue.length > elfields[fieldname].maxlength)
            {
                this.errors[fieldname].push(`Length of the field must be between ${elfields[fieldname].minlength} and ${elfields[fieldname].maxlength}`);
            }
        }

        if(elFields[fieldName].matching) {
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);
            if(fieldValue !== matchingEl.value) {
                this.errors[fieldName].push('Lozinke se ne poklapaju.');
            }

            // fieldName se puni samo ako se lozinke NE poklapaju
            // ako se poklapaju (ako je fieldName.length === 0) nista se ne pise
            if(this.errors[fieldName].length === 0) {
                this.errors[fieldName] = [];
                this.errors[elFields[fieldName].matching] = [];
            }
        }
    }

    populateErrors(errors) {
        for(const elem of document.querySelectorAll('ul')) {
            elem.remove();
        }
        for(let key of Object.keys(errors)) {
            let element = document.querySelector(`input[name="${key}"]`);
            let parentElement = element.parentElement;
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;

                errorsElement.appendChild(li);
            })
        }
    }

    validateEmail(email)
    {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
             return true;
        else
            return false;
    }


}