// Mapbox token and region/modal logic
window.MAPBOX_TOKEN = 'pk.eyJ1IjoiZWRqbzE2IiwiYSI6ImNtY3J4dWVwdDB5dzcybW9odW1tcDBva2cifQ.EYEVfyqoCVUCNcvTZ8EgPQ';
window.WARNING_MESSAGE = 'Please Provide a Mapbox Token in order to use Kepler.gl. Edit this file and fill out MAPBOX_TOKEN with your access key';

window.REGION_DATA = {
  NORTHAMERICA: {
    text: 'Through our network in the United States and Canada, we deliver industry-leading expertise and innovative reinsurance services.'
  },
  LATAM: {
    text: 'Expanding presence across Latin America and the Caribbean, supporting growth in emerging markets with local expertise and global standards.'
  },
  EMEA: {
    text: 'Supporting reinsurance activity across the UAE, Saudi Arabia, Egypt, and key European markets through advisory capabilities, regional insight, and regulatory expertise'
  },
  APAC: {
    text: 'Operating across Singapore, Hong Kong, Japan, and Australia, we provide versatile solutions for fast-evolving economies.'
  },
};

window.filterTypeHandler = function(type, el) {
  document.getElementById("type").value = type;
  if (type === 'All') {
    window.filterType = ["Facultative", "Facultative + Treaties", "Treaties"];
  } else {
    window.filterType = [type];
  }
  document.querySelectorAll('.filter-type').forEach(e => e.classList.remove('active'));
  el.classList.add('active');
};

window.focusRegion = function(regionKey) {
  const region = window.REGION_DATA[regionKey];
  if (!region) return;
  // Animated map movement (if needed, add logic here)
  // Highlight region buttons
  const btns = document.querySelectorAll('.region-btn');
  btns.forEach(btn => btn.classList.remove('active'));
  const regionClass = regionKey.toLowerCase();
  document.querySelectorAll('.region-btn.' + regionClass).forEach(btn => btn.classList.add('active'));
  // Show modal
  document.getElementById('modal-title').innerText = region.title || regionKey;
  document.getElementById('modal-text').innerText = region.text;
  document.getElementById('region-modal').style.display = 'flex';
};

window.closeRegionModal = function() {
  document.getElementById('region-modal').style.display = 'none';
};
