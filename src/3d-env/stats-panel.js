import * as Stats from 'stats.js';

class StatsPanel {
	constructor (parent) {
		this.stats = new Stats();
          this.parent = parent;
	}

	initialize() {
          this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
          this.parent.appendChild(this.stats.dom);
	}
}

export default StatsPanel;