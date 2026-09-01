// Kepler.gl data and customization logic
(function() {
  // Example data and config (move your real data/config here)
  let data = [
    ["UNITED STATES", "Facultative", "North America", 38, -97],
    ["CANADA", "Facultative", "North America", 56.13, -106.35],
    // ... (add all your data rows here)
  ];
  let filterTypes = ["Facultative", "Facultative + Treaties", "Treaties"];
  const datasets = [{
    "version": "v1",
    "data": {
      "id": "dthh84",
      "label": "map.csv",
      "color": [62, 172, 168],
      "allData": data,
      "fields": [
        { "name": "Country", "type": "string", "format": "", "analyzerType": "STRING" },
        { "name": "Type", "type": "string", "format": "", "analyzerType": "STRING" },
        { "name": "Region", "type": "string", "format": "", "analyzerType": "STRING" },
        { "name": "Lat", "type": "real", "format": "", "analyzerType": "FLOAT" },
        { "name": "Long", "type": "real", "format": "", "analyzerType": "FLOAT" }
      ],
      "type": "",
      "metadata": { "id": "dthh84", "format": "row", "label": "map.csv" },
      "disableDataOperation": false
    }
  }];
  const config = { /* ... your config object ... */ };

  // Wait for KeplerGl and store to be available
  function addDataWhenReady() {
    if (window.KeplerGl && window.store) {
      const loadedData = window.KeplerGl.KeplerGlSchema.load(
        datasets,
        config
      );
      setTimeout(() => {
        window.store.dispatch(
          window.KeplerGl.addDataToMap({
            datasets: loadedData.datasets,
            config: loadedData.config,
            readOnly: true,
            options: {
              centerMap: false,
              readOnly: true
            }
          })
        );
      }, 300);
    } else {
      setTimeout(addDataWhenReady, 200);
    }
  }
  addDataWhenReady();
})();
