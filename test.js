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
        describe("Filling with tasks and solutions", function(){
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
                expect(function(){bt.setTasks({});}).toThrow("Array expected, object is given.");
            })
        });
    })
});