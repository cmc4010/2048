
// easiest way is to use a matrix
// then render it

// but it seems pretty bad

// most efficient way is to adjust text node value and class

var tilesDOM = document.getElementsByClassName("tiles")[0];

var app = {
	"initialize": function(){
		// Testing Zone
		// this.newNode(128, 0, 3);
		// this.newNode(512, 0, 2);
		// this.newNode(256, 0, 1);
		// this.newNode(256, 0, 0);

		// this.newNode(128, 1, 0);
		// this.newNode(512, 1, 1);
		// this.newNode(256, 1, 2);
		// this.newNode(256, 1, 3);
		// this.moveLeft();

		// Create nodes at 2 random spots

		app.genNode();
		app.genNode();

		// add event listeners
		window.onkeyup = function(e){
			var key = e.keyCode;
			switch(key){
				case 37:
					if(app.moveLeft()){
						setTimeout(app.genNode, 200);
					}
					break;
				case 38:
					if(app.moveUp()){
						setTimeout(app.genNode, 200);
					}
					break;
				case 39:
					if(app.moveRight()){
						setTimeout(app.genNode, 200);
					}
					break;
				case 40:
					if(app.moveDown()){
						setTimeout(app.genNode, 200);
					}
					break;
			}
		}
	},
	"tileCount": function(){

		var count = 0;

		this.incCount = function(){
			count++;
		}

		this.decCount = function(){
			count--;
		}

		this.getCount = function(){
			return count;
		}

	},
	"genNode": function(){
		while(1){
			var randNum = Math.floor((Math.random() * 16));
			// check viability
			// 0~15
			// get col = x % 4; 15 % 4 = 3
			// get row = ceil(16/4);
			// row 4 : 12, 13, 14, 15
			// console.log(randNum);
			var col = randNum % 4;
			var row = Math.floor(randNum / 4);
			// console.log(col + " " + row);
			var node = document.getElementsByClassName("position-" + row + "-" + col)[0];
			if(node){
				continue;
			}
			else{
				break;
			}
		}
		// create Node
		app.newNode( 2 ** Math.floor((Math.random()*2)+1), row, col );
		myCount.incCount();
		console.log(myCount.getCount());
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
		var actionFlag = 0;
		for(i = 0; i < 4; i++){ // i = row
			for(j = 0; j < 3; j++){ // j = column

				// node on current spot
				var curNode = document.getElementsByClassName("position-" + i + "-" + j)[0];
				// console.log(i + "," + j + "== curNode: " + curNode);
				// search right
				var k;
				adjNode = undefined;
				for(k = j+1; k < 4; k++){
					adjNode = document.getElementsByClassName("position-" + i + "-" + k)[0];
					if(adjNode){
						break;
					}
				}
				// console.log(i + "," + j + "== adjNode: " + adjNode);
				
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
						myCount.decCount();

						actionFlag = 1;
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

					// console.log(i + "," + j + "== adjNode2: " + adjNode2);

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
							myCount.decCount();
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
					actionFlag = 1;
				}
				else {
					// empty row
					// do nothing
				}
			}
		}
		return actionFlag;
	},
	"moveRight": function(){
		var i;
		var j;
		var actionFlag = 0;
		for(i = 0; i < 4; i++){ // i = row
			for(j = 3; j > 0; j--){ // j = column

				// node on current spot
				var curNode = document.getElementsByClassName("position-" + i + "-" + j)[0];
				// console.log(i + "," + j + "== curNode: " + curNode);
				// search right
				var k;
				adjNode = undefined;
				for(k = j-1; k >= 0; k--){
					adjNode = document.getElementsByClassName("position-" + i + "-" + k)[0];
					if(adjNode){
						break;
					}
				}
				// console.log(i + "," + j + "== adjNode: " + adjNode);
				
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
						myCount.decCount();
						actionFlag = 1;
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
					for (t = k-1; t >= 0; t--){
						var adjNode2 = document.getElementsByClassName("position-" + i + "-" + t)[0];
						if(adjNode2){
							break;
						}
					}

					// console.log(i + "," + j + "== adjNode2: " + adjNode2);

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
							myCount.decCount();
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
					actionFlag = 1;
				}
				else {
					// empty row
					// do nothing
				}
			}
		}
		return actionFlag;
	},
	"moveUp": function(){
		var i;
		var j;
		var actionFlag = 0;
		for(i = 0; i < 4; i++){ // i = column
			for(j = 0; j < 3; j++){ // j = row

				// node on current spot
				var curNode = document.getElementsByClassName("position-" + j + "-" + i)[0];
				// console.log(j + "," + i + "== curNode: " + curNode);
				// search right
				var k;
				adjNode = undefined;
				for(k = j+1; k < 4; k++){
					adjNode = document.getElementsByClassName("position-" + k + "-" + i)[0];
					if(adjNode){
						break;
					}
				}
				// console.log(j + "," + i + "== adjNode: " + adjNode);
				
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
						adjNode.classList.add("position-" + j + "-" + i);
						// remove current node
						tilesDOM.removeChild(curNode);
						myCount.decCount();
						actionFlag = 1;
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
						var adjNode2 = document.getElementsByClassName("position-" + t + "-" + i)[0];
						if(adjNode2){
							break;
						}
					}

					// console.log(j + "," + i + "== adjNode2: " + adjNode2);

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
							adjNode2.classList.add("position-" + j + "-" + i);
							// remove current node
							tilesDOM.removeChild(adjNode);
							myCount.decCount();
						}
						else {
							// shift only
							adjNode.classList.remove(adjNode.classList[2]);
							adjNode.classList.add("position-" + j + "-" + i);
						}
					}
					else {
						// regular placement of adjNode
						// shift only
						// NODE FINAL PLACEMENT
						adjNode.classList.remove(adjNode.classList[2]);
						adjNode.classList.add("position-" + j + "-" + i);
					}
					actionFlag = 1;
				}
				else {
					// empty row
					// do nothing
				}
			}
		}
		return actionFlag;
	},
	"moveDown":function(){
		var i;
		var j;
		var actionFlag = 0;
		for(i = 0; i < 4; i++){ // i = col
			for(j = 3; j > 0; j--){ // j = row

				// node on current spot
				var curNode = document.getElementsByClassName("position-" + j + "-" + i)[0];
				// console.log(j + "," + i + "== curNode: " + curNode);
				// search right
				var k;
				adjNode = undefined;
				for(k = j-1; k >= 0; k--){
					adjNode = document.getElementsByClassName("position-" + k + "-" + i)[0];
					if(adjNode){
						break;
					}
				}
				// console.log(j + "," + i + "== adjNode: " + adjNode);
				
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
						adjNode.classList.add("position-" + j + "-" + i);
						// remove current node
						tilesDOM.removeChild(curNode);
						myCount.decCount();
						actionFlag = 1;
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
					for (t = k-1; t >= 0; t--){
						var adjNode2 = document.getElementsByClassName("position-" + t + "-" + i)[0];
						if(adjNode2){
							break;
						}
					}

					// console.log(j + "," + i + "== adjNode2: " + adjNode2);

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
							adjNode2.classList.add("position-" + j + "-" + i);
							// remove current node
							tilesDOM.removeChild(adjNode);
							myCount.decCount();
						}
						else {
							// shift only
							adjNode.classList.remove(adjNode.classList[2]);
							adjNode.classList.add("position-" + j + "-" + i);
						}
					}
					else {
						// regular placement of adjNode
						// shift only
						// NODE FINAL PLACEMENT
						adjNode.classList.remove(adjNode.classList[2]);
						adjNode.classList.add("position-" + j + "-" + i);
					}
					actionFlag = 1;
				}
				else {
					// empty row
					// do nothing
				}
			}
		}
		return actionFlag;
	}
}

var myCount = new app.tileCount();

// console.log(myCount.getCount());

app.initialize();
