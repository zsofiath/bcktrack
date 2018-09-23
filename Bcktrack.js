;(function(global){
    Bcktrack = function () {
        return new Bcktrack.init();        
    }


    function isUndefined(param){
        return param === undefined;
    }

    

    var tempSolutionArray = [];
    var isSolution = false;
    
    

    function backtrack(level) {
        var i = 0;
        while(i < this.solutions.length && !isSolution) {

            if(this.isPossibleSolution.call(this,level, i)) {
                if(this.isPossibleSolutionHistorically.call(this,level,i)) {

                    tempSolutionArray[level] = this.solutions[i];
                    
                    if(level >= (this.tasks.length-1)) isSolution=true;
                    else backtrack.call(this,level+1);
                }
            }
            i++;
        }
    }

    Bcktrack.prototype = {
        setTasks: function(arr){
            validation.array(arguments.callee.name,arr);
            this.tasks = arr;
            return this;
        },
        setSolutions: function(arr){
            validation.array(arguments.callee.name,arr);
            this.solutions = arr;
            return this;
        },
        setTasksWidthSoutions: function(arr){
            validation.array(arguments.callee.name,arr);
            validation.solutions(arguments.callee.name,arr);
            this.tasks = arr;
            this.isTaskSolutionsSet = true;
        },
        setSolutionsWidthCriteria: function(arr){
            validation.array(arguments.callee.name,arr);
            validation.criteria(arguments.callee.name,arr);
            this.solutions = arr;
            this.isCriteriasSet = true;
        },
        maxSumValue: function(key, maxValue){
            this.isPossibleSolution = function(level, i) {
                // element is not put in the sack or its weight is less than the sack size
                return !this.solutions[i] || (this.tasks[level][key] < maxValue);
            }
            this.isPossibleSolutionHistorically = function(level, i) {
                var j=0;
                var sum=this.solutions[i] ? this.tasks[level][key] : 0;
        
                while( j < tempSolutionArray.length){
                    sum += tempSolutionArray[j] ? this.tasks[j][key] : 0;
                    j++;
                }
                return sum <= maxValue;
            }
            return this;
        },
        getASolutions: function(){
            backtrack.call(this,0);
            return tempSolutionArray;
        }
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

    

    ///////////
    function fitIn(task,solution){
        return task.w < 3
    }
    function fitInHistorycally(level,task,solution){
        var sum = 0;
        for(var i = 0; i < level; i++){
            if(tempSolutionArray[i]) sum+=this.tasks[i].w;
        }
        if(solution) sum+=task.w;
        return sum < 3;
    }
    /////////

    Bcktrack.init = function () {
        var self = this;

        self.tasks = [];
        self.solutions = [];
        self.isTaskSolutionsSet = true;
        self.isCriteriasSet = false;
        self.allSolutions = [];
        return this;
    }

    Bcktrack.init.prototype = Bcktrack.prototype;

    global.Bcktrack = global.$BT = Bcktrack;
}(window));