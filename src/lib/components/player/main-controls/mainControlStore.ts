import { writable } from 'svelte/store';

function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}

export const count = createCount();

export enum TIMERSTATE {
    NEW,
    RUNNING,
    PAUSED
};

export interface TimerStoreModel  {
    timerState: TIMERSTATE,
    startTime: number,
    elapsedTime: number,
    pausedTime: number
};


const initialState: TimerStoreModel = {
    timerState: TIMERSTATE.NEW,
    startTime: 0,
    elapsedTime: 0,
    pausedTime: 0
};

function createTimer()  {

    const { subscribe, set, update } = writable(initialState);

    function start(state: TimerStoreModel) {
        state.startTime = Date.now();
        state.timerState = TIMERSTATE.RUNNING;
        setInterval(() => {
            if (state.timerState === TIMERSTATE.RUNNING) {
                const endTime = Date.now();
                state.elapsedTime = endTime - state.startTime + state.pausedTime;
            }
        });
        return state;
    };

    function pause(state: TimerStoreModel) {
        state.timerState = TIMERSTATE.PAUSED;
        state.pausedTime = state.elapsedTime;
        return state;
    };

    function resume(state: TimerStoreModel) {
        state.startTime = Date.now();
        state.timerState = TIMERSTATE.RUNNING;
        return state;
    }

    return {
        subscribe,
        reset: () => set(initialState),
        start: () => update(state => start(state)),
        pause: () => update(state => pause(state)),
        resume: () => update(state => resume(state))
    };
}

export const timer = createTimer();
