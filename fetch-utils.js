/* eslint-disable no-console */
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3eXZsb2V0c2h2ZWZra3J5d3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc4Nzk0MzEsImV4cCI6MTk2MzQ1NTQzMX0.8lVyqbhvuR5E2KD1n187Bk0teEnC6OCfd7h2Kkj_Oew';

export async function getUser() {
    return client.auth.user();
}

export function checkLoggedIn() {
    if (!client.auth.session()) {
        window.location = '../';
    }
}

const SUPABASE_URL = 'https://cwyvloetshvefkkrywzk.supabase.co';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getPolls() {
    const response = await client
        .from('polls')
        .select();

    return response.data;
}

export async function createPoll(question, option1, option2, votes1, votes2) {
    const response = await client
        .from('polls')
        .insert([
            {   
                question,
                option_1: option1,
                option_2: option2,
                votes_1: votes1,
                votes_2: votes2,
            },
        ]);

    return response.body;
}

export async function signUp(realEmail, realPassword) {
    console.log('before sign up', client.auth.user());

    const response = await client.auth.signUp({
        email: realEmail,
        password: realPassword,
    });

    console.log('after sign up', client.auth.user());

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}