import type { BarsBeatsSixteenths } from "tone/build/esm/core/type/Units";

export const ROOT_URL = "https://arranlyon.com/waive/";

export function cleanName(name: string){
    let result = name;
	result = result.replace(/_+|-/g, " ");
	// result = result.replace(/[0-9]/g, "");
	result = result.replace(/.wav|.mp3/, "");
	result = result.trim();
	return result;
}

export function map(x: number, xMin: number, xMax: number, rangeMin: number, rangeMax: number){
    return rangeMin + ((x - xMin) / (xMax - xMin)) * (rangeMax - rangeMin);
}

export function clamp(num: number, min: number, max: number) {
    return Math.max(min, Math.min(num, max));
}

export function download(href: string, filename: string) {
	let a = document.createElement("a");
	a.style.display = "none";
	a.href = href;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
}

export function splitTimeString(time: string | BarsBeatsSixteenths){
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

export async function getRequest(root: string, m_type: string, data: any){
    if(!data){
        data = {};
    }

    let parameters = '?';
    for(const key in data){
        parameters += key + "=" + data[key] + "&";
    }
    const url = `${root}api/${m_type}/test${parameters}`;
    return fetch(url, {mode: 'cors'})
    .then(res => {
        if(!res.ok){
            throw new Error(`request to ${url} failed with ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => console.log(error));
}


export async function postRequest(root: string, m_type: string, data: any){
    const req = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF=8'
        },
        body: JSON.stringify({
            "type": m_type,
            "data": data,
            "id": "test",
        })
    }

    const url = root + "apipost";

    return fetch(url, req)
        .then(res => {
            if(!res.ok){
                console.log("failed request");
                console.log(req);
                return
            }
            return res.json();
        })
        .then(res_json => {
            return res_json;
        })
        .catch(error => console.log(error));
}
