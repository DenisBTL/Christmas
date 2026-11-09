// A locally synthesized instrumental arrangement of the traditional Jingle Bells.
// No recordings, third-party requests, or audio downloads are required.
type Note = readonly [midi: number, beats: number];
const melody: readonly (readonly Note[])[] = [
  [[76,1],[76,1],[76,2]], [[76,1],[76,1],[76,2]],
  [[76,1],[79,1],[72,1.5],[74,.5]], [[76,4]],
  [[77,1],[77,1],[77,1],[77,1]], [[77,1],[76,1],[76,1],[76,.5],[76,.5]],
  [[76,1],[74,1],[74,1],[76,1]], [[74,2],[79,2]],
  [[76,1],[76,1],[76,2]], [[76,1],[76,1],[76,2]],
  [[76,1],[79,1],[72,1.5],[74,.5]], [[76,4]],
  [[77,1],[77,1],[77,1],[77,1]], [[77,1],[76,1],[76,1],[76,.5],[76,.5]],
  [[79,1],[79,1],[77,1],[74,1]], [[72,4]],
];
const chords = [[48,52,55],[48,52,55],[48,52,55],[48,52,55],
  [53,57,60],[48,52,55],[50,53,57],[43,47,50],
  [48,52,55],[48,52,55],[48,52,55],[48,52,55],
  [53,57,60],[48,52,55],[43,47,50],[48,52,55]];

export class ChristmasMusic {
  private context: AudioContext | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;

  async start() {
    this.stop();
    const Audio = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Audio) throw new Error('Audio indisponible');
    const context = new Audio();
    this.context = context;
    await context.resume();
    if (this.context !== context) return false;
    if (context.state !== 'running') { this.stop(); throw new Error('Audio suspendu'); }
    const master = context.createGain();
    master.gain.setValueAtTime(.0001, context.currentTime);
    master.gain.linearRampToValueAtTime(.24, context.currentTime + .35);
    const compressor = context.createDynamicsCompressor();
    master.connect(compressor); compressor.connect(context.destination);
    const echo = context.createDelay(.5);
    const echoLevel = context.createGain();
    echo.delayTime.value = .14; echoLevel.gain.value = .14;
    master.connect(echo); echo.connect(echoLevel); echoLevel.connect(compressor);
    const beat = 60 / 132;
    function tone(midi: number, time: number, duration: number, volume: number, bell = false) {
      const frequency = 440 * 2 ** ((midi - 69) / 12);
      const partials = bell ? [[1,1],[2.76,.18],[5.4,.045]] : [[1,1],[2,.12]];
      for (const [ratio, level] of partials) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = frequency * ratio;
        gain.gain.setValueAtTime(.0001, time);
        gain.gain.exponentialRampToValueAtTime(volume * level, time + .008);
        gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
        oscillator.connect(gain); gain.connect(master);
        oscillator.start(time); oscillator.stop(time + duration + .02);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      }
    }
    let bar = 0;
    let next = context.currentTime + .08;
    const schedule = () => {
      while (next < context.currentTime + .5) {
        const index = bar % melody.length;
        let offset = 0;
        for (const [note, length] of melody[index]) {
          tone(note, next + offset * beat, Math.min(length * beat * .85, 1.1), .33, true);
          offset += length;
        }
        const chord = chords[index];
        for (let count = 0; count < 4; count++) {
          const time = next + count * beat;
          if (count % 2 === 0) tone(chord[count === 0 ? 0 : 2], time, beat * .8, .23);
          else for (const note of chord) tone(note + 12, time, beat * .6, .065);
          // A quiet pair of bright chimes gives the rhythm a sleigh-bell feel.
          tone(102, time, .065, .04, true);
          tone(109, time + beat / 2, .045, .025, true);
        }
        next += 4 * beat;
        bar++;
      }
    };
    schedule();
    this.timer = setInterval(schedule, 150);
    return true;
  }

  stop() {
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
    const context = this.context;
    this.context = null;
    if (context && context.state !== 'closed') void context.close().catch(() => {});
  }
}
