Match (p:person {name: "Nabil"})-[:TEMAN_DENGAN]->
(t:person) RETURN p.name, t.name 