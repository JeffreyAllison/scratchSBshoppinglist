/* eslint-disable no-console */
const SUPABASE_URL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyYnpocGxkanJ4cWtqc2tjaXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTIwMDMsImV4cCI6MTk2MzEyODAwM30.idE1m2ehmckSIic7mOSaXFl1McMzBdIrhU_Vrsr6UyI';
const SUPABASE_KEY = 'https://lrbzhpldjrxqkjskcizc.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createItem (listItem) {
  const response = await client
    .from('shopping_list_items')
    .insert({
      item: listItem,
      completed: false,
      user_id: client.auth.user().id
    });

  return checkError(response);
}

export async function deleteShoppingList () {
  const response = await client
    .from('shopping_list_items')
    .delete()
    .match({ user_id: client.auth.user().id });

  return checkError(response);
}

export async function getShoppingList () {
  const response = await client
    .from('shopping_list_items')
    .select('*');

  return checkError(response);
}

export async function buyItem (id) {
  const response = await client
    .from('shopping_list_items')
    .update({ completed: true })
    .match({ id });

  return checkError(response);
}

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

function checkError ({ data, error }) {
  return error ? console.error(error) : data;
}
