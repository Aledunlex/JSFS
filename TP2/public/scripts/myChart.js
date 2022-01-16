const nbValues = 12;
const defaultValue = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 10;

const socket = io();

socket.on('number', (message) => 
  addData(message)
  // console.log(message);
         );

const allLabels = new Array(nbValues).fill(defaultValue).map( (_,i) => String.fromCharCode('A'.charCodeAt(0)+i));
// const allLabels = ['J','F','M','A','M','J','J','A','S','O','N','D'];

// l'objet Chart
let myChart;

const setup = () => {
  const ctxt = document.getElementById('myChart').getContext('2d');

  myChart = new Chart(ctxt, {
    type: 'bar',
    data: {
        labels: [...allLabels],
        datasets: [{
            label : `mes ${nbValues} dernières données`,
            data :  new Array(nbValues).fill(defaultValue),
            backgroundColor: 'rgba(128,255,128,0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
              min: MIN_VALUE,
              max: MAX_VALUE
            }
      }
    }
  });
}

  /** 
   * Démarche à suivre :
   *    - on pop le tableau des labels (= on récupère le dernier label), et on unshift ce qu'on a récupéré (= on le met en premier)
   *    - on pop le tableau des données (sans récup), et on unshift la nouvelle donnée (le nouveau chiffre émis depuis le serveur)
   */
function addData(data) {
  // INCORRECT : pour le moment a au moins le mérite de faire défiler les labels, mais ne touche pas aux données
  let lab = myChart.data.labels;
  const lastLabel = lab.pop();
  addOne(lastLabel, data);

  removeLast();

  myChart.update();
}

function addOne(label, data) {
  myChart.data.labels.unshift(label);
  myChart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  myChart.update();
}

function removeLast() {
  myChart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  myChart.update();
}

window.addEventListener('DOMContentLoaded', setup);
