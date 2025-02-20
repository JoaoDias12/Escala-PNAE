/*let peoples = {
  Dias: {
    Name: 'João Dias',
    Dia: 1,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [0],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Antonio: {
    Name: 'Antonio Viana',
    Dia: 5,
    Mes: 1,
    Folga: false,
    Dupla: true,
    GateMaker: [13, 25],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Laiza: {
    Name: 'Laiza',
    Dia: 3,
    Mes: 1,
    Folga: false,
    Dupla: true,
    GateMaker: [4, 15, 24],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Souza: {
    Name: 'Gabriel Lima',
    Dia: 4,
    Mes: 1,
    Folga: false,
    Dupla: true,
    GateMaker: [16, 23],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Victor: {
    Name: 'Victor Augusto',
    Dia: 1,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [0],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Severino: {
    Name: 'João Lira',
    Dia: 2,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [5, 14, 26],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Florisvaldo: {
    Name: 'Florisvaldo',
    Dia: 3,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [6, 12],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Vitor: {
    Name: 'Vitor Oliveira',
    Dia: 8,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [11, 26],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Pereira: {
    Name: 'Matheus Pereira',
    Dia: 4,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [7, 9],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Machado: {
    Name: 'Bruno Sidomo',
    Dia: 1,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [0],
    Time: 'H0',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: true
  },
  Martins: {
    Name: 'Gabriel Martins',
    Dia: 4,
    Mes: 1,
    Folga: false,
    Dupla: true,
    GateMaker: [1, 10, 20],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Marcos: {
    Name: 'Marcos Vinicius',
    Dia: 6,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [2, 19, 21],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Pedro: {
    Name: 'Pedro Henrique',
    Dia: 6,
    Mes: 1,
    Folga: false,
    Dupla: false,
    GateMaker: [3, 17],
    Time: 'H0',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  },
  Correia: {
    Name: 'Bruno Correia',
    Dia: 1,
    Mes: 1,
    Folga: false,
    Dupla: true,
    GateMaker: [8],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: [],
    Ferias: false
  }
}*/

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyBR0io-r_snZTWy1pe8A0dsb4awBpANDxs',
  authDomain: 'escala-pnae.firebaseapp.com',
  databaseURL: 'https://escala-pnae-default-rtdb.firebaseio.com',
  projectId: 'escala-pnae',
  storageBucket: 'escala-pnae.firebasestorage.app',
  messagingSenderId: '289230851590',
  appId: '1:289230851590:web:a638d6c6a8409d65803d87'
})

var database = firebase.database()

let peoples = {}
let needToSaveCount = false

// Função para carregar a lista de peoples do Firebase
function loadPeoplesFromFirebase() {
  const peoplesRef = database.ref('peoples')
  peoplesRef
    .once('value')
    .then(snapshot => {
      const loadedPeoples = snapshot.val()
      if (loadedPeoples) {
        console.log('Dados carregados com sucesso:', loadedPeoples)
        // Aqui você pode atualizar o objeto `peoples` no seu app/site
        peoples = loadedPeoples
      } else {
        console.log('Nenhum dado encontrado.')
      }
    })
    .catch(error => {
      console.error('Erro ao carregar dados:', error)
    })
}
// Chame a função para carregar os dados ao iniciar o app/site
loadPeoplesFromFirebase()

// Sincronização em tempo real
function syncPeoplesFromFirebase() {
  const peoplesRef = database.ref('peoples')
  peoplesRef.on('value', snapshot => {
    const loadedPeoples = snapshot.val()
    if (loadedPeoples) {
      console.log('Dados sincronizados:', loadedPeoples)
      peoples = loadedPeoples
    } else {
      console.log('Nenhum dado encontrado.')
    }
  })
}

// Chame a função para sincronizar os dados
//syncPeoplesFromFirebase()

// Chamar a função para adicionar o campo "Ferias"

setTimeout(function () {
  distribuirPessoas()
  populatePeopleList(peoples)
  /* Object.keys(peoples).forEach(ppl => {
    peoples[ppl].Count = [0, 0, 0, 0, 0]
  })*/
  savePeoplesToFirebase(peoples)

  loadFlightsFromFirebase()
  loadAdminThings()
  copyScale()
  loadOpenAdmin()

  console.log('Objeto do Bruno:', peoples['Correia'])
  console.log('Tipo do objeto do Bruno:', typeof peoples['Correia'])
  console.log(
    'Bruno é um objeto simples?',
    peoples['Correia'] instanceof Object &&
      !(peoples['Correia'] instanceof Array)
  )

  console.log('Objeto do Dias:', peoples['Dias'])
  console.log('Tipo do objeto do Dias:', typeof peoples['Dias'])
  console.log(
    'Dias é um objeto simples?',
    peoples['Dias'] instanceof Object && !(peoples['Dias'] instanceof Array)
  )
}, 2000)

let escala = 6

let namesControl = document.querySelector('.namesControl')
let infosControl = document.querySelector('.infosControl')
let priorityFlight = document.querySelector('.priorityFlight')

let peopleSelected

