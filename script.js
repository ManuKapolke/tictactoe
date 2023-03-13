let fields = [];
let currentShape = 'cross';


function fillShape(index) {
    fields[index] = currentShape;
    currentShape = (currentShape == 'cross') ? 'circle' : 'cross';
}