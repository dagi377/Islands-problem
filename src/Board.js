import {
	DoubleSide,
	Face3,
	Geometry,
	Mesh,
	MeshBasicMaterial,
	OrthographicCamera,
	Scene,
	Vector3,
	WebGLRenderer
} from 'three';

const drawSquare = (x1, y1, x2, y2) => {
	let square = new Geometry();
	square.vertices.push(new Vector3(x1, y1, 0));
	square.vertices.push(new Vector3(x1, y2, 0));
	square.vertices.push(new Vector3(x2, y1, 0));
	square.vertices.push(new Vector3(x2, y2, 0));
	square.faces.push(new Face3(0, 1, 2));
	square.faces.push(new Face3(1, 2, 3));
	return square;
}

const Board = {

	init: function (bitmap, scale) {
		let canvasHeight = bitmap.length
		let canvasWidth = bitmap[0].length
		if (canvasWidth < window.innerWidth) {
			canvasWidth = window.innerWidth
		}
		if (canvasHeight < window.innerHeight) {
			canvasHeight = window.innerHeight
		}
		let canvasRatio = canvasWidth / canvasHeight;
		this.scene = new Scene();
		let windowWidth = scale * canvasRatio;
		let windowHeight = scale;

		this.view = new OrthographicCamera(windowWidth / -2, windowWidth / 2, windowHeight / 2, windowHeight / -2, 0);

		let focus = new Vector3(Math.floor(windowWidth / 2), windowWidth / 6, 0);
		this.view.position.y = focus.y;
		this.view.position.x = focus.x;
		this.view.position.z = 0;
		this.view.lookAt(focus);

		this.gl = new WebGLRenderer();
		this.gl.setSize(canvasWidth, canvasHeight);
		this.gl.setClearColor(0xffffff, 1.0);
	},

	addScenes: function (bitmap) {
		for (let i = 0; i < bitmap.length; i++) {
			for (let j = 0; j < bitmap[0].length; j++) {
				let square_material = new MeshBasicMaterial({color: bitmap[i][j].c, side: DoubleSide});
				let square_geometry = drawSquare(j, i, j + 1, i + 1);
				let square_mesh = new Mesh(square_geometry, square_material);
				this.scene.add(square_mesh);
			}
		}
	},

	addToDom: function () {
		let container = document.querySelector('.canvas-container');
		let canvas = document.querySelector('canvas');
		if (!canvas) {
			container.append(this.gl.domElement)
		} else {
			canvas.replaceWith(this.gl.domElement);
		}
		this.gl.render(this.scene, this.view);
	},

	create: function (bitmap, scale) {
		this.init(bitmap, scale);
		this.addScenes(bitmap);
		this.addToDom()
	}
}


export default Board