function loadAdminThings() {
  Object.keys(peoples).forEach(people => {
    namesControl.innerHTML += `<h2 class="nameControl" data-people="${people}">${people}</h2>`
  })

  let nameControl = document.querySelectorAll('.nameControl')

  nameControl.forEach(name => {
    name.addEventListener('click', function () {
      let dp = name.getAttribute('data-people')
      peopleSelected = dp

      infosControl.innerHTML = `<button id="btnBackInfos">Voltar</button>
      <h2>${peoples[dp].Name}</h2>
      <div>
      <h2>0930 - ${peoples[dp].Count[0]}</h2>
      <h2>0962 - ${peoples[dp].Count[1]}</h2>
      <h2>0950 - ${peoples[dp].Count[2]}</h2>
      <h2>0958 - ${peoples[dp].Count[3]}</h2>
      <h2>0906 - ${peoples[dp].Count[4]}</h2>
      </div>

      <div>

      <div>
      <label>Dia Inicial Folga</label>
      <input id="inptChDay" type="text" value="${peoples[dp].Dia}">
      </div>
      
      <div>
      <label>Mes Inicial Folga</label>
      <input id="inptChMonth" type="text" value="${peoples[dp].Mes}">
      </div>

      <div>
      <label>Horário</label>
      <input id="inptChTime" type="text" value="${peoples[dp].Time}">
      </div>

      </div>

      <label>Dia de Montar Portão</label>
      <label class="daysGate">${peoples[dp].GateMaker}</label>

      <div class="dvChecks">

      <div>
      <label>Dupla</label>
      <input id="inptChDouble" type="checkbox" value="${peoples[dp].Dupla}">
      </div>

      <div>
      <label>Folga</label>
      <input id="inptChSlack" type="checkbox" value="${peoples[dp].Folga}">
      </div>

      <div>
      <label>Ferias</label>
      <input id="inptChFerias" type="checkbox" value="${peoples[dp].Ferias}">
      </div>

      </div>

      <button id="btnChangePeoples">Alterar</button>
      
      `

      let btnBackInfos = document.getElementById('btnBackInfos')

      btnBackInfos.addEventListener('click', function () {
        namesControl.classList.remove('hidden')
        priorityFlight.classList.remove('hidden')
        infosControl.classList.add('hidden')
      })

      let inptCb = infosControl.querySelectorAll('input[type="checkbox"]')

      inptCb.forEach(inpt => {
        let value = inpt.getAttribute('value') === 'true' // Converte para booleano

        if (value) {
          inpt.checked = true
        } else {
          inpt.checked = false
        }

        inpt.addEventListener('change', function () {
          if (inpt.checked) {
            inpt.setAttribute('value', true)
          } else {
            inpt.setAttribute('value', false)
          }
        })
      })

      let btnChange = document.getElementById('btnChangePeoples')

      let inptChDay = document.getElementById('inptChDay')
      let inptChMonth = document.getElementById('inptChMonth')
      let inptChTime = document.getElementById('inptChTime')
      let inptChDouble = document.getElementById('inptChDouble')
      let inptChSlack = document.getElementById('inptChSlack')
      let inptChFerias = document.getElementById('inptChFerias')

      btnChange.addEventListener('click', function () {
        // Atualiza os valores com os tipos corretos
        peoples[peopleSelected].Dia = Number(inptChDay.value) // Converte para número
        peoples[peopleSelected].Mes = Number(inptChMonth.value) // Converte para número
        peoples[peopleSelected].Time = inptChTime.value // Já é uma string

        // Converte para booleanos
        peoples[peopleSelected].Dupla = inptChDouble.value === 'true' // Converte para boolean
        peoples[peopleSelected].Folga = inptChSlack.value === 'true' // Converte para boolean
        peoples[peopleSelected].Ferias = inptChFerias.value === 'true' // Converte para boolean

        // Salva no Firebase
        savePeoplesToFirebase(peoples)

        // Recarrega a página
        location.reload()
      })

      namesControl.classList.add('hidden')
      priorityFlight.classList.add('hidden')
      infosControl.classList.remove('hidden')
    })
  })
}

// Função para calcular todas as folgas nos próximos dois meses
function calcularFolgas(proximoPeriodo, escala, pessoa) {
  let dataAtual = getSPTime()
  let folgas = []

  let diaInicioFolga = peoples[pessoa].Dia
  let mesInicioFolga = peoples[pessoa].Mes
  let dupla = peoples[pessoa].Dupla // Obter o valor inicial de Dupla
  let dataInicioFolga = new Date(
    dataAtual.getFullYear(),
    mesInicioFolga - 1,
    diaInicioFolga
  )

  let ultimasFolgas = []

  // Ajuste inicial para garantir que a data de início seja correta, incluindo datas anteriores
  while (dataInicioFolga <= dataAtual) {
    ultimasFolgas.push(dataInicioFolga.toDateString())

    if (dupla) {
      let dataFolga2 = new Date(dataInicioFolga)
      dataFolga2.setDate(dataInicioFolga.getDate() + 1)
      ultimasFolgas.push(dataFolga2.toDateString())
    }

    dataInicioFolga.setDate(
      dataInicioFolga.getDate() + escala + 1 + (dupla ? 1 : 0)
    )
    dupla = !dupla // Alternar entre folga simples e dupla
  }

  // Pegar apenas as últimas 2 folgas anteriores
  ultimasFolgas = ultimasFolgas.slice(-2)

  // Loop para calcular folgas para o próximo período
  while (folgas.length < proximoPeriodo) {
    let dataFolga1 = new Date(dataInicioFolga)
    folgas.push(dataFolga1.toDateString())

    if (dupla) {
      let dataFolga2 = new Date(dataInicioFolga)
      dataFolga2.setDate(dataInicioFolga.getDate() + 1)
      folgas.push(dataFolga2.toDateString())
    }

    // Atualizar a data de início para a próxima folga
    dataInicioFolga.setDate(
      dataInicioFolga.getDate() + escala + 1 + (dupla ? 1 : 0)
    )
    dupla = !dupla // Alternar entre folga simples e dupla
  }

  return [...ultimasFolgas, ...folgas]
}

