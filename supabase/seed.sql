insert into chapters (slug, name, region, contact_email, description) values
  ('usa', 'WIAL USA', 'North America', 'usa@wial.org', 'The official USA affiliate of WIAL'),
  ('nigeria', 'WIAL Nigeria', 'Africa', 'nigeria@wial.org', 'Serving coaches across West Africa'),
  ('brazil', 'WIAL Brazil', 'South America', 'brazil@wial.org', 'Comunidade de Action Learning no Brasil')
on conflict (slug) do nothing;

insert into coaches (chapter_id, full_name, email, bio, cert_level, location, is_approved)
values
  ((select id from chapters where slug='usa'),
   'Sarah Mitchell', 'sarah@example.com',
   'Experienced Action Learning coach specializing in leadership development for manufacturing teams.',
   'MALC', 'New York, USA', true),
  ((select id from chapters where slug='nigeria'),
   'Emeka Okonkwo', 'emeka@example.com',
   'Especialista em dinâmicas de equipe e desenvolvimento organizacional em ambientes industriais.',
   'CALC', 'Lagos, Nigeria', true),
  ((select id from chapters where slug='brazil'),
   'Ana Paula Ferreira', 'ana@example.com',
   'Coaching executivo e desenvolvimento de lideranças em empresas de médio porte no Brasil.',
   'SALC', 'São Paulo, Brazil', true);