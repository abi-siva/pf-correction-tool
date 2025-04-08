function calculate() {
  const V = parseFloat(document.getElementById("voltage").value);
  const n = parseInt(document.getElementById("numLoads").value);
  const requiredPF = parseFloat(document.getElementById("requiredPF").value);

  let totalP = 0;
  let totalQ = 0;

  for (let i = 0; i < n; i++) {
    const P = parseFloat(document.getElementById(`P${i}`).value); // in kW
    const PF = parseFloat(document.getElementById(`PF${i}`).value);
    const Q = P * Math.tan(Math.acos(PF)); // in kVAR
    totalP += P;
    totalQ += Q;
  }

  const presentPF = totalP / Math.sqrt(totalP ** 2 + totalQ ** 2);
  const targetQ = totalP * Math.tan(Math.acos(requiredPF));
  const Qc = totalQ - targetQ; // in kVAR

  const frequency = 50; // Hz
  const capacitance = (Qc * 1000) / (2 * Math.PI * frequency * V * V); // in Farads
  const capacitance_microF = capacitance * 1e6; // in microfarads

  document.getElementById("results").innerText =
    `Total Reactive Power without Capacitor: ${totalQ.toFixed(2)} kVAR\n` +
    `Present Power Factor: ${presentPF.toFixed(3)}\n` +
    `Required Capacitive Reactive Power: ${Qc.toFixed(2)} kVAR\n` +
    `Capacitance Required: ${capacitance_microF.toFixed(2)} µF`;
}
