;(function(global){
    Bcktrack = function () {
        return new Bcktrack.init();        
    }

    Bcktrack.prototype = {
        setTasks: function(arr){
            this.arrayValidation("setTasks(arr):",arr);
            this.tasks = arr;
        },
        setSolutions: function(arr){
            this.arrayValidation("setSolutions(arr):",arr);
            this.solutions = arr;
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
            
            if(errorStr){
                throw funct+errorStr;
            }
            
        }

    }

    Bcktrack.init = function () {
        var self = this;

        self.tasks = [];
        self.solutions = [];
        return this;
    }

    Bcktrack.init.prototype = Bcktrack.prototype;

    global.Bcktrack = global.$BT = Bcktrack;
}(window));