// Função para verificar se hoje é um dia de folga
function isFolgaHoje(diasFolga) {
  let dataAtual = getSPTime().toDateString()
  return diasFolga.includes(dataAtual)
}

// Atualizando folgas com base na data atual
function atualizarFolgas(peoples, escala) {
  Object.keys(peoples).forEach(nome => {
    let folgas = calcularFolgas(80, escala, nome)
    peoples[nome].Folga = isFolgaHoje(folgas)
    peoples[nome].Folgas = folgas // Atualiza o array Folgas no objeto de cada pessoa
  })
}

// Função para mostrar folgas
function mostrarFolgas() {
  let nome = document.getElementById('funcionario').value
  if (!nome) {
    return
  }

  // Atualizar as folgas antes de mostrar
  atualizarFolgas(peoples, escala)

  let folgas = calcularFolgas(80, escala, nome)

  // Checkagem de duplicatas
  const folgasUnicas = [...new Set(folgas)]

  // Limpar calendário anterior
  let listaDeFolgas = document.getElementById('listaDeFolgas')
  listaDeFolgas.innerHTML = ''

  // Agrupar folgas por mês e ano
  const folgasPorMesEAno = folgasUnicas.reduce((acc, folga) => {
    const data = new Date(folga)
    const ano = data.getFullYear()
    const mes = data.getMonth()
    const dia = data.getDate()

    if (!acc[ano]) {
      acc[ano] = {}
    }
    if (!acc[ano][mes]) {
      acc[ano][mes] = []
    }
    acc[ano][mes].push(dia)

    return acc
  }, {})

  // Criar calendários para os meses que possuem folgas
  for (const ano in folgasPorMesEAno) {
    for (const mes in folgasPorMesEAno[ano]) {
      const mesIndex = parseInt(mes, 10)
      const nomeMes = new Date(ano, mesIndex).toLocaleString('pt-BR', {
        month: 'long'
      })

      let mesDiv = document.createElement('div')
      mesDiv.classList.add('mes')

      let tituloMes = document.createElement('div')
      tituloMes.classList.add('mes-titulo')
      tituloMes.textContent = `${
        nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)
      } ${ano}`
      mesDiv.appendChild(tituloMes)

      let calendario = document.createElement('div')
      calendario.classList.add('calendario')

      const diasNoMes = new Date(ano, mesIndex + 1, 0).getDate()
      const folgasNoMes = folgasPorMesEAno[ano][mes]

      // Adicionar dias ao calendário
      for (let dia = 1; dia <= diasNoMes; dia++) {
        let dataStr = `${ano}-${(mesIndex + 1)
          .toString()
          .padStart(2, '0')}-${dia.toString().padStart(2, '0')}`
        let diaElemento = document.createElement('div')
        diaElemento.classList.add('dia')

        // Verificação da folga no mês correto
        if (folgasNoMes.includes(dia)) {
          diaElemento.classList.add('folga')
        }

        // Adicionar inicial do dia da semana
        const diasDaSemana = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
        const data = new Date(dataStr)
        const diaSemana = diasDaSemana[data.getDay()]
        diaElemento.innerHTML = `<h2>${diaSemana}</h2>
        <h2>${dia.toString().padStart(2, '0')}</h2>
         `
        calendario.appendChild(diaElemento)
      }

      mesDiv.appendChild(calendario)
      listaDeFolgas.appendChild(mesDiv)
    }
  }
}

atualizarFolgas(peoples, escala)

// Função para obter a hora atual em São Paulo
function getSPTime() {
  const now = new Date()
  const options = {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }
  const formatter = new Intl.DateTimeFormat('pt-BR', options)
  const parts = formatter.formatToParts(now)

  const year = parts.find(part => part.type === 'year').value
  const month = parts.find(part => part.type === 'month').value - 1 // mês em JavaScript é 0-indexado
  const day = parts.find(part => part.type === 'day').value
  const hour = parts.find(part => part.type === 'hour').value
  const minute = parts.find(part => part.type === 'minute').value
  const second = parts.find(part => part.type === 'second').value

  return new Date(year, month, day, hour, minute, second)
}

let Gate = document.getElementById('Gate')
let Scale = document.getElementById('Scale')

let btnGate = document.getElementById('btnGate')
let btnScale = document.getElementById('btnScale')

btnGate.addEventListener('click', function () {
  btnScale.style.background = 'white'
  btnGate.style.background = 'rgb(0, 130, 210)'
  btnScale.style.color = 'black'
  btnGate.style.color = 'white'

  Scale.classList.add('hidden')
  Gate.classList.remove('hidden')
})

btnScale.addEventListener('click', function () {
  btnScale.style.background = 'rgb(0, 130, 210)'
  btnGate.style.background = 'white'
  btnGate.style.color = 'black'
  btnScale.style.color = 'white'

  Gate.classList.add('hidden')
  Scale.classList.remove('hidden')
})

