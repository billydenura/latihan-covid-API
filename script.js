function getRegion(){
    fetch('https://covid-api.com/api/regions?per_page=50',{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "X-CSRF-TOKEN":""
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let negara = data.data
            let sectionNegara = document.getElementsByTagName("select")[0]
            console.log(negara)
            for(i=0;i<negara.length;i++){
                let optionNegara = document.createElement("option")
                optionNegara.innerHTML = negara[i].name
                optionNegara.value = negara[i].iso
                sectionNegara.append(optionNegara)
                // console.log(optionNegara)
            }
        })
        .catch(error => console.error(error));

}
function getNegara(){
    let negaraSeluruh = document.getElementsByTagName("select")[0]
    let negaraSelected = negaraSeluruh.options[negaraSeluruh.selectedIndex]
    console.log(negaraSelected.value)
    return negaraSelected.value

}
async function getData(){
    console.log("haloo")
    await fetch(`https://covid-api.com/api/reports/total?date=2020-03-14&iso=${getNegara()}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "X-CSRF-TOKEN":""
        }
        
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let namaNegara = document.getElementsByTagName("h1")[0]
        let kasus = document.getElementById("kasus")
        let mati = document.getElementById("mati")
        let sembuh = document.getElementById("sembuh")

        namaNegara.innerHTML = getNegara()
        kasus.innerHTML = `Total Kasus: ${data.data.confirmed}`
        mati.innerHTML = `Total Meninggal: ${data.data.deaths}`
        sembuh.innerHTML = `Total Sembuh: ${data.data.recovered}`
    })

}
getRegion()
