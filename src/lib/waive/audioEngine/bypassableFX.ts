import * as Tone from 'tone';


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

    constructor(fx: Tone.ToneAudioNode, bypass=false) {
      super();
      this.effect = fx;
      this.name = "bypassable " + fx.name;
      this._bypass = bypass;
      this._lastBypass = bypass;

      this.input = new Tone.Gain();
      this.output = new Tone.Gain();
  
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
  }
