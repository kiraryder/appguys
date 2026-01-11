/*
  Kira Hazelwood
  2026
*/

document.getElementById('temp-output').hidden= false;

var totalJob = 1;
var addApp = 1;
var copiedText = '';

const form = document.getElementById('create-form');

function resetForm() {
    document.getElementById('temp-output').hidden= false;
    document.getElementById('create-form').reset();
    document.getElementById('print-template').innerHTML = ``;
    document.getElementById('add-appliance').innerHTML = ``;
    document.getElementById('job-history').innerHTML = ``;
    document.documentElement.scrollTop = 0;
    totalJob = 1;
    addApp = 1;
    copiedText = '';
}


function otherChecked() {
    document.getElementById("limit-other").checked = true;
}


function addAppliance() {
    var apps = document.getElementById('add-appliance');

    var newApp = document.createElement('div');
    newApp.classList.add('form-section');
    newApp.classList.add('mb-3');
    newApp.id = `appliance-${addApp}`;

    newApp.innerHTML = `
        <hr>
        <div class="form-row mb-3">
        <div class="col">
            <input type="text" class="form-control" name="brand-${addApp}" placeholder="Brand">
        </div>
        <div class="col">
        <select name="appliance-${addApp}" class="form-control">
            <option value="default">- Appliance -</option>
            <option value="AC">AC</option>
            <option value="Dishwasher">Dishwasher</option>
            <option value="Dryer">Dryer</option>
            <option value="Fridge">Fridge</option>
            <option value="Furnace">Furnace</option>
            <option value="Garbage Disposal">Garbage Disposal</option>
            <option value="Microwave">Microwave (PM only) </option>
            <option value="Range">Range</option>
            <option value="Range Hood">Range Hood (PM only) </option>
            <option value="Thermostat">Thermostat</option>
            <option value="Washer">Washer</option>
        </select>
        </div>
        <div class="col">
            <input type="text" class="form-control" name="model-${addApp}" placeholder="Model Number">
        </div>
        </div>
        <div class="form-row mb-2">
            <textarea class="form-control" name="problem-${addApp}" rows="4" placeholder="Appliance Problem"></textarea>
        </div>
        <input type="checkbox" name="same-${addApp}" value="same">
        <label for="same-below">**IF SAME AS BELOW??**</label><br>
        <input type="checkbox" name="razor-${addApp}" value="razor">
        <label for="pic-razor">*PIC IN RAZOR*</label><br>
        <input type="checkbox" name="pic-${addApp}" value="pic">
        <label for="see-pic">See pics</label><br>
    `;

    apps.appendChild(newApp);
    addApp += 1;
}


function addJobHistory() {
    var container = document.getElementById('job-history');
    var newJob = document.createElement('textarea');

    newJob.classList.add('form-control');
    newJob.classList.add('mb-3');
    newJob.id = 'job-' + totalJob;
    newJob.rows = 4;

    container.appendChild(newJob);
    totalJob += 1;
}


