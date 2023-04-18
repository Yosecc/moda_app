import { ScrollEventData, ScrollView } from '@nativescript/core/ui'

let scrollv : ScrollView = <ScrollView>this.scrollView.nativeElement;
scrollv.on(ScrollView.scrollEvent, function (args: ScrollEventData) { 
        if(scrollv.scrollableHeight === args.scrollY){
            // console.log("load more items here !!! ");
        } 
 });