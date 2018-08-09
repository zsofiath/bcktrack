;(function(global){
    Bcktrack = function () {
        return new Bcktrack.init();        
    }

    Bcktrack.prototype = {
        setTasks: function(arr){
            this.arrayValidation(arr);
            this.tasks = arr;
        },
        arrayValidation: function(param){
            if(!(param instanceof Array )) {
                throw "Array expected, "+typeof param+ " is given.";
            }
        }

    }

    Bcktrack.init = function () {
        var self = this;

        self.tasks = [];
        return this;
    }

    Bcktrack.init.prototype = Bcktrack.prototype;

    global.Bcktrack = global.$BT = Bcktrack;
}(window));