// Mudar para deviceready
const lastOpenRef = database.ref('app/lastOpen')

function recordAppOpen() {
  const now = getSPTime()
  lastOpenRef.set({
    lastOpen: now
  })
}

// Registrar quando o app é aberto
//recordAppOpen()

let prioritizeFlights = [] // Array que será preenchido com os dados do Firebase
let selectedFlight = null // Variável para armazenar o primeiro voo clicado

// Referência ao nó do Firebase onde os dados serão salvos
const flightsRef = database.ref('flights')

// Função para renderizar a lista de voos
function renderFlights() {
  priorityFlight.innerHTML = '' // Limpa a lista atual
  priorityFlight.innerHTML += '<h2>Ordem dos Voos</h2>'

  prioritizeFlights.forEach(flight => {
    const flightElement = document.createElement('div')
    flightElement.className = 'flight-item'
    flightElement.textContent = flight
    flightElement.addEventListener('click', () => prioritizeFlight(flight))
    priorityFlight.appendChild(flightElement)
  })
}

// Função para trocar os voos de posição
function prioritizeFlight(flight) {
  if (!selectedFlight) {
    // Se nenhum voo foi selecionado ainda, armazena o primeiro voo clicado
    selectedFlight = flight
  } else {
    // Se já há um voo selecionado, troca os dois voos de posição
    const index1 = prioritizeFlights.indexOf(selectedFlight)
    const index2 = prioritizeFlights.indexOf(flight)

    if (index1 > -1 && index2 > -1) {
      // Troca os voos de posição
      ;[prioritizeFlights[index1], prioritizeFlights[index2]] = [
        prioritizeFlights[index2],
        prioritizeFlights[index1]
      ]
    }

    // Reseta a seleção
    selectedFlight = null
    // Re-renderiza a lista
    renderFlights()
    // Salva a lista atualizada no Firebase
    saveFlightsToFirebase()

    location.reload()
  }
}

// Função para salvar a lista no Firebase
function saveFlightsToFirebase() {
  flightsRef
    .set(prioritizeFlights)
    .then(() => console.log('Lista salva no Firebase!'))
    .catch(error => console.error('Erro ao salvar no Firebase:', error))
}

// Função para carregar a lista do Firebase
function loadFlightsFromFirebase() {
  flightsRef
    .once('value')
    .then(snapshot => {
      const data = snapshot.val()
      if (data) {
        prioritizeFlights = data // Atualiza o array com os dados do Firebase
        renderFlights() // Renderiza a lista na tela
      }
    })
    .catch(error => console.error('Erro ao carregar do Firebase:', error))
}

// Carrega os dados do Firebase ao iniciar a página
loadFlightsFromFirebase()

/*const prioritizeFlights = [
  'Miami - 0906',
  'Miami - 0958',
  'Nova York - 0950',
  'Miami - 0930',
  'Dallas - 0962'
]*/

