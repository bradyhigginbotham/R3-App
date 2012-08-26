function Settings(height){
	switch (height) {
		case 320:
			this.headerTop = 5;
			this.iconWidth = 64;
			this.iconHeight = 74;
			break;
		case 480:
			this.rowTop = 116;
			this.headerTop = 4;
			this.subtitleTop = 34;
			this.rowHeight = 74;
			this.headerHeight = 30;
			this.subtitleHeight = 30;
			this.iconWidth = 64;
			this.iconHeight = 74;
			this.headerFontSize = 24;
			this.subtitleFontSize = 12;
			this.scrollableBottom = 72;
			this.scrollableHeight = 165;
			this.middleLeft = 50;
			break;
		case 800:
		case 854:
			this.rowTop = 212;
			this.headerTop = 6;
			this.subtitleTop = 60;
			this.rowHeight = 123;
			this.headerHeight = 56;
			this.subtitleHeight = 40;
			this.iconWidth = 106;
			this.iconHeight = 122;
			this.headerFontSize = 36;
			this.subtitleFontSize = 16;
			this.scrollableBottom = '15.5%';
			this.scrollableHeight = '32.5%';
			this.middleLeft = 70;
			break;
		default:
			this.rowTop = height * 0.265;
			this.headerTop = 6;
			this.subtitleTop = 60;
			this.rowHeight = height * 0.15375;
			this.headerHeight = 56;
			this.subtitleHeight = 40;
			this.iconWidth = 128;
			this.iconHeight = 142;
			this.headerFontSize = 36;
			this.subtitleFontSize = 16;
			this.scrollableBottom = height * 0.155;
			this.scrollableHeight = height * 0.325;
			this.middleLeft = height * 0.875;
			break;
	};
	
	this.tabHeight = '15.5%';

};
exports.Settings = Settings;