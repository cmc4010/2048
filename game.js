
// easiest way is to use a matrix
// then render it

// but it seems pretty bad

// most efficient way is to adjust text node value and class

var tilesDOM = document.getElementsByClassName("tiles")[0];

var app = {
	"initialize": function(){
		// Testing Zone
		this.newNode(128, 0, 3);
		this.newNode(512, 0, 2);
		this.newNode(256, 0, 1);
		this.newNode(256, 0, 0);
		// this.moveLeft();
		// Create nodes at 2 random spots


		// add event listeners
		window.onkeyup = function(e){
			var key = e.keyCode;
			switch(key){
				case 37:
					app.moveLeft();
					break;
				case 38:
					app.moveUp();
					break;
				case 39:
					app.moveRight();
					break;
				case 40:
					app.moveDown();
					break;
			}
		}
	},
	"newNode": function(num, x, y){
		var myTile = document.createElement("div");
		myTile.classList.add("tile");
		myTile.classList.add("tile-" + num);
		myTile.classList.add("position-" + x + "-" + y);
		myTile.appendChild(document.createTextNode(num));
		tilesDOM.appendChild(myTile);
		// this.activeNodes.push(myTile);
	},
	"moveLeft": function(){
		// starting from the col 0, row 0, merge
		// query by class name
		var i;
		var j;
		for(i = 0; i < 4; i++){ // i = row
			for(j = 0; j < 3; j++){ // j = column

				// node on current spot
				var curNode = document.getElementsByClassName("position-" + i + "-" + j)[0];
				console.log(i + "," + j + "== curNode: " + curNode);
				// search right
				var k;
				adjNode = undefined;
				for(k = j+1; k < 4; k++){
					adjNode = document.getElementsByClassName("position-" + i + "-" + k)[0];
					if(adjNode){
						break;
					}
				}
				console.log(i + "," + j + "== adjNode: " + adjNode);
				
				// attempt merge
				if(curNode){
					if(adjNode && curNode.childNodes[0].nodeValue === adjNode.childNodes[0].nodeValue){
						// update adjacent node
						adjNode.childNodes[0].nodeValue *= 2;
						adjNode.classList.remove(adjNode.classList[1]);
						adjNode.classList.remove(adjNode.classList[1]);
						// update tile-num class
						adjNode.classList.add("tile-" + adjNode.childNodes[0].nodeValue);
						// update position
						adjNode.classList.add("position-" + i + "-" + j);
						// remove current node
						tilesDOM.removeChild(curNode);
					}
					else {
						// do nothing
					}
				}
				else if(adjNode) {
					// empty with nodes to the right
					// check for merge
					// search further right
					var t;
					adjNode2 = undefined;
					for (t = k+1; t < 4; t++){
						var adjNode2 = document.getElementsByClassName("position-" + i + "-" + t)[0];
						if(adjNode2){
							break;
						}
					}

					console.log(i + "," + j + "== adjNode2: " + adjNode2);

					// attempt merge
					if(adjNode2){
						// perform merge
						if(adjNode2.childNodes[0].nodeValue === adjNode.childNodes[0].nodeValue){
							// update adjacent node
							// value * 2
							adjNode2.childNodes[0].nodeValue *= 2;

							adjNode2.classList.remove(adjNode2.classList[1]);
							adjNode2.classList.remove(adjNode2.classList[1]);
							// update tile-num class
							adjNode2.classList.add("tile-" + adjNode2.childNodes[0].nodeValue);
							// update position class
							adjNode2.classList.add("position-" + i + "-" + j);
							// remove current node
							tilesDOM.removeChild(adjNode);
						}
						else {
							// shift only
							adjNode.classList.remove(adjNode.classList[2]);
							adjNode.classList.add("position-" + i + "-" + j);
						}
					}
					else {
						// regular placement of adjNode
						// shift only
						// NODE FINAL PLACEMENT
						adjNode.classList.remove(adjNode.classList[2]);
						adjNode.classList.add("position-" + i + "-" + j);
					}
				}
				else {
					// empty row
					// do nothing
				}
			}
		}
	},
	"moveRight": function(){

	},
	"moveUp": function(){

	},
	"moveDown":function(){

	}
}

console.log(tilesDOM);
app.initialize();