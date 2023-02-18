export function splitTimeString(time: string){
    let bbs = time.split(":");
    let bar = 0;
    let beat = 0;
    let sixteenth = 0;
    if(bbs.length == 3){
        bar = parseInt(bbs[0]);
        beat = parseInt(bbs[1]);
        sixteenth = parseInt(bbs[2]);
    } else if(bbs.length == 2){
        beat = parseInt(bbs[0]);
        sixteenth = parseInt(bbs[1]);
    } else if(bbs.length == 1){
        sixteenth = parseInt(bbs[0]);
    }

    return {bar, beat, sixteenth}
}