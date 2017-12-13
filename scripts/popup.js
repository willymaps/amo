function getFillColour(p) {
  for (i = 0; i < resultsData.length; i++) {
    if (p.MUNID === parseInt(resultsData[i][0])) {
      if (resultsData[i][6] == 'yes') {
        return '#3EA144';
      } else if (resultsData[i][7] == 'yes') {
        return '#7E5BBF';
      } else {
        return '#cccccc';
      }
      break;
    }
  }
}

function displayPopup(e) {
    var layer = e.target;
    var p = layer.feature.properties;

    for (i = 0; i < resultsData.length; i++) {
    	if (p.MUNID === parseInt(resultsData[i][0])) {
    		if (resultsData[i][7] === 'yes') {
        		popup.setContent(
                    '<span id="popupBanner" style="background-color:' + getFillColour(p) + '">' + p.LEGAL_NAME + '</span>' +
        			'<p><b>Elected:</b> ' + resultsData[i][3] + '</p>' +
        			'<p><b>Votes:</b> ' + resultsData[i][1] + '</p>' +
                    '<p>*Click to see the full results below</p>', {maxWidth: "auto"}
        			);
            	} else {
                    popup.setContent(
                    '<span id="popupBanner" style="background-color:#cccccc">' + p.LEGAL_NAME + '</span>' +
                    '<p><b>Elected: </b>Results pending</p>' +
                    '<p><b>Votes: </b>counting</p>' +
                    '<p>*Click to see the full results below</p>', {maxWidth: "auto"}
                    );
                }
                break;
        } else {
            // break;
    	}
    }

    popup.setLatLng(layer.getBounds().getCenter());
    map.openPopup(popup);

      if (!popup._map) popup.openOn(map);
      window.clearTimeout(closeTooltip);

      layer.setStyle({
	        weight: 1,
	        color: '#555',
	        opacity: 1,
	        fillOpacity: 0.3
              });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
  };

 function clickPopup(e) {
 		var layer = e.target;
    	var p = layer.feature.properties;
            map.fitBounds(layer.getBounds());
            map.openPopup(popup);
        };

function resetHighlight(e) {
    munLayer.resetStyle(e.target);
    closeTooltip = window.setTimeout(function() {
          map.closePopup();
      }, 100);
};  