function distribuirPessoas() {
  const diaAtual = getSPTime()
  const assignments = {}
  const flights = {
    'Miami - 0930': {
      times: '21:35 / 22:25',
      time: 'H1',
      fallback: ['H2', 'H3'],
      checkInEnd: '21:20'
    },
    'Dallas - 0962': {
      times: '22:10 / 23:00',
      time: 'H1',
      fallback: ['H2', 'H3'],
      checkInEnd: '21:55'
    },
    'Nova York - 0950': {
      times: '22:20 / 23:10',
      time: 'H3',
      fallback: ['H2'],
      checkInEnd: '22:05'
    },
    'Miami - 0958': {
      times: '23:00 / 23:50',
      time: 'H3',
      fallback: ['H2'],
      checkInEnd: '22:45'
    },
    'Miami - 0906': {
      times: '23:40 / 00:30',
      time: 'H3',
      checkInEnd: '23:25'
    }
  }

  const daysInMonth = new Date(
    diaAtual.getFullYear(),
    diaAtual.getMonth() + 1,
    0
  ).getDate()

  // Initialize assignments from today to the end of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(diaAtual.getFullYear(), diaAtual.getMonth(), day)
    const dateString = date.toISOString().split('T')[0]
    assignments[dateString] = {}

    Object.keys(flights).forEach(flight => {
      assignments[dateString][flight] = []
    })
  }

  function wasPersonAssignedToFlight(date, flight, person) {
    const previousDate = new Date(date)
    previousDate.setDate(previousDate.getDate() - 1)
    const prevDateString = previousDate.toISOString().split('T')[0]
    return (
      assignments[prevDateString] &&
      assignments[prevDateString][flight] &&
      assignments[prevDateString][flight].includes(person)
    )
  }

  function getAvailablePeople(flight, day) {
    const { time, fallback } = flights[flight]
    const date = new Date(diaAtual.getFullYear(), diaAtual.getMonth(), day)
    const dateString = date.toDateString()
    let availablePeople = []

    // Priorizar pessoas com o Time H1 primeiro para 0930 e 0962
    if (['Miami - 0930', 'Dallas - 0962'].includes(flight)) {
      availablePeople = Object.keys(peoples)
        .filter(personKey => {
          const person = peoples[personKey]
          return (
            person.Time === 'H1' &&
            !person.Folgas.includes(dateString) &&
            !person.GateMaker.includes(day) &&
            !person.Ferias && // Verificar se a pessoa não está de férias
            !Object.values(assignments[date.toISOString().split('T')[0]] || {})
              .flat()
              .includes(personKey) &&
            !(
              flight === 'Miami - 0930' &&
              wasPersonAssignedToFlight(date, 'Miami - 0930', personKey)
            ) &&
            !(
              flight === 'Dallas - 0962' &&
              wasPersonAssignedToFlight(date, 'Dallas - 0962', personKey)
            )
          )
        })
        .slice(0, 1) // Limitar a 1 pessoa do Time H1

      // Adicionar pessoas do Time H2 e H3 prioritariamente H2 para completar
      availablePeople = availablePeople.concat(
        Object.keys(peoples)
          .filter(personKey => {
            const person = peoples[personKey]
            return (
              (person.Time === 'H2' || person.Time === 'H3') &&
              !person.Folgas.includes(dateString) &&
              !person.GateMaker.includes(day) &&
              !person.Ferias && // Verificar se a pessoa não está de férias
              !Object.values(
                assignments[date.toISOString().split('T')[0]] || {}
              )
                .flat()
                .includes(personKey) &&
              !(
                flight === 'Miami - 0930' &&
                wasPersonAssignedToFlight(date, 'Miami - 0930', personKey)
              ) &&
              !(
                flight === 'Dallas - 0962' &&
                wasPersonAssignedToFlight(date, 'Dallas - 0962', personKey)
              )
            )
          })
          .sort((a, b) => {
            // Priorizar H2 sobre H3
            const personA = peoples[a]
            const personB = peoples[b]
            if (personA.Time === 'H2' && personB.Time !== 'H2') return -1
            if (personA.Time !== 'H2' && personB.Time === 'H2') return 1
            return 0
          })
          .slice(0, 1)
      ) // Limitar a 1 pessoa do Time H2 ou H3
    } else {
      // Se não é 0930 ou 0962, pegar pessoas normais
      availablePeople = Object.keys(peoples).filter(personKey => {
        const person = peoples[personKey]
        return (
          person.Time !== 'H0' && // Excluir pessoas do Time H0
          person.Time === time &&
          !person.Folgas.includes(dateString) &&
          !person.GateMaker.includes(day) &&
          !person.Ferias && // Verificar se a pessoa não está de férias
          !Object.values(assignments[date.toISOString().split('T')[0]] || {})
            .flat()
            .includes(personKey)
        )
      })
    }

    availablePeople.sort(
      (a, b) =>
        peoples[a].Count[Object.keys(flights).indexOf(flight)] -
        peoples[b].Count[Object.keys(flights).indexOf(flight)]
    )

    // Verificar e adicionar um fallback geral se não houver pessoas suficientes
    if (availablePeople.length < 2) {
      const generalFallback = Object.keys(peoples)
        .filter(personKey => {
          const person = peoples[personKey]
          return (
            person.Time !== 'H0' && // Excluir pessoas do Time H0
            !person.Folgas.includes(dateString) &&
            !person.GateMaker.includes(day) &&
            !person.Ferias && // Verificar se a pessoa não está de férias
            !Object.values(assignments[date.toISOString().split('T')[0]] || {})
              .flat()
              .includes(personKey)
          )
        })
        .sort(
          (a, b) =>
            peoples[a].Count.reduce((acc, val) => acc + val, 0) -
            peoples[b].Count.reduce((acc, val) => acc + val, 0)
        )

      availablePeople = availablePeople.concat(
        generalFallback.slice(0, 2 - availablePeople.length)
      )
    }

    return availablePeople.slice(0, 2) // Limitar a 2 pessoas no total
  }

  function assignPeople(flight, availablePeople, dateString) {
    // Verificar e ajustar o Time do Correia com base no ChangeTime

    if (availablePeople.length >= 2) {
      // Rotação entre 0930 e 0962
      if (flight === 'Miami - 0930' || flight === 'Dallas - 0962') {
        const previousDate = new Date(dateString)
        previousDate.setDate(previousDate.getDate() - 1)
        const prevDateString = previousDate.toISOString().split('T')[0]

        const prev0930 = assignments[prevDateString]
          ? assignments[prevDateString]['Miami - 0930'] || []
          : []
        const prev0950 = assignments[prevDateString]
          ? assignments[prevDateString]['Dallas - 0962'] || []
          : []

        if (flight === 'Miami - 0930') {
          if (prev0930.includes('Pedro') && availablePeople.includes('Pedro')) {
            const index = availablePeople.indexOf('Pedro')
            availablePeople.splice(index, 1)
            availablePeople.push('Pedro')
          }
        }

        if (flight === 'Dallas - 0962') {
          if (prev0950.includes('Pedro') && availablePeople.includes('Pedro')) {
            const index = availablePeople.indexOf('Pedro')
            availablePeople.splice(index, 1)
            availablePeople.push('Pedro')
          }
        }
      }

      assignments[dateString][flight] = availablePeople.slice(0, 2)
    } else if (availablePeople.length === 1) {
      assignments[dateString][flight].push(availablePeople[0])

      // Attempt to fill the second spot with someone from the fallback times
      const fallbackPeople = getAvailablePeople(
        flight,
        new Date(dateString).getDate(),
        false
      )
      if (fallbackPeople.length > 0) {
        assignments[dateString][flight].push(fallbackPeople[0])
      }

      // Fill the gap with someone from 0958 or 0906 if needed
      if (
        assignments[dateString][flight].length < 2 &&
        (flight === 'Dallas - 0962' || flight === 'Miami - 0930')
      ) {
        const backupFlights = ['Miami - 0958', 'Miami - 0906']
        for (const backupFlight of backupFlights) {
          const backupPeople = assignments[dateString][backupFlight]
          if (backupPeople.length > 0) {
            assignments[dateString][flight].push(backupPeople.pop())
            if (assignments[dateString][flight].length >= 2) break
          }
        }
      }
    } else if (
      availablePeople.length === 0 &&
      (flight === 'Miami - 0930' || flight === 'Dallas - 0962')
    ) {
      // If no available people, try to pull someone from 0906 or 0958 directly
      const backupFlights = ['Miami - 0958', 'Miami - 0906']
      for (const backupFlight of backupFlights) {
        const backupPeople = assignments[dateString][backupFlight]
        if (backupPeople.length > 0) {
          assignments[dateString][flight].push(backupPeople.pop())
          if (assignments[dateString][flight].length >= 2) break
        }
      }
    }

    // Check for duplicate names and replace one if found
    const uniquePeople = new Set(assignments[dateString][flight])
    if (uniquePeople.size < assignments[dateString][flight].length) {
      const backupFlights = ['Miami - 0958', 'Miami - 0906']
      for (const backupFlight of backupFlights) {
        const backupPeople = assignments[dateString][backupFlight]
        if (backupPeople.length > 0) {
          assignments[dateString][flight].splice(1, 1, backupPeople.pop())
          break
        }
      }
    }

    if (needToSaveCount) {
      // Update Count for each person assigned
      assignments[dateString][flight].forEach(personKey => {
        const flightIndex = Object.keys(flights).indexOf(flight)
        peoples[personKey].Count[flightIndex]++
        salvarLog(peoples[personKey].Name, flight)
      })
    }
  }

  // Add GateMaker as fixed check-in closer
  function addGateMakerToCheckin(day, dayDiv) {
    const date = new Date(diaAtual.getFullYear(), diaAtual.getMonth(), day)
    const dateString = date.toISOString().split('T')[0]

    const gateMakerForDay = Object.keys(peoples).find(personKey =>
      peoples[personKey].GateMaker.includes(day)
    )

    if (gateMakerForDay) {
      const flight0950People = assignments[dateString]['Dallas - 0962']
      let replacement = null

      // Check if the GateMaker belongs to H1 and reassign check-in closer
      if (
        peoples[gateMakerForDay].Time === 'H1' &&
        flight0950People.length > 0
      ) {
        replacement = flight0950People.pop()
      }

      const gateMakerDiv = document.createElement('div')
      gateMakerDiv.className = 'gateMaker'
      gateMakerDiv.innerHTML = `<h2>Fechamento De Check-In / Montagem De Portões</h2><h3>${peoples[gateMakerForDay].Name}</h3>`

      // Mark the gateMaker for the day
      assignments[dateString]['GateMaker'] = [
        replacement ? replacement : gateMakerForDay
      ]

      dayDiv.appendChild(gateMakerDiv)
    }
  }

  const displayOrderFlights = [
    'Miami - 0930',
    'Dallas - 0962',
    'Nova York - 0950',
    'Miami - 0958',
    'Miami - 0906'
  ]

  const gatesDiv = document.querySelector('.Gates')

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(diaAtual.getFullYear(), diaAtual.getMonth(), day)
    const dayString = String(date.getDate()).padStart(2, '0')
    const monthString = String(date.getMonth() + 1).padStart(2, '0')
    const yearString = String(date.getFullYear()).slice(-2)
    const formattedDate = `${dayString}/${monthString}/${yearString}`
    const dateString = date.toISOString().split('T')[0]

    assignments[dateString] = {}

    Object.keys(flights).forEach(flight => {
      assignments[dateString][flight] = []
    })

    // Create .day container
    const dayDiv = document.createElement('div')
    dayDiv.className = 'day'
    if (
      date <
      new Date(diaAtual.getFullYear(), diaAtual.getMonth(), diaAtual.getDate())
    ) {
      dayDiv.classList.add('hidden')
    }
    dayDiv.innerHTML = `<h2>${formattedDate}</h2>`

    // Preenchimento em ordem invertida
    prioritizeFlights.forEach(flight => {
      const availablePeople = getAvailablePeople(flight, day)
      assignPeople(flight, availablePeople, dateString)
    })

    // Exibição na ordem desejada
    displayOrderFlights.forEach(flight => {
      // Create .flight container
      const flightDiv = document.createElement('div')
      flightDiv.className = 'flight'
      flightDiv.innerHTML = `<h2>${flight}</h2><h3>${flights[flight].times}</h3>`

      // Create .peoplesIn container
      const peoplesInDiv = document.createElement('div')
      peoplesInDiv.className = 'peoplesIn'
      assignments[dateString][flight].forEach(personKey => {
        const personDiv = document.createElement('div')
        const personName = peoples[personKey]?.Name || personKey
        personDiv.innerHTML = `<h2>${personName}</h2>`
        peoplesInDiv.appendChild(personDiv)
      })

      flightDiv.appendChild(peoplesInDiv)
      dayDiv.appendChild(flightDiv)
    })

    // Add GateMaker to check-in
    addGateMakerToCheckin(day, dayDiv)

    // List fixed people in check-in
    const fixedCheckInDiv = document.createElement('div')
    fixedCheckInDiv.className = 'FixedCheckIn'
    fixedCheckInDiv.innerHTML = '<h3>Fixo No Check-In:</h3>'
    const fixedPeople = Object.keys(peoples).filter(personKey => {
      const person = peoples[personKey]
      return (
        person.Time === 'H0' &&
        !person.Ferias &&
        !person.Folgas.includes(date.toDateString()) &&
        !Object.values(assignments[dateString] || {})
          .flat()
          .includes(personKey)
      )
    })

    // If no fixed people for check-in (H0) are available, find random replacement from those who are free
    if (fixedPeople.length === 0) {
      const freePeople = Object.keys(peoples).filter(personKey => {
        const person = peoples[personKey]
        return (
          !person.Ferias &&
          !person.Folgas.includes(date.toDateString()) &&
          !Object.values(assignments[dateString] || {})
            .flat()
            .includes(personKey)
        )
      })

      if (freePeople.length > 0) {
        // Shuffle to select a random person
        const randomIndex = Math.floor(Math.random() * freePeople.length)
        const selectedPerson = freePeople[randomIndex]
        fixedPeople.push(selectedPerson)
      } else {
        // If no free people, take someone from the flight Miami - 0906
        const miami0906People = assignments[dateString]['Miami - 0906']
        if (miami0906People.length > 0) {
          const selectedPerson = miami0906People.pop()
          fixedPeople.push(selectedPerson)
        }
      }
    }

    fixedPeople.forEach(personKey => {
      const personDiv = document.createElement('div')
      const personName = peoples[personKey]?.Name || personKey
      personDiv.innerHTML = `<h2>${personName}</h2>`
      fixedCheckInDiv.appendChild(personDiv)
    })

    dayDiv.appendChild(fixedCheckInDiv)

    gatesDiv.appendChild(dayDiv)
  }

  // Salvar assignments no banco de dados para todos os dias
  salvarAssignments(assignments, diaAtual)

  return assignments
}

