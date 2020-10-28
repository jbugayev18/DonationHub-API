const express = require("express");
const json = require("body-parser").json();
const placesRouter = express.Router();
const fetch = require("node-fetch");

const SitesService = require("../site/site-service");

// placesRouter.get("/sites", (req, res) => {
//   //Return all sites
//   SitesService.getSitesInWindow(req.app.get("db")).then((sites) => {
//     res.json(sites);
//   });
// });

placesRouter.post("/", json, (req, res) => {
  console.log(req.body.place);
  const db = req.app.get("db");
  const address = req.body.place;
  const apikey = "AIzaSyBK3kzRSslMgvDZsvdsODC2Bid0uDMdpLg";
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=donations&location=${address}&radius=10000&key=${apikey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((site) => {
        let newSite = {
          id: site.place_id,
          lat: site.geometry.location.lat,
          lon: site.geometry.location.lng,
          label: site.name || "default label",
          address: site.formatted_address,
          description: site.name || "default description",
        };
        SitesService.postSitesInWindow(db, newSite).then((data) =>
          console.log(data)
        );
      });
    })
    .catch((error) => console.log(error));
  //Post a site.

  //   SitesService.postSitesInWindow(
  //     req.app.get("db").then((site) => {
  //       res.json(site);
  //     })
  //   )

  res.json("received");
});

module.exports = placesRouter;
/**
        {
            "business_status": "OPERATIONAL",
            "formatted_address": "3106 N Shiloh Rd, Garland, TX 75044, United States",
            "geometry": {
                "location": {
                    "lat": 32.9459857,
                    "lng": -96.664615
                },
                "viewport": {
                    "northeast": {
                        "lat": 32.94741072989272,
                        "lng": -96.66326767010729
                    },
                    "southwest": {
                        "lat": 32.94471107010728,
                        "lng": -96.66596732989272
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",            "name": "Goodwill Donation Center",
            "opening_hours": {
                "open_now": false
            },
            "photos": [
                {
                    "height": 4032,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/117235185848039229369\">Ildar Gabdrakhmanov</a>"
                    ],
                    "photo_reference": "CmRaAAAA-rS4mfBX-2x43rtrjiSNuVzkb044-5pgJAJ2MyIckeOLM1vEGTO9c_z8kNkEhzwhB36byA_Fh91Vt1r0hViGdbayi-xHJaaDHIBX9vvCJnEABERkl9bSzPEjxBN0lKrbEhBzE5LWueKH3Vmp5QPqtFKrGhRhaZq64bZwh99wmDU1RVdY73VgnQ",
                    "width": 3024
                }
            ],
            "place_id": "ChIJ636D5H8eTIYRr0Ymw2nbC8Y",
            "plus_code": {
                "compound_code": "W8WP+95 Garland, Texas",
                "global_code": "8645W8WP+95"
            },
            "rating": 4.4,
            "reference": "ChIJ636D5H8eTIYRr0Ymw2nbC8Y",
            "types": [
                "point_of_interest",
                "establishment"
            ],
            "user_ratings_total": 14
        },
 */
