initializeApp();

const config = [
    document.getElementById('step1'),
    document.getElementById('step2'),
    document.getElementById('step3'),
    document.getElementById('step4'),
];

const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

const brand = ["Cakon", "Go MN", "VANY"];

const item = {
    "Cakon" : ["ABC 3000M","ABC 5000M","ABC 7000M","ABC 9000M","ABC 9900M"],
    "Go MN" : ["UIK 110C","UIK 210C","UIK 230C","UIK 250C", "UIK 270C"],
    "VANY" : ["CEV 1100P","CEV 1300P","CEV 1500P","CEV 1700P","CEV 1900P"]
}


class Model {
    
    //カメラモデルと消費電力の連想配列（カメラモデル：消費電力）
    static PowerConsumptionWh(){
        var list = new Array();
        for(let i = 0; i < camera.length; i++){
            list[camera[i]["model"]] = camera[i]["powerConsumptionWh"];
        }
        return list;
    }

    //終始電圧時の最大放電電力(W)を求めた連想配列を返す（バッテリー：最大放電電力）
    //終始電圧（V）* 最大放電電流（A）(endVoltage * maxdraw)
    static calculateEndVoltageMaxWatt(){
        let list = new Array();
        var ans = 0;
        for(let i = 0; i < battery.length; i++){
            ans = battery[i]["endVoltage"] * battery[i]["maxDraw"];
            list[battery[i]["batteryName"]] = ans;
        }
        return list;
    }

    // 電力容量（W/hr）を求めた連想配列を返す （バッテリー：電力容量）
    //（voltage * capacityAh）
    // 持続時間を求めるために使用する
    static calculateWattHour(){
        let list = new Array();
        var ans = 0;
        for(let i = 0; i < battery.length; i++){
            ans = battery[i]["voltage"] * battery[i]["capacityAh"];
            list[battery[i]["batteryName"]] = ans;
        }
        return list;
    }

    static getAvailableBattery(PowerConsumption, accessoryPowerConsumption){

        let result = [];
        let hash = Model.calculateEndVoltageMaxWatt();
        PowerConsumption += accessoryPowerConsumption; 
        for(let key in hash){
            if(hash[key] > PowerConsumption) result.push(key);
        }  
        return result.sort();
    }

    static getPowerDuration(availableBattery, PowerConsumption, accessoryPowerConsumption){

        let result = [];
        let hash = Model.calculateWattHour(); // (W/hr)
        let cameraW = PowerConsumption + accessoryPowerConsumption;
        for(let i = 0; i < availableBattery.length; i++){
            var val = hash[availableBattery[i]] / cameraW;
            result.push(val.toFixed(1));
        }
        return result;
    }

}

class View {

    static createSelectForm(){
        let htmlString = "";
        for(let i = 0; i < 2; i++){

            htmlString = (i == 0)? `<h5>step${i+1}: Select your Brand</h5>` : `<h5>step${i+1}: Select your Model</h5>`;

            htmlString +=  `
            <select id="selectbtn${i}" class="form-select productSelection mb-4 w-form p-2">
            </select>
            `
            config[i].innerHTML =  `${htmlString}`;
        }
    }

    static setPullDown1(){
        let step1select = document.getElementById("selectbtn0");
        let htmlString = "";
        for(let i = 0; i < brand.length; i++){
            let brandName = brand[i];
            htmlString += `
            <option id="brand${i}" value="${brandName}">${brandName}</option>
            `;
        }
        step1select.innerHTML += `${htmlString}`;

        //step2の初期値設定
        let step2SelectDefault = document.getElementById("selectbtn1");

        for(let j = 0; j < item["Cakon"].length; j++){
            let htmlString2 = `<option>${item["Cakon"][j]}</option>`;
            step2SelectDefault.innerHTML += `${htmlString2}`;
        }

        step1select.addEventListener("change", function(){    
            View.setPullDown2(step1select.value);
        });
        
    }

    static setPullDown2(brandName){
        let step2select = document.getElementById("selectbtn1");
        step2select.innerHTML = "";
        for(let i = 0; i < item[brandName].length; i++){
            let htmlString = brandName == "Cakon"?  `<option class="${brandName}" id="${brandName}${i}">${item[brandName][i]}</option>`
            : `<option class="${brandName}" id="${brandName}${i}">${item[brandName][i]}</option>`;

            step2select.innerHTML += `${htmlString}`;
        }
    }

    //利用可能なバッテリーの配列を受け取り、リストに表示する
    static showAvailableBattery(availableBattery, duration){
        let s4 = config[3];
        s4.innerHTML = `<h5 class="mb-3">step4: Choose your Battery</h5>`; 
        for(let i = 0; i < availableBattery.length; i++){
            var box = document.createElement("div");
            box.classList.add("box", "d-flex", "justify-content-between", "border", "align-items-center");
            var li = document.createElement("h5");
            var li2 = document.createElement("p");
            li2.classList.add("font-weight-bold", "pt-2");
            li.textContent = availableBattery[i];
            li2.textContent = `Estimated ${duration[i]} hours on selected setup`;
            box.append(li);
            box.append(li2);
            s4.append(box);
        }
    }
}

class Controller {

    static getBatteryInfo(){
        let s0 = document.getElementById("selectbtn0");
        let s1 = document.getElementById("selectbtn1");
        let watt = document.getElementById("watt");

        s0.addEventListener('change', function(){
            let PW = Model.PowerConsumptionWh()[`${s1.value}`];
            let AvailableB = Model.getAvailableBattery(PW, 0);
            let Duration = Model.getPowerDuration(AvailableB, PW, 0);
            View.showAvailableBattery(AvailableB, Duration);
        });

        s1.addEventListener('change', function(){
            let PW = Model.PowerConsumptionWh()[`${s1.value}`];
            let AvailableB = Model.getAvailableBattery(PW, 0);
            let Duration = Model.getPowerDuration(AvailableB, PW, 0);
            View.showAvailableBattery(AvailableB, Duration);
        });

        watt.addEventListener("input", function(){
            let AConsumption = parseInt(watt.value, 10) <= 100 ? parseInt(watt.value, 10) : 100;    
            let PW = Model.PowerConsumptionWh()[`${s1.value}`];
            let AvailableB = Model.getAvailableBattery(PW, AConsumption);
            let Duration = Model.getPowerDuration(AvailableB, PW,AConsumption);
            View.showAvailableBattery(AvailableB, Duration);
        });
        
    }  
}

function initializeApp(){
    const target = document.getElementById("target");

    target.innerHTML = `
        <div class="w-100 h-auto d-flex justify-content-center text-center">
            <div class="m-5">
                <div id="step1" class="h-auto">  
                </div>
                <div id="step2" class="">
                </div>
                <div id="step3" class="">
                    <h5>step3: Input Accessory Power Consumpution</h5>
                    <input id="watt" type="number" placeholder="0 ~ 100" class="mt-2 mb-4 w-input" min = 0 max=100><label class="pl-2"><h5>W</h5></label>
                </div>
                <div id="step4" class="d-flex flex-column justify-content-center align-items-center">
                    <h5 class="mb-3">step4: Choose your Battery</h5>
                </div>
            </div>
        </div>
    `
}

View.createSelectForm();
View.setPullDown1();
Model.PowerConsumptionWh();
Controller.getBatteryInfo();