function scheduleTask() {
  lastOpenRef
    .once('value')
    .then(snapshot => {
      const lastOpenData = snapshot.val()
      if (lastOpenData) {
        const lastOpenTime = new Date(lastOpenData.lastOpen)
        const now = new Date(getSPTime())
        const oneDayMillis = 24 * 60 * 60 * 1000

        if (now - lastOpenTime > oneDayMillis || now.getHours() >= 1) {
        }
      } else {
        distribuirPessoas()
      }
    })
    .catch(error => {
      console.error('Erro ao ler dados: ', error)
    })
}

function salvarLog(person, flightIndex) {
  const now = new Date().toISOString()
  firebase.database().ref(`app/logs/${person}`).push({
    date: now,
    flight: flightIndex
  })
}

function salvarAssignments(assignments, diaAtual) {
  // Referência ao banco de dados
  const assignmentsRef = firebase.database().ref('app/assignments')

  // Obter dados existentes e mesclar com novos
  assignmentsRef
    .once('value')
    .then(snapshot => {
      const existingAssignments = snapshot.val() || {}

      // Iterar sobre todas as chaves em assignments
      Object.keys(assignments).forEach(dateKey => {
        existingAssignments[dateKey] = assignments[dateKey]
      })

      // Salvar assignments no banco de dados
      assignmentsRef
        .set(existingAssignments)
        .then(() => {
          //console.log('salvo', existingAssignments)
        })
        .catch(error => {
          console.log('Erro ao salvar', error)
        })
    })
    .catch(error => {
      console.log('Erro ao ler os dados existentes', error)
    })
}

function populatePeopleList(peoples) {
  const today = getSPTime()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth() // Lembre-se que os meses são 0-indexados

  for (let key in peoples) {
    let person = peoples[key]
    let fullName = person.Name

    // Verifica se hoje é o dia de montar portão para essa pessoa
    if (person.GateMaker.includes(todayDay)) {
      fullName += ' '
      // Adiciona o "(G)" em azul escuro
      fullName += `<span style="color: #00152B;">(G)</span>`
    }

    if (!person.Folga && !person.Ferias) {
      let listClass = `list${person.Time}`

      // Se a pessoa for H0, ajuste para H1
      if (person.Time === 'H0') {
        listClass = 'listH1'
      }

      let listDiv = document.querySelector(`.${listClass}`)

      if (listDiv) {
        let h3 = document.createElement('h3')
        // Insere o nome com HTML
        h3.innerHTML = fullName
        listDiv.appendChild(h3)
      }
    } else {
      // Adiciona à lista de folgas
      let listFolgaDiv = document.querySelector('.listFolga')
      if (listFolgaDiv) {
        let h3 = document.createElement('h3')
        // Insere o nome com HTML
        h3.innerHTML = fullName
        listFolgaDiv.appendChild(h3)
      }
    }
  }
}

let openMenu = document.getElementById('openMenu')
let peoplesOnWork = document.querySelector('.peoplesOnWork')
let bars = openMenu.querySelectorAll('.bar')

