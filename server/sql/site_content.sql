begin;

create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_data_must_be_object check (jsonb_typeof(data) = 'object')
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_content_updated_at on public.site_content;

create trigger trg_site_content_updated_at
before update on public.site_content
for each row
execute function public.set_site_content_updated_at();

insert into public.site_content (id, data)
values ('primary', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.site_content enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'site_content'
      and policyname = 'site_content_read_public'
  ) then
    create policy site_content_read_public
      on public.site_content
      for select
      to anon, authenticated
      using (true);
  end if;
end
$$;

insert into storage.buckets (id, name, public, file_size_limit)
values ('dashboard-media', 'dashboard-media', true, 8388608)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'dashboard_media_public_read'
  ) then
    create policy dashboard_media_public_read
      on storage.objects
      for select
      to anon, authenticated
      using (bucket_id = 'dashboard-media');
  end if;
end
$$;

commit;
