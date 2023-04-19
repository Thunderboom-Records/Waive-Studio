
export function renderWaveform(
    canvas: HTMLCanvasElement | undefined, 
    waveform: Float32Array | undefined,
){
    if(typeof canvas === 'undefined'){
        return;
    }
        
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if(ctx === null){
        return;
    }
    
    ctx.resetTransform();
    ctx.translate(0, canvas.height / 2);
    ctx.clearRect(0, -canvas.height, canvas.width, canvas.height * 2);
    
    if(typeof waveform === 'undefined' || waveform.length == 0){
        return;
    }
    
    const step = Math.floor(waveform.length / canvas.width);
    const top: number[] = [];
    const bottom: number[] = [];
    const scale = canvas.height / 2 - 2;
    
    for(let i = 0; i < waveform.length; i += step){
        const slice = waveform.slice(i, i+step)
        let min = 1;
        let max = -1;
        for(let j = 0; j < slice.length; j++){
            min = Math.min(min, slice[j]);
            max = Math.max(max, slice[j]);
        }
        top.push(max);
        bottom.push(min);
    }
    
    ctx.strokeStyle ="orange";
    ctx.lineWidth = 1;
    ctx.lineCap = "square";
    for(let i = 0; i < top.length; i++){
        ctx.beginPath();
        ctx.moveTo(i, -top[i] * scale);
        ctx.lineTo(i, -bottom[i] * scale);
        ctx.stroke();
        ctx.closePath();
    }
}