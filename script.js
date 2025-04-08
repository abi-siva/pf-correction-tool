function generateLoadInputs() {
  const numLoads = parseInt(document.getElementById("numLoads").value);
  const loadInputs = document.getElementById("loadInputs");
  loadInputs.innerHTML = "";

  for (let i = 0; i < numLoads; i++) {
    loadInputs.innerHTML += `
      <h4>Load ${i + 1}</h4>
      Real Power (kW): <input type="number" id="P${i}" step="0.01"><br>
      Power Factor: <input type="number" id="PF${i}" step="0.01"><br>
    `;
  }
}

function calculate() {
  const V = parseFloat(document.getElementById("voltage").value);
  const n = parseInt(document.getElementById("numLoads").value);
  const requiredPF = parseFloat(document.getElementById("requiredPF").value);

  let totalP = 0;
  let totalQ = 0;

  for (let i = 0; i < n; i++) {
    const P = parseFloat(document.getElementById(`P${i}`).value);
    const PF = parseFloat(document.getElementById(`PF${i}`).value);
    const Q = P * Math.tan(Math.acos(PF));
    totalP += P;
    totalQ += Q;
  }

  const presentPF = totalP / Math.sqrt(totalP ** 2 + totalQ ** 2);
  const targetQ = totalP * Math.tan(Math.acos(requiredPF));
  const Qc = totalQ - targetQ;
  const C = (Qc * 1000) / (2 * Math.PI * 50 * V * V); // Capacitance in Farads

  document.getElementById("results").innerText =
    `Total Reactive Power without Capacitor: ${totalQ.toFixed(2)} kVAR\n` +
    `Present Power Factor: ${presentPF.toFixed(3)}\n` +
    `Required Capacitive Reactive Power: ${Qc.toFixed(2)} kVAR\n` +
    `Capacitance Required: ${(C * 1e6).toFixed(2)} µF`;
}
