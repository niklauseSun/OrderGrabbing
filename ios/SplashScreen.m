//
//  SplashScreen.m
//  MyApp
//
//  Created by 孙玉建 on 2022/8/3.
//

#import "SplashScreen.h"

static bool waiting = true;


@implementation SplashScreen

- (dispatch_queue_t)methodQueue{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

+ (void)show {
    while (waiting) {
        NSDate* later = [NSDate dateWithTimeIntervalSinceNow:0.1];
        [[NSRunLoop mainRunLoop] runUntilDate:later];
    }
}

RCT_EXPORT_METHOD(hide) {
    dispatch_async(dispatch_get_main_queue(),
                   ^{
                       waiting = false;
                   });
}

@end