function copyText() {
    console.log("String being copied:", copiedText);
    navigator.clipboard.writeText(copiedText);
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('temp-output').hidden= true;
    document.documentElement.scrollTop = 0;

    var container = document.getElementById('job-history');
    const textareas = container.querySelectorAll('textarea');
    var history = ``;
    textareas.forEach((textarea, index) => {
        history += `*******************************************************<br>${textarea.value}<br><br>`;
    });


    const formData = new FormData(form);
    const dataObject = {};
    formData.forEach((value, key) => {
        dataObject[key] = value;
    });


    var appContainer = document.getElementById('add-appliance');
    var addApps = ``;
    for (let i = 1; i < addApp; i++) {
        var newSame;
        if (dataObject[`same-${i}`] == 'same') {
            newSame = '**IF SAME AS BELOW??**<br>';
        } else {
            newSame = '';
        }

        var newBrand;
        if (dataObject[`brand-${i}`] == '') {
            newBrand = '?';
        } else {
            var tempBrand = dataObject[`brand-${i}`];
            newBrand = `${tempBrand}`;
        }

        var newAppliance;
        if (dataObject[`appliance-${i}`] == 'default') {
            newAppliance = 'Appliance';
        } else {
            tempAppliance = dataObject[`appliance-${i}`];
            newAppliance = `${tempAppliance}`;
        }

        var newModel;
        if (dataObject[`model-${i}`] == '') {
            newModel = ' ?';
        } else {
            tempModel = dataObject[`model-${i}`];
            newModel = `${tempModel}`;
        }

        var newRazor;
        if (dataObject[`razor-${i}`] == 'razor') {
            newRazor = '*PIC IN RAZOR*<br>';
        } else {
            newRazor = '';
        }

        var newProblem;
        if (dataObject[`problem-${i}`] == '') {
            newProblem = '';
        } else {
            tempProblem = dataObject[`problem-${i}`];
            newProblem = `${tempProblem}<br>`;
        }

        var newPic;
        if (dataObject[`pic-${i}`] == 'pic') {
            newPic = `See pics<br>`;
        } else {
            newPic = '';
        }

        addApps += `${newSame}${newBrand} ${newAppliance} / MOD#${newModel}<br>${newRazor}${newProblem}${newPic}<br>`;
        
        // ${newSame}${newBrand} ${newAppliance} / MOD#${newModel}
        // ${newRazor}${newProblem}${newPic}
    }


    var desc;
    if (dataObject.desc != '') {
        desc = `${dataObject.desc}`;
    } else {
        desc = '';
    }


    var workOrder;
    if (dataObject.workorder == '') {
        workOrder = ' ?';
    } else {
        workOrder = dataObject.workorder;
    }


    var limit;
    if (dataObject.limit !== 'other') {
        limit = `${dataObject.limit}`;
    } else if (dataObject.limit == 'other') {
        limit = `$${dataObject.othernum} limit`;
    } 


    var pmName;
    if (dataObject.pmname == '') {
        pmName = 'Not signed';
    } else {
        pmName = dataObject.pmname;
    }


    var vacant;
    if (dataObject.vacant == 'true') {
        if (dataObject.unit.trim() == '' && dataObject.bldg.trim() == '') {
            vacant = '<br>VACANT<br>';
        } else {
            vacant = '<br>VACANT - ';
        }
    } else {
        vacant = '';
    }


    var bldg;
    if (dataObject.bldg !== '') {
        if (dataObject.vacant == 'false') {
            bldg = `<br>`;
        } else {
            bldg = '';
        }
        if (dataObject.unit.trim() == '') {
            bldg += `BLDG#${dataObject.bldg}<br>`;
        } else {
            bldg += `BLDG#${dataObject.bldg}&nbsp;&nbsp;`;
        }
    } else {
        bldg = '';
    }


    var unit;
    if (dataObject.unit !== '') {
        if (dataObject.bldg.trim() == '' && dataObject.vacant == 'false') {
            unit = `<br>UNIT#${dataObject.unit}<br>`;
        } else {
            unit = `UNIT#${dataObject.unit}<br>`;
        }
    } else {
        unit = '';
    }



    var entry;
    if (dataObject.entry != '') {
        if (dataObject.unit.trim() == '' && dataObject.bldg.trim() == '' && vacant == '') {
            entry = `<br>${dataObject.entry}<br>`;
        } else {
            entry = `${dataObject.entry}<br>`;
        }
    } else {
        entry = '';
    }


    var tenant;
    if (dataObject.tenant != '') {
        tenant = `<br>${dataObject.tenant}<br>`;
    } else {
        tenant = '';
    }


    var brand;
    if (dataObject.brand == '') {
        brand = '?';
    } else {
        brand = `${dataObject.brand}`;
    }


    var appliance;
    if (dataObject.appliance == 'default') {
        appliance = 'Appliance';
    } else {
        appliance = `${dataObject.appliance}`;
    }


    var model;
    if (dataObject.model == '') {
        model = ' ?';
    } else {
        model = `${dataObject.model}`;
    }


    var same;
    if (dataObject.same == 'same') {
        same = '**IF SAME AS BELOW??**<br>';
    } else {
        same = '';
    }


    var problem;
    if (dataObject.problem == '') {
        problem = '';
    } else {
        problem = `${dataObject.problem}<br>`;
    }


    var razor;
    if (dataObject.razor == 'razor') {
        razor = '*PIC IN RAZOR*<br>';
    } else {
        razor = '';
    }


    var pic;
    if (dataObject.pic == 'pic') {
        pic = `See pics<br>`;
    } else {
        pic = '';
    }


    document.getElementById('print-template').innerHTML = `<p style="white-space: pre;"><br><br>${dataObject.timestamp}
${desc}

${dataObject.order}${workOrder} / ${limit}
${pmName}&nbsp;&nbsp;&nbsp;${dataObject.pmemail}&nbsp;&nbsp;&nbsp;${dataObject.pmnum}
${vacant}${bldg}${unit}${entry}${tenant}
${same}${brand} ${appliance} / MOD#${model}
${razor}${problem}${pic}
${addApps}${history}</p>`;

    copiedText = document.getElementById('print-template').innerText;
});


