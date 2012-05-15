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
    [_property setObject:[TiUtils stringValue:@"Czt63UgBOj5psLyACWYFtLcEnueRbiwh"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"tZwr3LxhZzOlAW6TODRIjqyvX41DKohq"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"OCGTUmTKqVBMz0HYy0I88SQOt8RTaTFA"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
