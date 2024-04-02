class Validator{
    constructor(config){
        this.elementsConfig = config;
        this.errors = {};

        this.generateErrorsObject();
    }

    generateErrorsObject() {
        for(let field in this.elementsConfig)
        {
            this.errors[field] = [];
        }
    }
}