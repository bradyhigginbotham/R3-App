function Settings(height){
	switch (height) {
		case 320:
			this.headerTop = 5;
			this.iconWidth = 64;
			this.iconHeight = 74;
			break;
		case 480:
			this.rowTop = 126;
			this.headerTop = 4;
			this.subtitleTop = 34;
			this.rowHeight = 74;
			this.headerHeight = 30;
			this.subtitleHeight = 30;
			this.iconWidth = 64;
			this.iconHeight = 74;
			this.headerFontSize = 24;
			this.subtitleFontSize = 12;
			break;
		case 800:
		case 854:
			this.rowTop = 212;
			this.headerTop = 6;
			this.subtitleTop = 60;
			this.rowHeight = 123;
			this.headerHeight = 56;
			this.subtitleHeight = 40;
			this.iconWidth = 64;
			this.iconHeight = 74;
			this.headerFontSize = 36;
			this.subtitleFontSize = 16;
			break;
	};
	
	this.tabHeight = '15.5%';

};
exports.Settings = Settings;