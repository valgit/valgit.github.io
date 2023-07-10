---
layout: post
title:  "Sortie du 8 Juilet"
categories: entrainement
date:   2023-07-01
excerpt: sortie du 8 Juillet
custom_css: leaflet
custom_js: leaflet
---

carnet de bord de la sortie du 8 Juillet

deux sortiex ce jour, une matin, une apres-midi !

# matin 
vent quasi nul :    
![vent matin](/images/posts/sortie0807/wind_matin.png)
propice à la reflection strategique pour atteindre la sortie du port.

# apres-midi 

vent un peu plus fort, sortie plus classique, et reflection sur l'idée d'engager le bateau et un équipage sur la SpiOuest 2024 !

![vent aprem](/images/posts/sortie0807/wind_aprem.png)


{% raw %}
<div id="map" class="map leaflet-container" style="height: 500px; position:relative;"></div>
{% endraw %}


{% raw %}
  <script>
        var gpx_file = "/gpx/0807aprem.gpx";
        var winddir = 270;
    </script>  
{% endraw %}

{% raw %}
<script src="/js/analysis.js"></script>
<script>
    // load files
    var r1GPXFiles = [            
            { path: '/gpx/0107_p1.gpx', color: 'blue',  title: 'p1' }, 
            { path: '/gpx/0107_p2.gpx', color: 'blue',  title: 'p2' }, 
        ];

     function createWindBarbs(windData) {
                windData.forEach(function (data) {
                    var icon = L.WindBarb.icon({ lat: data.lat, deg: data.deg, speed: data.speed });
                    var marker = L.marker([data.lat, data.lon], { icon: icon }).addTo(map);
                });
            }

            // Example wind data
            var windData = [
                { lat: 51.058, lon: 2.41, deg: 270, speed: 4 },
                { lat: 51.067, lon: 2.347, deg: 270, speed: 4 },
                // ... additional wind data points
            ];
            
            // Call the function to create wind barbs
            createWindBarbs(windData);    

</script>
    
{% endraw %}

