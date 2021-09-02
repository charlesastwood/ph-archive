!function(e,t){e.nicemap={},e.nicemap.templates={},e.nicemap.templates.simple_marker=function(){return['<div class="marker-box simple-marker">{title}</div>'].join("\n")},e.nicemap.templates.icon_marker=function(){return['<div class="marker-box icon-marker">','<div class="the-icon"><img src="{icon}" alt="" /></div><!--','--><div class="the-label"><span class="el-title">{title}</span><span class="el-content">{content}</span></div>',"</div>"].join("\n")},e.nicemap.templates.icon_marker_color=function(){return e.nicemap.templates.icon_marker().replace("icon-marker","icon-marker icon-marker-color")},e.nicemap.templates.icon_marker_anim=function(){return e.nicemap.templates.icon_marker_color().replace("icon-marker-color","icon-marker-color icon-marker-anim")},e.nicemap.templates.icon_marker_anim_reverse=function(){return e.nicemap.templates.icon_marker_color().replace("icon-marker-color","icon-marker-color icon-marker-anim-rev")},e.nicemap.templates.icon_marker_single=function(){return['<div class="marker-box icon-marker single-line">','<div class="the-icon"><img src="{icon}" alt="" /></div><!--','--><div class="the-label"><span class="el-content">{title}</span></div>',"</div>"].join("\n")},e.nicemap.templates.icon_marker_single_color=function(){return e.nicemap.templates.icon_marker_single().replace("icon-marker","icon-marker icon-marker-color")},e.nicemap.templates.icon_marker_single_anim=function(){return e.nicemap.templates.icon_marker_single_color().replace("icon-marker-color","icon-marker-color icon-marker-anim")},e.nicemap.templates.icon_marker_single_anim_reverse=function(){return e.nicemap.templates.icon_marker_single_color().replace("icon-marker-color","icon-marker-color icon-marker-anim-rev")},e.nicemap.templates.icon_only=function(){return['<div class="marker-box icon-only-marker" title="{title}"><img src="{icon}" alt="" /></div>'].join("\n")},e.nicemap.templates.simple_infowindow=function(){return['<div class="infowindow-box default-infowindow">',"<h3>{title}</h3>","<p>{desc}</p>","</div>"].join("\n")},e.nicemap.buildHTML=function(t,i){var n="function"==typeof e.nicemap.templates[t]?e.nicemap.templates[t]():"";for(var r in i)n=n.replace("{"+r+"}",i[r]);return n},e.nicemap.default_options={marker_template:"simple_marker",infowindow_template:"simple_infowindow",map_options:{zoom:8,mapTypeId:"roadmap",scrollwheel:!1}},e.fn.nicemap=function(t){return e(this).each(function(){e(this).data("nicemap")||new i(e(this),t)})},e.fn.nicemapInstance=function(){return e(this).data("nicemap")};var i=function(i,n){this.$el=i,this._id=this.$el.attr("id"),this._opts=e.extend({},!0,e.nicemap.default_options,n),this.$el.data("nicemap",this),this._markers=[],this._geocoder=new t.maps.Geocoder,this._setupMap(),this._trigger("ready")};i.prototype={_setupMap:function(){var e=this;this._bounds=new t.maps.LatLngBounds,this._map=new t.maps.Map(this.$el.get(0),this._opts.map_options),this.getMap().setTilt(45),this._infoWindow=new t.maps.InfoWindow,t.maps.event.addListener(this._infoWindow,"closeclick",function(){e._activeMarker&&e._activeMarker.label.$elem.show(),e._trigger("infoclose",[e._activeMarker]),e._activeMarker=null});var i=t.maps.event.addListener(this.getMap(),"bounds_changed",function(){this.setZoom(14),t.maps.event.removeListener(i)})},_trigger:function(e,t){t&&"undefined"!=t||(t=[]),t.push(this),this.$el.trigger("nicemap."+e,t)},getElement:function(){return this.$el},getMap:function(){return this._map},getBounds:function(){return this._bounds},getInfoWindow:function(){return this._infoWindow},addMarker:function(i,n,r,a){var s=this;this.getBounds().extend(i.position);var o=i.hasOwnProperty("template")?i.template:n?n:this._opts.marker_template,c=i.hasOwnProperty("info_template")?i.info_template:r?r:this._opts.infowindow_template,l=new t.maps.Marker({map:this.getMap(),icon:"images/pixel.png",position:i.position,title:i.title,label:e.nicemap.buildHTML(o,i.data),draggable:!1});return l.label.$elem.addClass("marker-type_"+o),l.attachment=i,t.maps.event.addListener(l,"zindex_changed",function(){l.label.$elem.css("z-index",l.getZIndex())}),t.maps.event.addListener(l,"visible_changed",function(){l.getVisible()?l.label.$elem.show():l.label.$elem.hide()}),(i.popup===!0||"object"==typeof i.popup)&&(a?l.info=a:l.info=this.getInfoWindow(),t.maps.event.addListener(l,"click",function(){s._activeMarker&&s._activeMarker.label.$elem.show(),s._activeMarker=l,l.info.setContent(e.nicemap.buildHTML(c,i.popup)),l.info.open(s.getMap(),l),s._trigger("infoopen",[l]),l.label.$elem.hide()}),l.label.$elem.click(function(){new t.maps.event.trigger(l,"click")})),l.label.$elem.click(function(){s._trigger("marker_click",[l]),i.link&&(location.href=i.link)}),this.getMap().fitBounds(this.getBounds()),this.getMap().setCenter(this.getBounds().getCenter()),this._markers.push(l),l},getMarker:function(e){return this._markers.hasOwnProperty(e)?this._markers[e]:null},getMarkers:function(){return this._markers},centerTo:function(e){return this._map.setCenter(e),this},centerToMarker:function(e){return this.centerTo(e.getPosition())},getFilteredMarkers:function(t){var i=this,n=[];return e.each(this._markers,function(){t.apply(i,[this])===!0&&n.push(this)}),n},getFilteredMarker:function(e){var t=this.getFilteredMarkers(e);return t&&t.length>0?t[0]:null},showMarkersExcept:function(t){var i=this;return e.each(this._markers,function(){t.apply(i,[this])===!0?this.setVisible(!1):this.setVisible(!0)}),this._trigger("markers_refreshed"),this},showMarkersOnly:function(t){var i=this;return e.each(this._markers,function(){t.apply(i,[this])===!0?this.setVisible(!0):this.setVisible(!1)}),this._trigger("markers_refreshed"),this},showAllMarkers:function(){return this.showMarkersOnly(function(){return!0}),this._trigger("markers_refreshed"),this},filtersMarkers:function(e,t){t&&void 0!=t||(t="filter");var i="array"==typeof e?e:e.split(",");return this.showMarkersOnly(function(e){return e.attachment.sticky||e.attachment.hasOwnProperty(t)&&i.indexOf(e.attachment[t])>-1?!0:!1}),this},geocoder:function(e,t){var i=this;this._geocoder.geocode({latLng:e},function(e){e&&e.length>0?t.apply(i,[!0,e[0].formatted_address,e]):t.apply(i,[!1,null,e])})},latLngGeocoder:function(e,i,n){this.geocoder(new t.maps.LatLng(e,i),n)},markerGeocoder:function(e,t){this.geocoder(e.getPosition(),t)},calculateDistance:function(e,t){return e.distanceFrom(t)},calculateDistanceMiles:function(e,t){var i=this.calculateDistance(e,t);return i/1609},calculateMarkerDistance:function(e,t){return this.calculateDistance(e.getPosition(),t.getPosition())},calculateMarkerDistanceMiles:function(e,t){return this.calculateDistanceMiles(e.getPosition(),t.getPosition())}},e(function(){e(document).on({mouseover:function(){e(this).addClass("hover")},mouseout:function(){e(this).removeClass("hover")}},".map-marker-object")}),"undefined"!=typeof t&&(t.maps.MarkerLabel=function(t){this.setValues(t),this.$elem=e("<div></div>"),this.$elem.addClass("map-marker-object")},t.maps.MarkerLabel.prototype=jQuery.extend(new t.maps.OverlayView,{onAdd:function(){this.getPanes().overlayImage.appendChild(this.$elem.get(0));var e=this;this.listeners=[t.maps.event.addListener(this,"position_changed",function(){e.draw()})]},draw:function(){var e=String(this.get("text")),t=this.getProjection().fromLatLngToDivPixel(this.get("position"));this.$elem.html(e),this.$elem.css({left:t.x-this.$elem.width()/2+"px",top:t.y-this.$elem.height()-13+"px"})}}),t.maps.Marker.prototype.setLabel=function(e){this.label=new t.maps.MarkerLabel({map:this.map,marker:this,text:e}),this.label.bindTo("position",this,"position")},t.maps.LatLng.prototype.distanceFrom=function(e){var t=[this.lat(),e.lat()],i=[this.lng(),e.lng()],n=6378137,r=(t[1]-t[0])*Math.PI/180,a=(i[1]-i[0])*Math.PI/180,s=Math.sin(r/2)*Math.sin(r/2)+Math.cos(t[0]*Math.PI/180)*Math.cos(t[1]*Math.PI/180)*Math.sin(a/2)*Math.sin(a/2),o=2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s)),c=n*o;return Math.round(c)})}(window.jQuery,window.google);