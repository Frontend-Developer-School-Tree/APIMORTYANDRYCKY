//dichiarazione variabili
const urls = [
    "https://rickandmortyapi.com/api/character",
    "https://rickandmortyapi.com/api/location",
    "https://rickandmortyapi.com/api/episode"
]

const container = document.getElementById('container') 

const tpl = document.getElementById('listaPersonaggi') 

const btnAdd = document.getElementById('personaggiBtn');


//class card in cui viene effettuata la prmise
 class Card{
     static async getData(){
        const [characters,locations,episodes] = await Promise.all(urls.map( url =>{
            try {
                return fetch(url).then( response => response.json() )
            } catch (error) {
                console.error(error)
                throw new Error('pagina non trovata')
            }
         }))
 console.log(characters.results)
         characters.results.map( element => {
             const cardChar = document.importNode(tpl.content,true);
                 console.log()
                 cardChar.getElementById('numE').textContent = 'presente in: '+ element.episode.length +' episodi'
                 cardChar.querySelector('h2').textContent = element.name;
                 cardChar.querySelector('strong').textContent = (element.type) ? `tipo: ${element.type}` :`tipo: umano`
                 cardChar.querySelector('img').setAttribute('src',element.image)
                 cardChar.querySelector('img').setAttribute('alt',element.name)
                 cardChar.querySelector('i').classList.add('fa','fa-television')
                 cardChar.querySelector('span').textContent = 'status:' + element.status
                 return container.appendChild(cardChar);

         })
     }
     static loadHandler(){
         Card.getData()
     }
 }

 btnAdd.addEventListener('click',Card.loadHandler)



