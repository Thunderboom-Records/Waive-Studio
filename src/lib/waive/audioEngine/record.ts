import * as Tone from 'tone';
import type { ToneAudioBuffer } from "tone";

import { FXChains, buildWaiveAudioGraph, getAudioGraphProps } from "./fxChains";
import { download } from '$lib/scripts/utils';
import { recording } from '../stores/stores';
import { arrangements } from '../stores/stores';
import { InstrumentType } from '$lib/types/waive';
import { get } from 'svelte/store';
import { makeBassCallback, makeDrumsCallback } from './synths';

export function record(){
    const offlineContext = new Tone.OfflineContext(2, Tone.Time(Tone.Transport.loopEnd).toSeconds(), 44100);
    const offlineTransport = offlineContext.transport;
    offlineTransport.bpm.value = Tone.Transport.bpm.value;
    offlineTransport.swing = Tone.Transport.swing;
    offlineTransport.swingSubdivision = Tone.Transport.swingSubdivision;

    const props = getAudioGraphProps(FXChains);
    const {FXChains: offlineFXChains} = buildWaiveAudioGraph(offlineContext, props);

    if(typeof offlineFXChains[InstrumentType.BASS] !== 'undefined'){
      const bassTimings = get(arrangements[InstrumentType.BASS]).getTimings();
      const bassCallback = makeBassCallback(offlineFXChains[InstrumentType.BASS][0].node);

      const bassPart = new Tone.Part({context: offlineContext});
      bassPart.callback = (time, val) => bassCallback(val, time);
      bassTimings.forEach(event => {
        bassPart.add(event.time, event)
      });
      bassPart.start(0);
    }

    const drumTimings = get(arrangements[InstrumentType.DRUMS]).getTimings();
    const drumCallback = makeDrumsCallback(offlineFXChains);

    const drumPart = new Tone.Part({context: offlineContext});
    drumPart.callback = (time, val) => drumCallback(val, time);
    drumTimings.forEach(event => {
      drumPart.add(event.time, event)
    });
    drumPart.start(0);

    offlineContext.transport.start(0);

    setTimeout(() => {
      // wait for all samples to reload... not great!
      offlineContext.render().then(buffer => {
        console.log("rendering done");
        console.log(buffer.numberOfChannels, buffer.length, buffer.duration);
        recording.set(false);
        const href = URL.createObjectURL(bufferToWave(buffer));
        download(href, "loop.wav");

        // TODO: dispose of graph!

      })
    }, 500)
}


// Convert an AudioBuffer to a Blob using WAV representation
// from https://russellgood.com/how-to-convert-audiobuffer-to-audio-file/
export function bufferToWave(abuffer: ToneAudioBuffer) {
    let numOfChan = abuffer.numberOfChannels,
        length = abuffer.length * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        offset = 0,
        pos = 0;
  
    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"
  
    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)
  
    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length
  
    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));
  
    while(pos < length) {
      for(i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
      }
      offset++                                     // next source sample
    }
  
    // create Blob
    return new Blob([buffer], {type: "audio/wav"});
  
    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
  
    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }