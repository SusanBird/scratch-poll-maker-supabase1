import { createPoll, getPolls, logout, checkLoggedIn } from '../fetch-utils.js';
import { renderPoll } from '../render-utils.js';

checkLoggedIn();

//DOM elements
const questionEl = document.querySelector('.question');
const options1TitleEl = document.querySelector('.option-1-title');
const options1VotesEl = document.querySelector('.option-1-votes');
const option1AddVoteButtonEl = document.querySelector('.option-1-add-vote');
const option1SubtractVoteButtonEl = document.querySelector('.option-1-subtract-vote');
const options2TitleEl = document.querySelector('.option-2-title');
const options2VotesEl = document.querySelector('.option-2-votes');
const option2AddVoteButtonEl = document.querySelector('.option-2-add-vote');
const option2SubtractVoteButtonEl = document.querySelector('.option-2-subtract-vote');
const finishButtonEl = document.querySelector('.finish-button');
const pastPollsEl = document.querySelector('.past-polls');
const pollFormEl = document.querySelector('#poll-form');
const logoutButtonEl = document.querySelector('#logout');

//set state
let question = '';
let option1Title = '';
let option1Votes = 0;
let option2Title = '';
let option2Votes = 0;

//add event listeners

//add question/options when user clicks submit
pollFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(pollFormEl);

    displayCurrentPollEl(data);

    pollFormEl.reset();
});

//increment/decrement vote with click, display the change 
option1AddVoteButtonEl.addEventListener('click', () => {
    option1Votes++;

    options1VotesEl.textContent = option1Votes;
});

option1SubtractVoteButtonEl.addEventListener('click', () => {
    option1Votes--;

    options1VotesEl.textContent = option1Votes;
});

option2AddVoteButtonEl.addEventListener('click', () => {
    option2Votes++;

    options2VotesEl.textContent = option2Votes;
});

option2SubtractVoteButtonEl.addEventListener('click', () => {
    option2Votes--;

    options2VotesEl.textContent = option2Votes;
});

//fetch and display past polls on load
window.addEventListener('load', async () => {
    await displayPolls();
});

//return to login page when click logout button
logoutButtonEl.addEventListener('click', async () => {
    await logout();
});

//add current poll to past polls in Supabase on click, then display
finishButtonEl.addEventListener('click', async () => {

    const pastPoll = {
        question: question, 
        option_1: option1Title,
        votes_1: option1Votes,
        option_2: option2Title, 
        votes_2: option2Votes, 
    };

    await createPoll(pastPoll);

    pastPoll.question = '';
    pastPoll.option1Title = '';
    pastPoll.option1Votes = 0;
    pastPoll.option2Title = '';
    pastPoll.option2Votes = 0;

    // pastPoll.textContent = '';

    displayPolls();
});


function displayCurrentPollEl(data) {
    question = data.get('question');
    option1Title = data.get('option-1-title');
    option1Votes = data.get('option-1-votes');
    option2Title = data.get('option-2-title');
    option2Votes = data.get('option-2-votes');

    questionEl.textContent = question;
    options1TitleEl.textContent = option1Title;
    options1VotesEl.textContent = option1Votes;
    options2TitleEl.textContent = option2Title;
    options2VotesEl.textContent = option2Votes;
}

async function displayPolls() {
    const polls = await getPolls();

    pastPollsEl.textContent = '';
    for (let poll of polls) {
        const newPollEl = renderPoll(poll);

        pastPollsEl.append(newPollEl);
    }
}