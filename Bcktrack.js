;(function(global){
    Bcktrack = function () {
        return new Bcktrack.init();        
    }

    Bcktrack.prototype = {
        setTasks: function(arr){
            validation.array(arguments.callee.name,arr);
            this.tasks = arr;
        },
        setSolutions: function(arr){
            validation.array(arguments.callee.name,arr);
            this.solutions = arr;
        },
        setTasksWidthSoutions: function(arr) {
            validation.array(arguments.callee.name,arr);
            validation.solutions(arguments.callee.name,arr);
            this.tasks = arr;
            this.isTaskSolutionsSet = true;
        },
        setSolutionsWidthCriteria: function(arr) {
            validation.array(arguments.callee.name,arr);
            validation.criteria(arguments.callee.name,arr);
            this.solutions = arr;
            this.isCriteriasSet = true;
        },
    }



    var validation = {
         array: function(funct,param){
            if(!(param instanceof Array )) {
                throw funct+"(arr): Array expected, "+typeof param+ " is given.";
            }
        },
        solutions: function (funct,param){
            var errorStr = "";
            param.forEach(function(elemet){
                if(!elemet.solutions){
                    errorStr += "\n\t"+JSON.stringify(elemet)+" solutions are not set.";
                }else if(!(elemet.solutions instanceof Array )) {
                    errorStr += "\n\t"+JSON.stringify(elemet)+" solutions are expected to be an array.";
                }
                
            });
            
            if(errorStr){
                throw funct+"(arr):"+errorStr;
            }
            
        },
        criteria: function (funct,arr) {
            var errorMessage = funct+'(arr): Criteria is not properly set:';
            var isThrowError = false;
            arr.forEach(function(element) {
                var json = JSON.stringify(element);
                if(!isUndefined(element.criteria) ){
                    if(isUndefined(element.criteria.canBe) || isUndefined(element.criteria.cantBe)){
                        errorMessage+='\n\t'+json+' criteria must be an object width property canBe or cantBe.';
                        isThrowError = true;
                    }
                }
            });
            if(isThrowError) {
                throw errorMessage;
            }
        }
    }

    function isUndefined(param){
        return param === undefined;
    }

    Bcktrack.init = function () {
        var self = this;

        self.tasks = [];
        self.solutions = [];
        self.isTaskSolutionsSet = true;
        self.isCriteriasSet = false;
        return this;
    }

    Bcktrack.init.prototype = Bcktrack.prototype;

    global.Bcktrack = global.$BT = Bcktrack;
}(window));