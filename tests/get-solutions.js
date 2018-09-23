var objects = [
    {
        id: 1,
        w: 2,
        v: 0
    },
    {
        id: 2,
        w: 2,
        v: 0
    },
    {
        id: 3,
        w: 1,
        v: 0
    },
    {
        id: 4,
        w: 1,
        v: 0
    },
    {
        id: 5,
        w: 4,
        v: 0
    }
]
var solutions = [true,false];
var maxSAckSize = 3;
var bt = $BT();

describe("knapsack problem",function(){


    it("should add all the solutions", function(){

        var finalSolutions = bt.setTasks(objects).setSolutions(solutions).maxSumValue("w",3).getASolutions();
        expect(finalSolutions instanceof Array).toBe(true);
        expect(finalSolutions.length).toBe(5);
        expect(finalSolutions[0]).toBe(true);
        expect(finalSolutions[1]).toBe(false);
        expect(finalSolutions[2]).toBe(true);
        expect(finalSolutions[3]).toBe(false);
        expect(finalSolutions[4]).toBe(false);
    });
    
});