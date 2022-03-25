## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

## HTML Setup

-   Question submit form - 3 fields and a button
-   Current question vote container - 4 buttons (+/- each option)
-   Finish current poll button
-   Past polls list
-   Logout button

## State

-   Local: current question, options and vote totals
-   Supabase: past polls

## Events

-   user clicks launch new poll
    -   inject the question and options into div
    -   state: update question, option1 and option2
    -   clear out form
-   user votes + or - for option 1 or 2
    -   state: votes increment/decrement
    -   view: update the view with new votes
-   user clicks finish poll
    -   local state: clear out all current places
    -   send results to Supabase to add new row to polls table
    -   view: clear out list, refetch past polls, render/append
-   user loads the page
    -   fetch, render, and append past polls
-   user clicks logout

    -   return to login page

    ## Login page

    ## HTML:

    -   Two forms: sign up and sign in - email and password inputs

    ## State:

    -   local: current email, password

    ## Events:

    -   user clicks sign up or sign in
    -   clear form
    -   user taken to polls page
