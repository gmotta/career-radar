var radar_arcs = [
    { 'r':65, 'name': 'Desire to work with' },       
    { 'r':130, 'name': 'Novice' },      
    { 'r':195, 'name': 'Advanced Begginer' }, 
    { 'r':260, 'name': 'Competent' }, 
    { 'r':325, 'name': 'Proficient' }, 
    { 'r':390, 'name': 'Expert' } 
];

var radar_quadrants = [];
var radar_data = [];
var quadrant_colors = [ '', '#990000', '#9900CC', '#0066CC', '#CCCC00' ]; 

function len(object) {
    var i = 0;
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            i++;
        }
    }
    return i;
}

var quad = 1;
for (var quadrant in data) {
    var i = 1;
    var start = radar_data.length;

    for(var item in data[quadrant]) {
        radar_data.push({
            name: item,
            movement: 'c', 
            pc: {
                r: (Math.abs(4 - data[quadrant][item]) * 100) + ((40 / len(data[quadrant]) * i)) + 40,
                t: (quad == 1 ? 90 : quad == 2 ? 20 : quad == 3 ? 200 : 280) + ((60 / len(data[quadrant]) * i))
            },
            color: quadrant_colors[quad]
        });
        i++;
    }
    
    var end = radar_data.length;

    radar_quadrants.push({name: quadrant, start: start, end: end});
    quad++;
}

