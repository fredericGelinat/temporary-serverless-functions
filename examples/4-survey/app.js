const title = document.querySelector(".title h2");
const result = document.querySelector(".result");

const fetchData = async () => {
  try {
    const { data } = await axios.get("/api/4-survey");
    const response = data
    .map((vote) => {
      const {like, votes, id } = vote;
      return `<li>
            <div class="key">${like.toUpperCase().substring(0, 2)}</div>
            <div>
            <h4>${like}</h4>
            <p class="vote-${id}" data-votes="${votes}">${votes} votes</p>
            </div>
            <button data-id="${id}">
            <i class="fas fa-vote-yea"></i>
            </button>
            </li>`
    })
    .join('')
    result.innerHTML = response
  } catch (error) {
    result.innerHTML = `<h4>there was an error</h4>`
  }
}

window.addEventListener('load', () => {
    fetchData()
})

result.addEventListener('click',async function(e){
    if(e.target.classList.contains('fa-vote-yea')){
        const btn = e.target.parentElement
        const id = btn.dataset.id
        const voteNode = result.querySelector(`.vote-${id}`)
       const votes = voteNode.dataset.votes;
       const newVote = await modifyData(id, votes)
       title.textContent = 'Sondage'

        if(newVotes){
            
                   voteNode.textContent = `${newVote} votes`
                   voteNode.dataset.votes = newVote

        }
    }
    
})
//modify data
async function modifyData(id, votes){
    title.textContent = 'Loading...'
    try {
        const {data} = await axios.put(`/api/4-survey`, {id, votes})
    } catch (error) {
        // console.log(error.response.data);
        return null
    }
} 