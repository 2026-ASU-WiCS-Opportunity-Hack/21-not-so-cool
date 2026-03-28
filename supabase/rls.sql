alter table chapters enable row level security;
alter table coaches enable row level security;
alter table payments enable row level security;

create policy "Public read chapters"
on chapters for select
using (true);

create policy "Public read approved coaches"
on coaches for select
using (is_approved = true);

create policy "Coach updates own profile"
on coaches for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);