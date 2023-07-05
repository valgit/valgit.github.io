---
layout: post
title:  "Flanders trophy 17/18 Juin - jour 2"
categories: [regate, flanders]
date:   2023-06-18
custom_css: leaflet
custom_js: leaflet
---

Dimanche 18 Juin, deuxième jour regate du Flanders Trophy 3&4


{% raw %}
<div id="map" style="height: 500px; position:relative;"></div>
{% endraw %}

{% raw %}
<script>

    var r1GPXFiles = [
            { path: '/gpx/flanders18/r1.gpx', color: 'red',  title: 'race 1' },
            { path: '/gpx/flanders18/r2.gpx', color: 'blue' , title: 'race 2' },
            { path: '/gpx/flanders18/r3.gpx', color: 'green' , title: 'race 3' },
            { path: '/gpx/flanders18/r4.gpx', color: 'yellow' , title: 'race 4' },
        ];

      // set wind
    var windbarbs = [
        { deg: 200, speed:5 },
    ];
</script>
    
<script src="/js/animate.js"></script>
{% endraw %}

relevé des vents de la journée :
![vent](/images/posts/flanders_1718/wind18.png)


disclaimer for icons here
