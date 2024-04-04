import ThreeDimensionalEnvironment from "./3d-env/3d-env"
import StatsPanel from "./3d-env/stats-panel";

class IsometricViewer {
	constructor(parent) {
		this.parentElement = parent;
		this.stats = new StatsPanel(parent);
		this.env = new ThreeDimensionalEnvironment(
			20, 15, 10, 15, parent, this.stats.stats
		);
	}

	initializeViewer() {
		this.env.initialize();
		this.stats.initialize();
	}

	startAnimation() {
		this.env.animate()
	}
}

var viewer = new IsometricViewer(document.getElementById("isometric-viewer-container"))
viewer.initializeViewer()
viewer.startAnimation()