var healthy = -1;
var sick = -1
var sicks_NS = []; // history of sick people to compute for recover (without symptoms)
var sicks_S = [];  // history of sick people without symptoms for quarantine
var ttr = -1;
var tts = -1;
var symptom_ratio = -1;
var day = 0;
var total_pop = 0;
var death_ratio_no = -1;
var death_ratio_yes = -1;
var quarantine = false;
var total_quarantine = -1;
var infectiosity = -1;
var death = -1;
var recover = -1;

function simulate(){
    // compute symptoms -- switch symptom_ratio from sicks_NS to sicks_S
    let declare_symptoms = 0;
    if (sicks_NS.length >= tts){
        declare_symptoms = parseInt(sicks_NS[tts-1] * symptom_ratio / 100);
        sicks_NS[tts-1] -= declare_symptoms;
        sicks_S.push(declare_symptoms)
    }

    // compute death
    let daily_death = 0;
    let total_sick = 0
    // death of people without symptoms
    for(let i = 0; i < sicks_NS.length; i++){
        let temp = parseInt(sicks_NS[i] * death_ratio_no / 100);
        daily_death += temp;
        sicks_NS[i] -= temp;
        total_sick += sicks_NS[i];
    }
    // death of people with symptoms
    for(let i = 0; i < sicks_S.length; i++){
        let temp = parseInt(sicks_S[i] * death_ratio_yes / 100);
        daily_death += temp;
        sicks_S[i] -= temp;
        total_sick += sicks_S[i];
    }

    // compute sick not in quarantine required to compute new infected -- people in quarantine cannot infect
    let people_not_quarantine = 0;
    for(let i = 0; i < sicks_NS.length; i++){
        people_not_quarantine += sicks_NS[i];
    }
    if (!quarantine){
        for(let i = 0; i < sicks_S.length; i++){
            people_not_quarantine += sicks_S[i];
        }
    }
    
    // compute new infected -- all have no symptoms
    let daily_sick = parseInt(infectiosity * healthy / total_pop * people_not_quarantine);
    daily_sick = Math.min(daily_sick, healthy);
    sicks_NS.push(daily_sick);

    // consider recover
    let daily_recover = 0;
    if (sicks_NS.length > ttr){
        daily_recover += sicks_NS.shift(); // after ttr, people recovered
    }
    if (sicks_S.length > ttr - tts){
        daily_recover += sicks_S.shift(); // people develop symptoms during ttr - tts, if they survive, they recover
    }

    // compute quarantive if active
    if (quarantine){
        total_quarantine = 0
        for(let i = 0; i < sicks_S.length; i++){
            total_quarantine += sicks_S[i];
        }
    }

    //remaining healthy
    healthy -= daily_sick;
    recover += daily_recover;
    death += daily_death;
    total_sick += daily_sick;
    console.log("\nDay: " + (config.data.labels.length + 1))
    console.log("total_pop:" + total_pop);
    console.log("healthy:" + healthy);
    console.log("total_sick:" + total_sick);
    console.log("recover:" + recover);
    console.log("death:" + death);
    console.log("quarantine:" + total_quarantine);

    // update graph data
    config.data.labels.push(config.data.labels.length + 1);
    config.data.datasets[0].data.push(healthy);
    config.data.datasets[1].data.push(total_sick);
    config.data.datasets[2].data.push(recover);
    config.data.datasets[3].data.push(death);
    config.data.datasets[4].data.push(total_quarantine);
}

function reset(){
    day = 1;
    total_pop = parseInt(document.getElementById('total_pop').value);
    sick = parseInt(document.getElementById('infected_pop').value);
    healthy = total_pop - sick;
    symptom_ratio = parseFloat(document.getElementById('symptom_ratio').value);
    sicks_NS = [sick];
    sicks_S = [];
    quarantine = document.getElementById('quarantine').checked;
    death = 0;
    recover = 0;
    ttr = parseFloat(document.getElementById('ttr').value);
    tts = parseFloat(document.getElementById('tts').value);
    infectiosity = parseFloat(document.getElementById('infectiosity').value);
    death_ratio_no = parseFloat(document.getElementById('death_ratio_no').value);
    death_ratio_yes = parseFloat(document.getElementById('death_ratio_yes').value);
    
    // update the plot data
    config.data.labels = [0]; // days
    config.data.datasets[0].data = [healthy];
    config.data.datasets[1].data = [sick];
    config.data.datasets[2].data = [recover];
    config.data.datasets[3].data = [death];
}