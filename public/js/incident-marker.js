function IncidentMarker(t) {
  (this.onSelected = t.onSelected),
    (this.iconsMapping = t.iconsMapping),
    (this.incidentSeverity = t.incidentSeverity),
    (this._marker = null);
}
(IncidentMarker.prototype._validateSeverity = function (t) {
  return t && t.magnitudeOfDelay;
}),
  (IncidentMarker.prototype._validateIconCategory = function (t) {
    return (t && t.iconCategory) || "Unknown";
  }),
  (IncidentMarker.prototype._validateEvent = function (t) {
    return t && t.events;
  }),
  (IncidentMarker.prototype._validateTime = function (t) {
    return t && window.formatters.formatToDurationTimeString(t.delay);
  }),
  (IncidentMarker.prototype._validateDistance = function (t) {
    return t.length && window.formatters.formatAsMetricDistance(t.length);
  }),
  (IncidentMarker.prototype._validateRoadNumber = function (t) {
    return t && t.roadNumbers;
  }),
  (IncidentMarker.prototype._validateAndParseEndTime = function (t) {
    var e = t && t.endTime;
    if (e)
      return window.Formatters.formatToDateTimeStringForTrafficIncidents(e);
  }),
  (IncidentMarker.prototype._createPopupHeader = function () {
    return ["Category", "Streets", "Length", "Est. end time"]
      .map(function (t) {
        return "<div>" + t + "</div>";
      })
      .join("");
  }),
  (IncidentMarker.prototype._createPopupContent = function (t) {
    var e = t.properties,
      i = this._validateSeverity(e),
      n = this._validateIconCategory(e),
      r = this._validateEvent(e),
      a = this._validateTime(e),
      o = this._validateDistance(e),
      d = this._validateRoadNumber(e),
      c = this._validateAndParseEndTime(e),
      s = DomHelpers.elementFactory("div");
    return (
      (s.innerHTML =
        '<div class="tt-traffic-details"><div class="tt-traffic-details__header"><div class="tt-traffic-icon"><div class="tt-icon-circle-' +
        this.incidentSeverity[i] +
        '"><div class="tt-icon-' +
        this.iconsMapping[n] +
        '"></div></div></div>' +
        (d ? '<div class="tt-road-shield">' + d + "</div>" : "") +
        (r
          ? '<div class="tt-incident-category">' + r[0].description + "</div>"
          : "") +
        '</div></div><div class="tt-traffic-description">' +
        (a
          ? '<div class="tt-incident-delay">' +
            ("No delay" === a ? "<b>" + a + "</b>" : "<b>Delay: </b>" + a) +
            "</div>"
          : "") +
        (o
          ? '<div class="tt-incident-length"><b>Traffic length: </b>' +
            o +
            "</div>"
          : "") +
        (c
          ? '<div class="tt-incident-end-time"><b>Estimated end time: </b>' +
            c +
            "</div>"
          : "") +
        "</div></div>"),
      s
    );
  }),
  (IncidentMarker.prototype.markerFactory = function (t) {
    var e = document.createElement("div");
    e.className =
      "tt-icon-marker tt-icon-circle-" +
      this.incidentSeverity[t.properties.magnitudeOfDelay];
    var i = new tt.Popup({ offset: 15 }).setMaxWidth("none"),
      n = document.createElement("div");
    n.className = "tt-icon-marker-inner";
    var r = new tt.Marker({ anchor: "center", element: e }).setLngLat({
      lng: t.geometry.coordinates[0],
      lat: t.geometry.coordinates[1],
    });
    return (
      (n.className +=
        " tt-icon-" + this.iconsMapping[t.properties.iconCategory]),
      e.appendChild(n),
      i.setDOMContent(this._createPopupContent(t)),
      r.setPopup(i),
      r.getPopup().on("open", this.onSelected.bind(window, t.properties.id)),
      (this._marker = r),
      r
    );
  }),
  (IncidentMarker.prototype.update = function (t) {
    if (this._marker) {
      this._marker.setLngLat(t.geometry.coordinates);
      var e = this._createPopupContent(t);
      this._marker.getPopup() && this._marker.getPopup().setDOMContent(e);
    }
  }),
  (IncidentMarker.prototype.getMarker = function () {
    return this._marker;
  }),
  (window.IncidentMarker = window.IncidentMarker || IncidentMarker);
