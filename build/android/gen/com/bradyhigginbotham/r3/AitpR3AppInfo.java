package com.bradyhigginbotham.r3;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.kroll.common.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class AitpR3AppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";
	
	public AitpR3AppInfo(TiApplication app) {
		TiProperties properties = app.getSystemProperties();
		TiProperties appProperties = app.getAppProperties();
					
					properties.setString("acs-api-key-production", "UYYt4A2Tiw9DUjOxzJYQwIna2F325YTo");
					appProperties.setString("acs-api-key-production", "UYYt4A2Tiw9DUjOxzJYQwIna2F325YTo");
					
					properties.setString("acs-api-key-development", "m5CAI8omUqUmm3Sw1Z8AtPpjzGr07Rww");
					appProperties.setString("acs-api-key-development", "m5CAI8omUqUmm3Sw1Z8AtPpjzGr07Rww");
					
					properties.setString("acs-oauth-secret-development", "jQA3V4n9C0ak5I4EoM7uF168997Fveoh");
					appProperties.setString("acs-oauth-secret-development", "jQA3V4n9C0ak5I4EoM7uF168997Fveoh");
					
					properties.setString("ti.deploytype", "development");
					appProperties.setString("ti.deploytype", "development");
					
					properties.setString("ti.ui.defaultunit", "system");
					appProperties.setString("ti.ui.defaultunit", "system");
					
					properties.setString("acs-oauth-secret-production", "fhXiiDeGaMuWgvSrOM7w6LcphhlLCnhr");
					appProperties.setString("acs-oauth-secret-production", "fhXiiDeGaMuWgvSrOM7w6LcphhlLCnhr");
					
					properties.setString("acs-oauth-key-development", "rP4TbrYxuxa5Yn4xNorP62SxVCqc09Qi");
					appProperties.setString("acs-oauth-key-development", "rP4TbrYxuxa5Yn4xNorP62SxVCqc09Qi");
					
					properties.setString("acs-oauth-key-production", "R2NOlc559hX65pQxRNzA6KiZ7VBpBKHn");
					appProperties.setString("acs-oauth-key-production", "R2NOlc559hX65pQxRNzA6KiZ7VBpBKHn");
	}
	
	public String getId() {
		return "com.bradyhigginbotham.r3";
	}
	
	public String getName() {
		return "AITP R3";
	}
	
	public String getVersion() {
		return "1.0";
	}
	
	public String getPublisher() {
		return "Stick";
	}
	
	public String getUrl() {
		return "http://bradyhigginbotham.com";
	}
	
	public String getCopyright() {
		return "2012 by Stick";
	}
	
	public String getDescription() {
		return "not specified";
	}
	
	public String getIcon() {
		return "appicon.png";
	}
	
	public boolean isAnalyticsEnabled() {
		return true;
	}
	
	public String getGUID() {
		return "0d9d8c45-239f-4488-8e63-b375e7efae7a";
	}
	
	public boolean isFullscreen() {
		return false;
	}
	
	public boolean isNavBarHidden() {
		return false;
	}
}
