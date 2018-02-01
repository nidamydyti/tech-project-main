window.Doc = Backbone.Model.extend({

    urlRoot: "/docs",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Duhet te shkruani titullin"};
        };

        this.validators.autoret = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Duhet te shkruani autoret"};
        };

    
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        name: "Dokumenti i Ri",
        autoret: "Nida Mydyti",
        region: "Prizren",
        description: "",
        picture: null
    }
});

window.DocCollection = Backbone.Collection.extend({

    model: Doc,

    url: "/docs"

});