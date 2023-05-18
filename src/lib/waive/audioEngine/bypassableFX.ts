import * as Tone from 'tone';
import type { SoundSource } from './sampler';

/**  
 * wrapper for effect class / bus adapted from:
 * https://github.com/Tonejs/Tone.js/issues/187
*/
export class BypassableFX extends Tone.ToneAudioNode {

    name: string;
    effect: Tone.ToneAudioNode;
    _bypass: boolean;
    _lastBypass: boolean;
    input: Tone.Gain;
    output: Tone.Gain;
    context: Tone.BaseContext;

    constructor(fx: Tone.ToneAudioNode, bypass=false) {
      super();
      this.effect = fx;
      this.name = "bypassable " + fx.name;
      this._bypass = bypass;
      this._lastBypass = bypass;
      this.context = fx.context;

      this.input = new Tone.Gain({context: fx.context});
      this.output = new Tone.Gain({context: fx.context});
  
      this.effect.connect(this.output);
  
      this.activate(!bypass);
    }
  
    get bypass() {
      return this._bypass;
    }
    set bypass(val) {
      if (this._lastBypass === val) return;
  
      this._bypass = Boolean(val);
      this.activate(!val);
      this._lastBypass = val;
    }
    
    activate(doActivate: boolean) {
      if (doActivate) {
        this.input.disconnect();
        this.input.connect(this.effect);
      } else {
        this.input.disconnect();
        this.input.connect(this.output);
      }
    }
   
    toggleBypass() {
      this.bypass = !this._bypass;
    }
  
    dispose() {
      super.dispose();
      this.effect.dispose();
      return this;
    }

    // set(props: RecursivePartial<ToneWithContextOptions>){
    set(props: any){
      let {bypass, ...fxProps} = props;
      this.bypass = bypass;
      this.effect.set(fxProps);
      return this;
    }

    get() {
      let props = super.get() as any;
      props.bypass = this.bypass;

      return props;
    }
  }
