begin;

truncate site cascade;

INSERT INTO site (id, lat, lon, label, address, description, formatted_phone_number, place_id, url, website) VALUES
    ('1','34.045010', '-118.245171', 'Los Angeles Mission', '303 E 5th St, Los Angeles, CA 90013, USA', 'Provide food, clothing, and shelter to those who are homeless or in jeopardy of becoming homeless in downtown LA ','No phone number on file','ChIJS1nrXDbGwoAROVDgPBBchxA','https://maps.google.com/?q=303+E+5th+St,+Los+Angeles,+CA+90013,+USA&ftid=0x80c2c6365ceb594b:0x10875c103ce05039','No website on file.'),
    ('2','34.065050', '-118.264710', 'Good Shepherd Center', '1650 Rockwood St, Los Angeles, CA 90026, USA', 'Providing food and shelter for homelessness in LA','No phone number on file','ChIJVQjQeAjHwoAR9e5lJfRHtMM','https://maps.google.com/?q=1650+Rockwood+St,+Los+Angeles,+CA+90026,+USA&ftid=0x80c2c70878d00855:0xc3b447f42565eef5','No website on file.'),
    ('3','34.044400', '-118.243730', 'Downtown Women Center','442 San Pedro St, Los Angeles, CA 90011, USA', 'Only organization in LA focused exclusively on serving and empowering women experiencing homelessness','No phone number on file','ChIJQ7rsBTfGwoARxH1mqU6mVoo','https://maps.google.com/?q=442+San+Pedro+St,+Los+Angeles,+CA+90011,+USA&ftid=0x80c2c63705ecba43:0x8a56a64ea9667dc4','No website on file.' ),
    ('6', '-33.866651','151.195827', 'Google', '5, 48 Pirrama Rd, Pyrmont NSW 2009, Australia','google headquaters','(02) 9374 4000', 'ChIJN1t_tDeuEmsRUsoyG83frY4','https://maps.google.com/?cid=10281119596374313554','https://www.google.com.au/about/careers/locations/sydney/')
;

commit;