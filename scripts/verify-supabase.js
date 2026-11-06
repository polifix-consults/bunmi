const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const env = {};
envFile.split(/\r?\n/).forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
});

const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function verify() {
  console.log('Verifying Supabase live database tables...');
  for (const table of ['research_publications', 'media_publications', 'policy_videos']) {
    const res = await fetch(`${url}/rest/v1/${table}?select=*`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`✓ ${table}: ${data.length} records verified online`);
      if (table === 'research_publications') {
        const item = data.find(d => d.id === 'cso-budgeting-process-nigeria');
        if (item) console.log(`  Sample research abstract [${item.id}]:`, item.abstract.slice(0, 100) + '...');
      }
      if (table === 'media_publications') {
        const item = data.find(d => d.id === 'pod-growth');
        if (item) console.log(`  Sample media description [${item.id}]:`, item.description.slice(0, 100) + '...');
      }
    } else {
      console.log(`✗ ${table}: Error ${res.status}`);
    }
  }
}

verify().catch(console.error);
