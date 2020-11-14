 DonationHub

</br>

Thank you for visinting DonationHub, a collaborative project created by 
Julia Bugayev, Angela Thomas, and Kayleigh Young!
</br>
If you would like to view the DonationHub website, follow this link:

# https://donation-hub-client.vercel.app

and the DonationHub repository here:

# https://github.com/kayleighkat98/donation-hub-client

If you would like to view the API for this website, you can find the deployed version here:

# https://cryptic-fjord-37790.herokuapp.com/

and the repository for the API here:

# https://github.com/jbugayev18/DonationHub-API

</br>

# Summary

In most scenarios, people are willing to donate. However, it is not always clear what organizations
really need or how much of what they are seeking is needed. In order to help strengthen the donation
process, we decided to create Donation Hub. DonationHub exists as a way to centralize the efforts community
champions (donators) need in order to best serve their communities. By using the DonationHub website, users
are able to locate organization near them, browse items that location needs, and give as they please accordingly.
Users are also able to go in and add donation sites for organizations that may not be as internet accesible.
In order to ensure the app works to its fullest potential, the following technology was used in its creation:

# Frontend:

    ReactJS
    CSS
    Jest
    JWT

# Backend:

    ExpressJS
    Bcryptjs
    Mocha/Chai
    Postgres
        GIST Index for performant box intersection query

# Third Party APIs:

    Google Maps
    Google Places

# Deployment:

    Vercel
    Heroku

# App Endpoints: 
    Authenticate User

        URL:
            /token

        Methond:
            POST

        URL Params:
            Required
            id=[interger]

        Data Params:
             Password/Web Token

        Success Response:
            Code: 200
            Contnet: {id:"2" username:"user" password:"pass"}

        Error Response: 
            Code: 400
            Content: {`Missing '${key} in request body`}
        OR
            Code: 400
            Content: {"Incorrect username or password"}
        
        Sample Call 
            $.ajax({
                url:"token/1",
                dataType: "json",
                type: "POST",
                success: function(r) {
                    console.log(r)
                }
            })


Inventory

        URL:
            /:site_id

        Methond:
            GET

        URL Params:
            siteId=[interger],
            items=[text]

        Data Params:
             None

        Success Response:
            Code: 201
            Contnet: {siteId:"2" item:"socks"}

        Error Response: 
            Code: 400
            Content: {succes:fail}
        
        Sample Call 
            $.ajax({
                url:":siteId/2",
                dataType: "json",
                type: "GET",
                success: true {
                    console.log(success)
                }
            })

Places

        URL:
            /places/

        Methond:
            POST

        URL Params:
            site=[placeId],
            

        Data Params:
             lat,
             lon,
             label,
             address,
             description,

        Success Response:
           None
        Error Response: 
            None
        
        Sample Call 
            $.ajax({
                url:"/places/",
                dataType: "json",
                type: "GET"
            })

Registration

        URL:
            /registration/

        Methond:
            POST

        URL Params:
            Required
            id=[interger],
            password=[text],
            username=[text],
            label=[text]

        Data Params:
             None

        Success Response:
            Code: 201
            Contnet: {}

        Error Response: 
            Code: 400
            Content: {`Username is already taken`}
        OR
            Code: 400
            Conent: {`passwordError`}
        OR
            Code: 400
            Content: {`Missing '${field}' in request body`}
        
        Sample Call 
            $.ajax({
                url:"/regitration/",
                dataType: "json",
                type: "POST",
                success: function(r) {
                    console.log(r)
                }
            })

SiteRouter

        URL:
            /siteRouter/

        Methond:
            POST

        URL Params:
            Required
            id=[interger],
            

        Data Params:
             lat,
             lon,
             label,
             address,
             description,
             forrmatted_phone_number,
             palce_id,
             url,
             website

        Success Response:
           None

        Error Response: 
            Code: 400
            Content: {`We already have records of this location, duplicatres are not allowed.`}
        OR
            Code: 400
            Content: {`Missing '${field}' in request body`}
        
        Sample Call 
            $.ajax({
                url:"/regitration/",
                dataType: "json",
                type: "POST",
                }
            })
