var positions = [];
var map = [];
var highest_x = 0;
var highest_y = 0;

function drawImg(canvas, new_positions){
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    positions.push.apply(positions, new_positions);

    new_positions.forEach(function(pos) {
        if (pos.y > highest_y) {
            highest_y = pos.y + 1;
        }

        if (pos.x > highest_x) {
            highest_x = pos.x + 1;
        }
    });

    createMap();

    var scaled_positions = scale(canvas);

    for(var x = 0; x < scaled_positions.length; x++){
        for (var y; y < scaled_positions[x].length; y++){
            if(positions[x][y]){
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}

function scale(ctx){
    if(highest_x > canvas.width || highest_y > canvas.height){
        var scaled_positions = [];
        var x_percentage = highest_x / ctx.canvas.width;
        var y_percentage = highest_y / ctx.canvas.height;
        var delta;

        if(x_percentage > y_percentage){
            delta = Math.floor(x_percentage);
        } else {
            delta = Math.floor(y_percentage);
        }

        for(x = 0; x < map.length; x = x + delta){
            var y_positions = [];
            for (var y = 0; y < map[x].length; y = y + delta){
                y_positions.push(map[x][y]);
            }
            scaled_positions.push(y_positions);
        }

        return scaled_positions;
    }
    return map;
}

function createMap(){
    map = [];
    for (var x = 0; x < highest_x; x++) {
        var y_positions = [];
        for (var y = 0; y < highest_y; y++) {
            y_positions[y] = false;
        }
        map[x] = y_positions.slice();
    }

    positions.forEach(function (pos) {
        map[pos.x][pos.y] = true;
    });
}