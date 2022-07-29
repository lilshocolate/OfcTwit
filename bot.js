const needle = require('needle');
const request = require('request')



const token = 'AAAAAAAAAAAAAAAAAAAAAPMqeAEAAAAA%2FdfIKUx3none1ZOHTkRDMONylzg%3D7jVJx3wxpr7rGDm0hNrXMUpeAoVwPNGF3JfsHkjgDRSN6v47M8'
const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";


async function getRequest() {

    // max_results to get the amount of tweets that we wanr
    /// inital params for getting the tweet id
    const params = {
    
        query: '(Code snippet 100daysofcode -is:retweet has:media)',// OR (programming 100daysofcode -is:retweet has:media) OR (developing code with -is:retweet)', 
        // first query returns tweets with "code snippet" and "100daysofcode" that is not a retweet and has media attached to it
        expansions: "author_id",
        max_results: 20,

    }      
    
    /* if(tweet has text or fields we do not want){
        function or logic to refine the tweets pulled
        function or logic to run that removes those tweets 
    

    */
    
    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })
    
    var user = Array();
    var tweet_Text = Array();
    var auth_Id = Array();
    var tweet_Id = Array(); 
    
    // could be improved using a foreach loop....
    // foreach(user in data/ user in tweet)
    // length of .users and .data differs. Is not causing any issues besides a typeerror when username is undefined
   
    console.log('Finding Tweets.....\n\n')
    
    for (var i = 0; i < 10; i++)
    {
        if(res.body.includes.users[i] == null){
            console.log('End of tweet Stream')
            break;
        }
        else
        user[i] = res.body.includes.users[i].username;
        tweet_Text[i] = res.body.data[i].text;
        auth_Id[i] = res.body.data[i].author_id;
        tweet_Id[i] = res.body.data[i].id;

        console.log('Tweet from User:' + ' ' + user[i]);
        console.log('Author_Id:' + ' ' + auth_Id[i]);
        console.log('Tweet_ID:' + ' ' + tweet_Id[i]);
        console.log('Tweet_Text:' + ' ' + tweet_Text[i] + '\n');
        console.log('Tweet_URL:' + ' ' + `https://twitter.com/twitter/status/${tweet_Id[i]}\n`);
    };

    if (res.body) {
        body = res.body;
    } else {
        throw new Error('Unsuccessful request: Could Not Get ID.');
    }

}

(async () => {

    try {
        
        const response = await getRequest();
        console.dir(response, {
            depth: null
        });

    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();           
