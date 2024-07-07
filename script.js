/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

/* --------------- Passes and Angle Ranges --------------------- */
const spinValues = [
  { minDegree: 61, maxDegree: 90, pass: "Unlimited Hugs" },
  { minDegree: 31, maxDegree: 60, pass: "High Five" },
  { minDegree: 0, maxDegree: 30, pass: "Free Kiss" },
  { minDegree: 331, maxDegree: 360, pass: "Handshake" },
  { minDegree: 301, maxDegree: 330, pass: "Spin Again" },
  { minDegree: 271, maxDegree: 300, pass: "Free Compliment" },
  { minDegree: 241, maxDegree: 270, pass: "Nothing lol" },
  { minDegree: 211, maxDegree: 240, pass: "Hugs & Kisses Combo Pack" },
  { minDegree: 181, maxDegree: 210, pass: "Make a Wish" },
  { minDegree: 151, maxDegree: 180, pass: "Spin Again" },
  { minDegree: 121, maxDegree: 150, pass: "Movie Date" },
  { minDegree: 91, maxDegree: 120, pass: "Ice Cream" },
];

/* --------------- Size Of Each Piece  --------------------- */
const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

/* --------------- Background Colors  --------------------- */
const spinColors = [
  "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99",
  "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a",
  "#4B0082", "#b15928"
];

/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 14 },
      },
    },
  },
});

/* --------------- Display Pass Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      text.innerHTML = `<p>Congratulations, You Have Won "${i.pass}"! </p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

/* --------------- Spinning Code --------------------- */
let count = 0;
let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>Best Of Luck!</p>`;
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation = spinChart.options.rotation + resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    } else if (count > 15 && spinChart.options.rotation == randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
/* --------------- End Spin Wheel  --------------------- */
