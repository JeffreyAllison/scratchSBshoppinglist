const SUPABASE_URL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYnpocGxkanJ4cWtqc2tjaXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTIwMDMsImV4cCI6MTk2MzEyODAwM30.idE1m2ehmckSIic7mOSaXFl1McMzBdIrhU_Vrsr6UyI';
const SUPABASE_KEY = 'https://lrbzhpldjrxqkjskcizc.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser () {
  return client.auth.session() && client.auth.session().user;
}

export function checkAuth () {
  const user = getUser();

  if (!user) location.replace('../');
}

export function redirectIfLoggedIn () {
  if (getUser()) {
    location.replace('./shopping');
  }
}

export async function signupUser (email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser (email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout () {
  await client.auth.signOut();

  return (window.location.href = '../');
}

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
