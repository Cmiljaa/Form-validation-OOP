class Validator{
    constructor(config){
        this.elementsConfig = config;
        this.errors = {};

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject() {
        // za svako polje forme, u 'errors' objektu pravimo niz za to polje gde cemo cuvati greske 
        for(let field in this.elementsConfig)
        {
            this.errors[field] = [];
        }
    }

    inputListener() {
        let inputselector = this.elementsConfig;
        
        for(let field in inputselector){
            let el = document.querySelector(`input[name="${field}"]`);
            el.addEventListener("input", this.validate.bind(this));
        }
        // bind povezuje objekat i funkciju
    }

     // e je trenutno polje zato sto je gore kliknuto
    validate(e){
        // sva polja
        let elfields = this.elementsConfig;
        // trenutno polje
        let field = e.target;
        let fieldname = field.getAttribute('name');
        let fieldvalue = field.value;
        this.errors[fieldname] = [];
        
        if(elfields[fieldname].required)
        {
            if(fieldvalue === '')
            {
                this.errors[fieldname].push('This field is empty');
            }
        }

        if(elfields[fieldname].email)
        {
            if(!this.validateEmail(fieldvalue)){
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

        if(elfields[fieldname].matching) {
            let matchingEl = document.querySelector(`input[name="${elfields[fieldname].matching}"]`);
            if(fieldvalue !== matchingEl.value) {
                this.errors[fieldname].push('Passwords do not match');
            }

            // fieldName se puni samo ako se lozinke NE poklapaju
            // ako se poklapaju (ako je fieldName.length === 0) nista se ne pise
            if(this.errors[fieldname].length === 0) {
                this.errors[fieldname] = [];
                this.errors[elfields[fieldname].matching] = [];
            }
        }

        this.populateErrors(this.errors);
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