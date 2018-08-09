
;(function (global){
    //creating the Bcktrack object
    Bcktrack = function () {
        return new Bcktrack.init();        
    }

    Bcktrack.prototype = {
        /* ---------------------------------- Validations ----------------------------- */
        isArrayValidation: function(arr) {
            if(!(arr instanceof Array )) {
                throw "Bad parameters:\n\tArray expected, "+typeof tasks+ " is given."
            }
        },
        isPossibilitiesSetValidation: function (arr){
            arr.forEach(function(el){
                if(!el.possibilities){
                    throw "You havent specified the possible solutions for all the tasks. ";
                } else {
                    if(!(el.possibilities instanceof Array)){
                        throw "The specified possibilities must be an array."
                    }
                }
            })
        },
        isCriteriasSetValidation: function (arr){
            arr.forEach(function(el){
                if(!el.criterias){
                    throw "You havent specified the criterias for all the elements. ";
                } else {
                    if(!(el.criterias instanceof Array)){
                        throw "The specified possibilities must be an array."
                    }
                }
            })
        },



        //functions
        backtrack : function(){
            var isSolution = false;
            var tasks = this.tasks;
            var currentPossibilityChecker = this.currentPossibilityChecker;
            var previousSolutionsChecker = this.previousSolutionsChecker;
            var currentSolution = [];

            var that = this;
            return function backtrackFunction(level) {
            var i = 0;
            var iMax = that.isTaskPossibilitiesSet ? tasks[level].possibilities.length : that.possibilities.length;
            
            while(i < iMax && !isSolution){
                if(that.isTaskPossibilitiesSet ? true : that.isAccettable(level,i)){
                    if(that.previousResultsChecker(level, i)) {
                    tasks[level].solution = that.isTaskPossibilitiesSet ? tasks[level].possibilities[i] : that.possibilities[i];
                        if(level == (tasks.length-1)){
                            isSolution = true;
                        } else {
                            backtrackFunction(level+1);
                        }

                    }
                }
                i++;
            }
            if(!isSolution){
                delete tasks[level].solution;
            }
            return tasks;
        }
        },

        getBestSolution : function() {
            return this.bestSolution;
        },

        getAllSolutions : function() {
            return this.backtrack().call(this,0);
        },

        /* Setting tasks and solution possibilities */
        setTasksWithPossibilities : function(arr){
            this.isArrayValidation(arr);
            this.isPossibilitiesSetValidation(arr);
            this.tasks = arr;
            this.isTaskPossibilitiesSet = true;
            return this;
        },
        setTasks: function(arr){
            this.isArrayValidation(arr);
            this.tasks = arr;
            return this;
        },
        setPossibilities : function(arr){
            this.isArrayValidation(arr);
            this.possibilities = arr;
            return this;
        },
        setPossibilitiesWidthCriterias : function(arr){
            this.isArrayValidation(arr);
            this.isCriteriasSetValidation(arr);
            this.possibilities = arr;
            this.isPossibilityCriteriasSet = true;
            return this;
        },








        isAccettable: function(level,i){
            //todo
            return this.canBeSolution(this.possibilities[i].criterias,this.tasks[level]);
        },

        previousResultsChecker : function(level,i){
            return this.previousResultsCheck(
                level,
                this.tasks,
                this.tasks[level], 
                this.isTaskPossibilitiesSet ? 
                    this.tasks[level].possibilities[i] : this.possibilities[i]);
        },

        unicHistoryDependence : function(func){
            this.previousResultsCheck = func;
            return this;
        },

        acceplability: function(funct){
            this.canBeSolution = funct;
            return this;
        },

        oneTimeSolution(){

            this.previousResultsCheck = function(level,prev,currentTask,currentSolution){
                var i = 0;
                if(this.isTaskPossibilitiesSet){
                    while(i<=level && prev[i].solution != currentSolution){
                        i++;
                    }
                }else {
                    if(!prev[0].solution){
                        return true;
                    }
                    while(i <= level && (prev[i].solution ? prev[i].solution != currentSolution : true)){
                        i++;
                    }
                }

                return i > level;
            }
            return this;
        }

        
    };

    Bcktrack.init = function () {
        var self = this;

        self.tasks = [];
        self.isTaskPossibilitiesSet = false;
        self.possibilities = [];
        self.isPossibilityCriteriasSet = false;

        self.allSolutions = [];
        self.bestSolution = [];
        return this;
    }

    Bcktrack.init.prototype = Bcktrack.prototype;

    global.Bcktrack = global.$BT = Bcktrack;

})(window);