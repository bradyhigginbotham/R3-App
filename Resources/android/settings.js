function Settings(height){
	var knownHeights = [320, 400, 480, 800, 854, 976, 1184, 1216, 1232, 1280];

	// if device height is tested for
	if (knownHeights.indexOf(height) != -1) {
		switch (height) {
			case 320:
			case 400: // QVGA
				this.rowTop = height * 0.265;
				this.headerTop = 0;
				this.subtitleTop = 18;
				this.rowHeight = height * 0.15375;
				this.headerHeight = 20;
				this.subtitleHeight = 25;
				this.headerFontSize = 16;
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
				this.headerFontSize = 24;
				this.subtitleFontSize = 12;
				this.iconTop = 5;
				this.iconLeft = 10;
				this.iconWidth = 64;
				this.iconHeight = 74;
				this.middleLeft = 50;
				this.scrollableBottom = 72;
				this.scrollableHeight = 165;
				break;
			case 800:
			case 854: // WVGA
				this.rowTop = height * 0.265;
				this.headerTop = 6;
				this.subtitleTop = 60;
				this.rowHeight = height * 0.15375;
				this.headerHeight = 56;
				this.subtitleHeight = 40;
				this.headerFontSize = 36;
				this.subtitleFontSize = 16;
				this.iconTop = 5;
				this.iconLeft = 10;
				this.iconWidth = 106;
				this.iconHeight = 122;
				this.middleLeft = height * 0.0875;
				this.scrollableBottom = height * 0.15;
				this.scrollableHeight = height * 0.325;
				break;
			case 960:
				this.rowTop = 270;
				this.headerTop = 6;
				this.subtitleTop = 60;
				this.rowHeight = height * 0.15375;
				this.headerHeight = 56;
				this.subtitleHeight = 40;
				this.headerFontSize = 42;
				this.subtitleFontSize = 24;
				this.iconTop = 10;
				this.iconLeft = 20;
				this.iconWidth = 106;
				this.iconHeight = 122;
				this.middleLeft = 70;
				this.scrollableBottom = height * 0.155;
				this.scrollableHeight = height * 0.325;
				break;
			case 976:
				this.rowTop = 290;
				this.headerTop = 6;
				this.subtitleTop = 60;
				this.rowHeight = height * 0.15375;
				this.headerHeight = 56;
				this.subtitleHeight = 40;
				this.headerFontSize = 42;
				this.subtitleFontSize = 24;
				this.iconTop = 10;
				this.iconLeft = 60;
				this.iconWidth = 106;
				this.iconHeight = 122;
				this.middleLeft = 150;
				this.scrollableBottom = height * 0.155;
				this.scrollableHeight = height * 0.325;
				break;
			case 1184:
			case 1216:
				this.rowTop = 350;
				this.headerTop = 20;
				this.subtitleTop = 90;
				this.rowHeight = height * 0.15375;
				this.headerHeight = 80;
				this.subtitleHeight = 70;
				this.headerFontSize = 56;
				this.subtitleFontSize = 24;
				this.iconTop = 40;
				this.iconLeft = 50;
				this.iconWidth = 106;
				this.iconHeight = 122;
				this.middleLeft = 190;
				this.scrollableBottom = height * 0.15;
				this.scrollableHeight = height * 0.325;
				break;
			case 1232:
				this.rowTop = 400;
				this.headerTop = 20;
				this.subtitleTop = 90;
				this.rowHeight = height * 0.15375;
				this.headerHeight = 80;
				this.subtitleHeight = 70;
				this.headerFontSize = 56;
				this.subtitleFontSize = 24;
				this.iconTop = 30;
				this.iconLeft = 40;
				this.iconWidth = 106;
				this.iconHeight = 122;
				this.middleLeft = 100;
				this.scrollableBottom = height * 0.15;
				this.scrollableHeight = height * 0.325;
				break;
			case 1280: // WXGA
				this.rowTop = height * 0.265;
				this.headerTop = 20;
				this.subtitleTop = 90;
				this.rowHeight = height * 0.15375;
				this.headerHeight = 80;
				this.subtitleHeight = 70;
				this.headerFontSize = 56;
				this.subtitleFontSize = 24;
				this.iconTop = 30;
				this.iconLeft = 40;
				this.iconWidth = 106;
				this.iconHeight = 122;
				this.middleLeft = height * 0.1175;
				this.scrollableBottom = height * 0.15;
				this.scrollableHeight = height * 0.325;
				break;
		};
	} else { // device height untested
		if (height > 0 && height <= 450){
			this.rowTop = height * 0.265;
			this.headerTop = 0;
			this.subtitleTop = 18;
			this.rowHeight = height * 0.15375;
			this.headerHeight = 20;
			this.subtitleHeight = 25;
			this.headerFontSize = 16;
			this.subtitleFontSize = 10;
			this.iconTop = 4;
			this.iconLeft = 10;
			this.iconWidth = 42;
			this.iconHeight = 48;
			this.middleLeft = 45;
			this.scrollableBottom = height * 0.155;
			this.scrollableHeight = height * 0.325;
		} else if (height > 450 && height <= 750) {
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
		} else if (height > 751 && height <= 1050) {
			this.rowTop = height * 0.265;
			this.headerTop = 6;
			this.subtitleTop = 60;
			this.rowHeight = height * 0.15375;
			this.headerHeight = 56;
			this.subtitleHeight = 40;
			this.headerFontSize = 36;
			this.subtitleFontSize = 16;
			this.iconTop = 5;
			this.iconLeft = 10;
			this.iconWidth = 106;
			this.iconHeight = 122;
			this.middleLeft = height * 0.0875;
			this.scrollableBottom = height * 0.15;
			this.scrollableHeight = height * 0.325;
		} else if (height > 1051) {
			this.rowTop = height * 0.265;
			this.headerTop = 20;
			this.subtitleTop = 90;
			this.rowHeight = height * 0.15375;
			this.headerHeight = 80;
			this.subtitleHeight = 70;
			this.headerFontSize = 56;
			this.subtitleFontSize = 24;
			this.iconTop = 30;
			this.iconLeft = 40;
			this.iconWidth = 106;
			this.iconHeight = 122;
			this.middleLeft = height * 0.1175;
			this.scrollableBottom = height * 0.15;
			this.scrollableHeight = height * 0.325;
		}
	}
	
	// universal tab height
	this.tabHeight = '15.5%';

};
exports.Settings = Settings;