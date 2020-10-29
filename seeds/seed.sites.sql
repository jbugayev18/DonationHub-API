begin;

truncate site cascade;

INSERT INTO site (id, lat, lon, label, address, description, place_id) VALUES
    ('1','34.045010', '-118.245171', 'Los Angeles Mission', '303 E 5th St, Los Angeles, CA 90013', 'Provide food, clothing, and shelter to those who are homeless or in jeopardy of becoming homeless in downtown LA ','ChIJS1nrXDbGwoAROVDgPBBchxA'),
    ('2','34.065050', '-118.264710', 'Good Shepherd Center', '1650 Rockwood St, Los Angeles, CA 90026', 'Providing food and shelter for homelessness in LA','ChIJVQjQeAjHwoAR9e5lJfRHtMM'),
    ('3','34.044400', '-118.243730', 'Downtown Women Center','442 San Pedro St, Los Angeles, CA 90013', 'Only organization in LA focused exclusively on serving and empowering women experiencing homelessness','ChIJQ7rsBTfGwoARxH1mqU6mVoo' )
;

commit;