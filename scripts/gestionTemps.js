let jourSem = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
let options = {weekday: "long"};
let now = new Date().toLocaleDateString("fr-FR",options);
;
let upperCase = now.charAt(0).toUpperCase();
now = upperCase + now.slice(1)

let tabOrdo = jourSem.slice(jourSem.indexOf(now), jourSem.length).concat(jourSem.slice(0, jourSem.indexOf(now)));
export default  tabOrdo;



