BEGIN; 

truncate "user", "auth" cascade;

INSERT INTO "user" (id, label, username) VALUES (99999, 'julia', 'jbuga'); 

insert into "auth" (uid, method, data)
  values (99999, 0, '$2a$12$N4YI0.E/hwLRIopewykhAOvLVZ/zfCFWA5w1pYcKem09i1VFPCHR2') /*test-password*/
;

COMMIT; 