const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");

function makeUsersArray() {
  return [
    {
      id: 99999,
      username: "julia",
      password: "jbuga",
    },
    // {
    //   id: 2,
    //   username: "test-user-2",
    //   password: "password",
    // },
    // {
    //   id: 3,
    //   username: "test-user-3",
    //   password: "password",
    // },
    // {
    //   id: 4,
    //   username: "test-user-4",
    //   password: "password",
    // },
  ];
}

function makeSitesArray() {
  return [
    {
      id: "1",
      lat: "34.045010",
      lon: "-118.245171",
      label: "Los Angeles Mission",
      address: "303 E 5th St, Los Angeles, CA 90013, USA",
      description:
        "Provide food, clothing, and shelter to those who are homeless or in jeopardy of becoming homeless in downtown LA ",
      formatted_phone_number: "No phone number on file",
      place_id: "ChIJS1nrXDbGwoAROVDgPBBchxA",
      url:
        "https://maps.google.com/?q=303+E+5th+St,+Los+Angeles,+CA+90013,+USA&ftid=0x80c2c6365ceb594b:0x10875c103ce05039",
      website: "No website on file.",
    },
    // {
    //   id: 2,
    //   lat: 21,
    //   lon: 21,
    //   label: "Donation Shelter As Well",
    //   address: "2222 Donation Drive",
    //   description: "A donation location as well",
    //   formatted_phone_number: "123-456-7891",
    //   place_id: "Ldifnsadfaopferin",
    //   url: "https://donateplease.com",
    //   website: "donateplease.com",
    // },
  ];
}

function makeInventoryArray() {
  return [
    {
      id: "1",
      item_name: "Toothpaste",
      site_id: "1",
      ideal_amount: "50",
      current_amount: "10",
      critical_amount: "30",
    },
    // {
    //   id: 2,
    //   item_name: "socks",
    //   site_id: 2,
    //   ideal_amount: "22",
    //   current_amount: "7",
    //   critical_amount: "15",
    // },
  ];
}

function makeRegistrationArray() {
  return [
    {
      label: "julia",
      username: "jbuga",
      password: "$2a$12$N4YI0.E/hwLRIopewykhAOvLVZ/zfCFWA5w1pYcKem09i1VFPCHR2",
    },
  ];
}

function makeDonationFixtures() {
  const testUsers = makeUsersArray();
  const testSites = makeSitesArray();
  const testinventory = makeInventoryArray();
  const testRegistration = makeRegistrationArray();
  return { testUsers, testSites, testinventory };
}

function makeMaliciousThing(user) {
  const maliciousThing = {
    id: 911,
    image: "http://placehold.it/500x500",
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  };
  const expectedThing = {
    ...makeExpectedThing([user], maliciousThing),
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousThing,
    expectedThing,
  };
}
function truncate(tables, db) {
  return Promise.each(tables, function (table) {
    return db.raw(`truncate table "${table}" cascade`);
  });
}

function cleanTables(db) {
  const tables = ["inventory", "site", "user"];
  return db.transaction((trx) =>
    truncate(tables, db).then(() =>
      Promise.all([
        trx.raw(`ALTER TABLE "user" AUTO_INCREMENT = 100000`),
        trx.raw(`ALTER SEQUENCE registration_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE places_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE inventory_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE sites_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('user_id_seq', 0)`),
        trx.raw(`SELECT setval('registration_id_seq', 0)`),
        trx.raw(`SELECT setval('places_id_seq', 0)`),
        trx.raw(`SELECT setval('inventory_id_seq', 0)`),
        trx.raw(`SELECT setval('sites_id_seq', 0)`),
      ])
    )
  );
}

function seedUser(db, user) {
  const preppedUser = user.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("user")
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setval('user_id_seq', ?)`, [users[users.length - 1].id])
    );
}

function seedDonationTables(db, user, sites, inventory = []) {
  return db.transaction(async (trx) => {
    await seedUser(trx, user);
    await trx.into("sites").insert(inventory);
    await trx.raw(`SELECT setval('user_id_seq', ?)`, [
      users[users.length - 1].id,
    ]);
  });
}

function seedSites(db, testSites) {
  const preppedSites = testSites.map((sites) => ({
    ...sites,
  }));
  return db
    .into("sites")
    .insert(preppedSites)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('sites_id_seq', ?)`, [
        testSites[testSites.length - 1].id,
      ])
    );
}

function seedInventory(db, testInventory) {
  const inventoryItems = testInventory.map((inventory) => ({
    ...inventory,
  }));
  return db.cleanTables
    .into("inventory")
    .insert(inventoryItems)
    .then(() =>
      db.raw(`SELECT setval('inventory_id_seq, ?)`, [
        testInventory[testInventory.length - 1].id,
      ])
    );
}

function seedPlaces(db, testPlaces) {
  const newPlaces = testPlaces.map((places) => ({
    ...places,
  }));
  return db.cleanTables
    .into("places")
    .insert(newPlaces)
    .then(() =>
      db.raw(`SELECT setval('places_id_seq, ?)`, [
        testPlaces[testPlaces.length - 1].id,
      ])
    );
}

function seedMaliciousSite(db, user) {
  return seedUser(db, [user]).then(() => db.into("user").insert([user]));
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeDonationFixtures,
  makeAuthHeader,
  makeMaliciousThing,

  cleanTables,
  seedDonationTables,
  seedMaliciousSite,
  seedUser,
  seedSites,
  seedInventory,
  seedPlaces,
};