openMenu.addEventListener('click', function () {
  if (peoplesOnWork.classList.contains('close')) {
    peoplesOnWork.classList.remove('close')

    bars.forEach(bar => {
      bar.style.background = 'white'
    })
  } else {
    peoplesOnWork.classList.add('close')

    bars.forEach(bar => {
      bar.style.background = '#0082d2'
    })
  }
})

function loadOpenAdmin() {
  let openAdmin = document.getElementById('openAdmin')
  let adminControl = document.querySelector('.adminControl')
  let h2OpenAdmin = openAdmin.querySelector('h2')

  // Defina a senha manualmente
  const SENHA_CORRETA = '12234'

  // Adiciona o evento de clique ao botão
  openAdmin.addEventListener('click', function () {
    // Solicita a senha ao usuário
    const senhaInserida = prompt(
      'Digite a senha para acessar o painel de administração:'
    )

    // Verifica se a senha está correta
    if (senhaInserida === SENHA_CORRETA) {
      // Se a senha estiver correta, executa o código
      if (adminControl.classList.contains('closeLeft')) {
        adminControl.classList.remove('closeLeft')
        h2OpenAdmin.style.color = 'white'
      } else {
        adminControl.classList.add('closeLeft')
        h2OpenAdmin.style.color = '#0082d2'
      }
    } else {
      alert('Senha incorreta! Acesso negado.')
    }
  })
}

/////////////////////////////////////////////////////////////////////

// Função para salvar a lista de peoples no Firebase
function savePeoplesToFirebase(peoples) {
  const peoplesRef = database.ref('peoples')
  peoplesRef
    .set(peoples)
    .then(() => {
      console.log('Dados salvos com sucesso!')
    })
    .catch(error => {
      console.error('Erro ao salvar dados:', error)
    })
}

// Chame a função para salvar os dados

function updatePersonInFirebase(personKey, updatedData) {
  const personRef = database.ref(`peoples/${personKey}`)
  personRef
    .update(updatedData)
    .then(() => {
      console.log('Pessoa atualizada com sucesso!')
    })
    .catch(error => {
      console.error('Erro ao atualizar pessoa:', error)
    })
}

// Exemplo de uso:
//updatePersonInFirebase('Dias', { Folga: true });

function addPersonToFirebase(newPerson) {
  const peoplesRef = database.ref('peoples')
  const newPersonRef = peoplesRef.push()
  newPersonRef
    .set(newPerson)
    .then(() => {
      console.log('Pessoa adicionada com sucesso!')
    })
    .catch(error => {
      console.error('Erro ao adicionar pessoa:', error)
    })
}

// Exemplo de uso:
/*addPersonToFirebase({
  Name: 'Novo Nome',
  Dia: 10,
  Mes: 1,
  Folga: false,
  Dupla: false,
  GateMaker: [],
  Time: 'H3',
  Count: [0, 0, 0, 0, 0],
  Folgas: []
});*/

function removePersonFromFirebase(personKey) {
  const personRef = database.ref(`peoples/${personKey}`)
  personRef
    .remove()
    .then(() => {
      console.log('Pessoa removida com sucesso!')
    })
    .catch(error => {
      console.error('Erro ao remover pessoa:', error)
    })
}

// Exemplo de uso:
//removePersonFromFirebase('Dias');

function copyScale() {
  let days = document.querySelectorAll('.day')

  days.forEach(day => {
    day.addEventListener('click', function () {
      console.log('clicado')

      // Captura o nome do fixo no check-in
      const fixoCheckIn = this.querySelector('.FixedCheckIn h2').textContent

      // Captura o nome do responsável pelo fechamento do check-in
      const gateMakerH3 = this.querySelector('.gateMaker h3')
      const responsavelFechamento = gateMakerH3 ? gateMakerH3.textContent : ''

      // Captura todos os voos
      const voos = this.querySelectorAll('.flight')

      // Inicia o texto com a saudação e o fixo no check-in
      let textoFormatado = `Boa tarde!\n\nCheck-in: ${fixoCheckIn}\n\n`

      // Itera sobre cada voo
      voos.forEach(voo => {
        const destinoVoo = voo.querySelector('h2').textContent //.split(' - ')[0] // Pega o destino do voo
        const funcionarios = voo.querySelectorAll('.peoplesIn h2')
        const nomesFuncionarios = Array.from(funcionarios)
          .map(p => p.textContent)
          .join(' e ') // Junta os nomes dos funcionários

        // Adiciona o voo ao texto formatado
        textoFormatado += `* ${destinoVoo} - ?? 🧑‍🦽\n${nomesFuncionarios}\n\n`
      })

      // Adiciona a linha de montagem de portões/fechamento de check-in
      textoFormatado += `* Montar os Portões/Fechar o Check-in\n${responsavelFechamento}`

      // Copia o texto formatado para a área de transferência
      navigator.clipboard
        .writeText(textoFormatado)
        .then(() => {
          alert('Texto copiado para a área de transferência!')
        })
        .catch(err => {
          console.error('Erro ao copiar texto: ', err)
        })
    })
  })
}

function deletePeoples() {
  // Cria uma referência para o nó 'peoples'
  var peoplesRef = database.ref('peoples')

  // Remove o nó 'peoples'
  peoplesRef
    .remove()
    .then(() => {
      alert('Resetando...')
      location.reload()
    })
    .catch(error => {
      console.error('Erro ao excluir o nó "peoples":', error)
      alert('Erro ao excluir o nó "peoples": ' + error.message)
    })
}
