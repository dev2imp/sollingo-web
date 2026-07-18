# NOTES
    we need to make Progressbar nicer now it shows the number but 
    we need to show the progress bar and the level 
    later we  might add life too or star to collect etc 
> Feature: Phrase Mastery Tracking (Like / Dislike System)
###    What it does:
    After answering a question, the user can mark the phrase they just practiced as a favorite. If they favorite it, we will keep showing it. If they don't favorite it, we assume they've learned it and won't show it again.
###    How to Implement:
    the local storage cache will be used
    as the users sees the first level and doesn't respond with favorite
    the app will continue to work normally, but if they click the favorite button
    then we will save the word, and if number of favorited phrases are
    more than 10 or 10 then we will keep showing the favorited phrases until
    they unfavorite one and the number drops to 9.
    if the number is less than 10 then we will get new level and show to user. 
    


> FlipCard : 
    user sees text in spoken language 
    they listens it if they know they directly type 
    if they dont they will click card card will show back end 
    and they can see and write the trnaslation of what they saw
    in this type of question there is no limit of how many words it has
    but even if user writes 80% wrong still accept as correct.
>Match Word:
    as known from name the user will match meaning of the words 
    here we have limit which is number of word in single sentence cant be 
    bigger than 2 it should be single word or 2 word rest will not fit here 
> ReorderWords
    the reorder word will be as follow if number words are bigger than 3 
    we can mix them and let user to correct it by selecting one by one. 
    if its bigger than 3 we will not mix it give the words in same order the user will
    click in the same order its given. 
>TrueFalse:
    user will have phrase or word and it will whether its true or false one hint 
    we can get the wrong answer randomly from the same level other item when we want 
    it to be false true its already in the same item 
# LevelItems:
    here is single item in each level.json file:
    base64decoded audios are in base64 format audio is only that tetx already
        tr:kahve
        en:coffee
        pt:café
        fr:cafe
        ku:kahwe
        kahve:"base64decodedAudio"
        coffee:"base64decodedAudio"
        café:"base64decodedAudio"
        cafe:"base64decodedAudio"
        kahwe:"base64decodedAudio"
  

# Tailwind
npm install tailwindcss @tailwindcss/vite
    edited vite.config.ts
    edited index.css


