var ber = $BT();

var tt = ber.setTasks([
    {title:"szponzor"},
    {title:"irányítás"},
    {title:"alap"},
    {title:"fal"},
    {title:"engedély"},
    {title:"lefizetés"}
]).setPossibilitiesWidthCriterias([
    {name:"Miklós", criterias: ["szponzor","irányítás","lefizetés"]},
    {name:"Klaudia", criterias: ["szponzor"]},
    {name:"András", criterias: ["irányítás","alap","engedély"]},
    {name:"Zsolt", criterias: ["alap","fal"]},
    {name:"Géza", criterias: ["fal","engedély","lefizetés"]},
    {name:"Palika", criterias: ["fal"]},
]).acceplability(function(criterias,task){
    var i = 0;
    while(i < criterias.length && criterias[i] != task.title){
        i++;
    }

    return i < criterias.length;
}).oneTimeSolution()
// unicHistoryDependence(function(level,prev,currentTask,currentSolution){
//     var i = 0;
//     if(!prev[0].solution){
//         return true;
//     }
//     while(i <= level && (prev[i].solution ? prev[i].solution.name != currentSolution.name : true)){
//         i++;
//     }
//     return i > level;
// })
.getAllSolutions();
console.log(tt);

var berenyiek2 = $BT();

var soli = berenyiek2.setTasksWithPossibilities([
    {title:"szponzor", possibilities:["Miklós","Klaudia"]},
    {title:"irányítás", possibilities:["Miklós","András"]},
    {title:"alap", possibilities:["András","Zsolt"]},
    {title:"fal", possibilities:["Géza","Zsolt","Palika"]},
    {title:"engedély", possibilities:["Géza", "András"]},
    {title:"lefizetés", possibilities:["Miklós","Géza"]}
]).oneTimeSolution()
// .unicHistoryDependence(function(level,prev,currentTask,currentSolution){
//     var i = 0;
//     while(i<=level && prev[i].solution != currentSolution){
//         i++;
//     }

//     return i > level;
// })
.getAllSolutions();


console.log(soli);
//berenyiek2.setPossibilities([]);





// var sackSize = 20;
// var knapsack = $BT(
//     [//objevts
//         {w:10, v:10, possibilities: [true, false]},
//         {w:16, v:5, possibilities: [true, false]},
//         {w:5, v:22, possibilities: [true, false]},
//         {w:7, v:5, possibilities: [true, false]},
//         {w:1, v:22, possibilities: [true, false]},
//         {w:5, v:22, possibilities: [true, false]},
//         {w:4, v:2, possibilities: [true, false]}
//     ],
//     function(object, putIn){//valid the current result

//         return putIn ? object.w < sackSize : true;
//     },
//     function(level,previousSolution, currentObject, currentSolution){//valid so far
//         var allWeight = 0;
//         var i=0;
//         while(allWeight < sackSize && i <= level) {
//             if(previousSolution[i].solution) {
//                 allWeight += previousSolution[i].w;
//             }
//             i++;
//         }

//         return currentSolution ? (allWeight+currentObject.w <= sackSize) : true;
//     }
// );

// console.log("knapsack",knapsack.getAllSolutions());