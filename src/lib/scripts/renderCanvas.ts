import type { Rectangle } from "$lib/types/waive";
import type { BarData } from "$lib/waive/audioEngine/barData";

// copied from tailwind.config.cjs...
export const colors: Record<string, string | Record<number, string>> = {
    'white': '#ffffff',
    'black': '#010101',
    'gray': {
        400: '#cccccc',
        500: '#818181',
        600: '#333333',
        700: '#1e1e1e',
        800: '#1a1a1a',
        900: '#141414'
    },
    'red': {
        500: '#d14132',
        600: '#601c13',
    },
    'blue': {
        500: '#3484d0',
        600: '#273e60',
    },
    'purple': {
        500: '#9352c7',
        600: '#632b8d',
    },
    'orange': {
        500: '#eb7130',
        600: '#83371c',
    },
    'green': {
        500: '#54ba84',
        600: '#326e52',
    }
,
}

function floatToHex(x: number){
    // Converts a number in [0, 1] to [00, FF]
    let y = Math.floor(x * 256);
    return (y).toString(16).padStart(2, '0')
}

export function drawNoteBar(canvas: HTMLCanvasElement, barData:  BarData | null, fillColor: string = "#1e1e1e") {
    let ctx = canvas.getContext('2d');
    if(ctx === null){
        return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(typeof barData === 'undefined' || barData === null){
        return;
    }

    // /!\ Assumes `fillColor` is in hex format, without alpha!!
    let bgColor = fillColor + floatToHex(0.5);
    drawRect(ctx, {x: 0, y: 0, w: canvas.width, h: canvas.height}, bgColor);

    let gridWidth = canvas.width/16;
    let gridHeight = canvas.height/12;

    for(let note of barData.gridNotes){
        const rect = {
            x: note[1]*gridWidth,
            y: canvas.height - (note[0] + 1)*gridHeight,
            w: note[2]*gridWidth,
            h: gridHeight,
        }

        drawRect(ctx, rect, fillColor);
    }
};

export function drawDrumBar(canvas: HTMLCanvasElement, barData:  BarData | null, fillColor: string = "#1e1e1e") {
    let ctx = canvas.getContext('2d');
    if(ctx === null){
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(typeof barData === 'undefined' || barData === null){
        return;
    }

    // /!\ Assumes `fillColor` is in hex format, without alpha!!
    let bgColor = fillColor + floatToHex(0.25);
    drawRect(ctx, {x: 0, y: 0, w: canvas.width, h: canvas.height}, bgColor);

    const numRows = barData.gridNotes.length;
    const numCols = barData.gridNotes[0].length;

    const gridWidth = canvas.width/16;
    const gridHeight = canvas.height/numRows;

    for(let i = 0; i < numRows; i++){
        for(let j = 0; j < numCols; j++){

            const velocity = barData.gridNotes[i][j];

            const noteColor = fillColor + floatToHex(velocity);

            const rect = {
                x: j*gridWidth,
                y: i*gridHeight,
                w: gridWidth,
                h: gridHeight,
            }
    
            drawRect(ctx, rect, noteColor);
        }

    }
};

// Use separate helper functions to draw the shapes we need
function drawRect(ctx: CanvasRenderingContext2D, rect: Rectangle, fill: string) {
    ctx.fillStyle = fill;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
}