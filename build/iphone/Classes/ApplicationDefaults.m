/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"fhXiiDeGaMuWgvSrOM7w6LcphhlLCnhr"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"R2NOlc559hX65pQxRNzA6KiZ7VBpBKHn"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"UYYt4A2Tiw9DUjOxzJYQwIna2F325YTo"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"jQA3V4n9C0ak5I4EoM7uF168997Fveoh"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"rP4TbrYxuxa5Yn4xNorP62SxVCqc09Qi"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"m5CAI8omUqUmm3Sw1Z8AtPpjzGr07Rww"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
