describe('Bcktrack', function() {
    describe('initializing', function() {
        it('Should attach to the window object width name $BT and Bcktrack',function(){
            expect(typeof window.$BT).toBe('function');
            expect(typeof window.Bcktrack).toBe('function');
        });
    });
    describe("usage",function(){
        it("Should return an object when using",function(){
            var bt = $BT();
            expect(typeof bt).toBe('object');
        });
        describe("Filling with tasks", function(){
            it("Should fill width simple tasks",function(){
                var bt = $BT();
                var testarray = [
                    {test:1},{test:2}
                ];
                bt.setTasks(testarray);
                expect(bt.tasks).toBe(testarray);
            });
            it("Should die if the given parameter is not an array", function(){
                var bt = $BT();
                expect(function(){bt.setTasks({});}).toThrow("setTasks(arr): Array expected, object is given.");
                expect(function(){bt.setTasks(2);}).toThrow("setTasks(arr): Array expected, number is given.");
            });
        });
        describe("filling width tasks preset solutions",function(){
            
            it("Should fill width tasks and solutions for each tasks",function(){
                var bt = $BT();
                var testarray = [
                    {test:1, solutions: ["nulla","egy"]},
                    {test:2, solutions: ["nulla","egy"]}
                ];
                 bt.setTasksWidthSoutions(testarray);
                expect(bt.tasks).toBe(testarray);
                expect(bt.isTaskSolutionsSet).toBe(true);
            });

            it("Should die if the given parameter is not an array", function(){
                var bt = $BT();
                expect(function(){bt.setTasksWidthSoutions(2);}).toThrow("setTasksWidthSoutions(arr): Array expected, number is given.");
                expect(function(){bt.setTasksWidthSoutions({});}).toThrow("setTasksWidthSoutions(arr): Array expected, object is given.");
            });
            
            it("Should die if solutions are not set for each tasks, or not an array",function(){
                var bt = $BT();
                expect(function(){bt.setTasksWidthSoutions([
                    {test:1, solutions: ["nulla","egy"]},
                    {test:2}
                ]);}).toThrow('setTasksWidthSoutions(arr): \n\t{"test":2} solutions are not set.');
                expect(function(){bt.setTasksWidthSoutions([
                    {test:1, solutions: ["nulla","egy"]},
                    {test:2, solutions: 3}
                ]);}).toThrow('setTasksWidthSoutions(arr): \n\t{"test":2,"solutions":3} solutions is expected to be an array.');

            });
        });
        describe("Setting global solutions",function(){
            var bt = $BT();
            it("should save solutions",function(){
                var solutions = [
                    true,
                    false
                ];
                bt.setSolutions(solutions);
                expect(bt.solutions).toBe(solutions);
            });
            it("should throw error if not array given as the parameter", function(){
                var bt = $BT();
                expect(function(){bt.setSolutions(2);}).toThrow("setSolutions(arr): Array expected, number is given.");
                expect(function(){bt.setSolutions({});}).toThrow("setSolutions(arr): Array expected, object is given.");
            });
        });
        describe("Setting global solutions width criterias",function(){
            var bt = $BT();
            it("should save solutions",function(){
                var solutions = [
                    {test:"joy", criteria:{canBe:[1], cantBe: [2]}},
                    {test:"fun", criteria:{canBe:[1], cantBe: [2]}}
                ];
                bt.setSolutions(solutions);
                expect(bt.solutions).toBe(solutions);
            });
            describe("validations", function(){
                //not every criteria is set
                var solutions1 = [
                    {test:"joy", criteria:{canBe:[1], cantBe: [2]}},
                    {test:"fun"}
                ];
                //criteria is not properly formatted
                var solutions2 = [
                    {test:"joy", criteria:[1, 2]},
                    {test:"fun", criteria:{canBe:1, cantBe: 2}},
                    {test:"fun", criteria:{canBee:1, cantBe: 2}}
                ];
            });
        });
    })
});