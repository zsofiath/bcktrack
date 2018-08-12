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
            
            it("Should fill width tasks and solutions for each taks",function(){
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
            
            it("Should die if solutions are not set for each tasks",function(){
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
    })
});