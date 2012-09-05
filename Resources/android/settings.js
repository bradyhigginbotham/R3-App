function Settings(height){
	switch (height) {
		case 320:
		case 400: // QVGA
			this.rowTop = height * 0.265;
			this.rowHeight = height * 0.15375;
			this.headerTop = 0;
			this.headerHeight = 20;
			this.headerFontSize = 16;
			this.subtitleTop = 18;
			this.subtitleHeight = 25;
			this.subtitleFontSize = 10;
			this.iconTop = 4;
			this.iconLeft = 10;
			this.iconWidth = 42;
			this.iconHeight = 48;
			this.middleLeft = 45;
			this.scrollableBottom = height * 0.155;
			this.scrollableHeight = height * 0.325;
			break;
		case 480: // HVGA
			this.rowTop = 116;
			this.headerTop = 4;
			this.subtitleTop = 34;
			this.rowHeight = 74;
			this.headerHeight = 30;
			this.subtitleHeight = 30;
			this.iconTop = 5;
			this.iconLeft = 10;
			this.iconWidth = 64;
			this.iconHeight = 74;
			this.headerFontSize = 24;
			this.subtitleFontSize = 12;
			this.scrollableBottom = 72;
			this.scrollableHeight = 165;
			this.middleLeft = 50;
			break;
		case 800:
		case 854: // WVGA
			this.rowTop = height * 0.265;
			this.headerTop = 6;
			this.subtitleTop = 60;
			this.rowHeight = height * 0.15375;
			this.headerHeight = 56;
			this.subtitleHeight = 40;
			this.iconTop = 5;
			this.iconLeft = 10;
			this.iconWidth = 106;
			this.iconHeight = 122;
			this.headerFontSize = 36;
			this.subtitleFontSize = 16;
			this.scrollableBottom = height * 0.15;
			this.scrollableHeight = height * 0.325;
			this.middleLeft = height * 0.0875;
			break;
		case 1184:
		case 1232:
		case 1280: // WXGA
			this.rowTop = height * 0.265;
			this.rowHeight = height * 0.15375;
			this.headerTop = 20;
			this.headerHeight = 80;
			this.headerFontSize = 56;
			this.subtitleTop = 90;
			this.subtitleHeight = 70;
			this.subtitleFontSize = 24;
			this.iconTop = 30;
			this.iconLeft = 40;
			this.iconWidth = 106;
			this.iconHeight = 122;
			this.middleLeft = height * 0.1175;
			this.scrollableBottom = height * 0.15;
			this.scrollableHeight = height * 0.325;
			break;
		default:
			this.rowTop = height * 0.265;
			this.headerTop = 6;
			this.subtitleTop = 60;
			this.rowHeight = height * 0.15375;
			this.headerHeight = 56;
			this.subtitleHeight = 40;
			this.iconWidth = 106;
			this.iconHeight = 122;
			this.headerFontSize = 36;
			this.subtitleFontSize = 16;
			this.scrollableBottom = height * 0.155;
			this.scrollableHeight = height * 0.325;
			this.middleLeft = 70;
			break;
	};

	this.tabHeight = '15.5%';

};
exports.Settings = Settings;