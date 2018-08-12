;(function(global){
    Bcktrack = function () {
        return new Bcktrack.init();        
    }

    Bcktrack.prototype = {
        setTasks: function(arr){
            this.arrayValidation("setTasks(arr):",arr);
            this.tasks = arr;
        },
        setTasksWidthSoutions: function(arr){
            this.arrayValidation("setTasksWidthSoutions(arr):",arr);
            this.solutionArrayValidation("setTasksWidthSoutions(arr): ",arr);
            this.tasks = arr;
            this.isTaskSolutionsSet = true;
        },
        arrayValidation: function(funct,param){
            if(!(param instanceof Array )) {
                throw funct+" Array expected, "+typeof param+ " is given.";
            }
        },
        solutionArrayValidation(funct,param){
            var errorStr = "";
            param.forEach(function(elemet){
                if(!elemet.solutions){
                    errorStr += "\n\t"+JSON.stringify(elemet)+" solutions are not set.";
                }else if(!(elemet.solutions instanceof Array )) {
                    errorStr += "\n\t"+JSON.stringify(elemet)+" solutions is expected to be an array.";
                }
                
            });
            
            throw funct+errorStr;
            
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