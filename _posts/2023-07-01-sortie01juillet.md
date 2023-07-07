---
layout: post
title:  "Sortie du 1er Juilet"
categories: entrainement
date:   2023-07-01
excerpt: sortie du 1er Juillet
custom_css: leaflet
custom_js: leaflet
---

carnet de bord de la sortie du 1er Juillet


bon vent d'ouest en 18 nds, quelques rafales à 25
Départ avec un bon downwind sous spi pour s'échauffer, de bon surf a un peu plus de 11nds,  le spi a un peu séché du matin.  
Retour au près avec quelques manœuvres. On fait tourner un peu les barreurs.

Retour sous spi.  
puis, on a testé le tacktik avec le mode *"décision de virement"* (tack now), et le suivit des ado/refus au près.    
On finit par quelques entrainements au départ avec un timer à 2 min sur le tacktick. pas facile de trouver le bon moment de retour à la ligne.    
Teste de quelque 360°, un peu de difficulté sur la coordination des manœuvres du génois.


vent OSO 18 nds environs     
![vent](/images/posts/sortie0107/global_previ.png)
![vent](/images/posts/sortie0107/wind_direct.png)

courant faible.    

relevé des vents de la journée :
![vent](/images/posts/sortie0107/winds-up_ 2023-07-02.png)

{% raw %}
<div id="map" class="map leaflet-container" style="height: 500px; position:relative;"></div>
{% endraw %}


{% raw %}
  <script>
        var gpx_file = "/gpx/0107_p1.gpx";
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
                { lat: 51.058, lon: 2.41, deg: 270, speed: 18 },
                { lat: 51.067, lon: 2.347, deg: 270, speed: 18 },
                // ... additional wind data points
            ];
            
            // Call the function to create wind barbs
            createWindBarbs(windData);    

</script>
    
{% endraw %}

quelques images de la sortie :
![portant](/images/posts/sortie0107/IMG_0981.JPG)

![equipage](/images/posts/sortie0107/IMG_0982.JPG)

au ponton :   
* on a rincé et fait sécher un peu les housses trempées
* celle du génois étant sèche, on la remit dedans.
* à midi Nathalie a vidé les fonds (4 seaux ! )
* le vide-poche tribord est décousu, il faudrait soit le recoudre ou le changer.
![poche](/images/posts/sortie0107/IMG_0983.JPG)
