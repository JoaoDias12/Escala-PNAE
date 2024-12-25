let peoples = {
  Dias: {
    Name: 'João Vitor Dias',
    Dia: 2,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [1, 23],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Antonio: {
    Name: 'Antonio Jose Alves Viana',
    Dia: 14,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [4, 19, 27],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Laiza: {
    Name: 'Laiza',
    Dia: 14,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Souza: {
    Name: 'Gabriel De Souza Lima',
    Dia: 28,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [7, 16, 30],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Menezes: {
    Name: 'Matheus De Menezes Silva',
    Dia: 1,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [6, 15, 17, 29],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Severino: {
    Name: 'João Severino De Lira',
    Dia: 10,
    Mes: 12,
    Folga: false,
    Dupla: false,
    GateMaker: [5, 18, 28],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Florisvaldo: {
    Name: 'Florisvaldo Freitas Silva',
    Dia: 4,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [20],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Vitor: {
    Name: 'Vitor Oliveira Barbosa',
    Dia: 8,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [3, 21, 26],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Pereira: {
    Name: 'Matheus Pereira Ramos',
    Dia: 5,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [2, 22, 24, 25],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Machado: {
    Name: 'Bruno Machado Sidomo',
    Dia: 2,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [12],
    Time: 'H0',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Martins: {
    Name: 'Gabriel Martins Filho',
    Dia: 13,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [11],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Marcos: {
    Name: 'Marcos Vinicius De Souza',
    Dia: 7,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [10, 13],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Rafael: {
    Name: 'Rafael Lima De Souza',
    Dia: 4,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [9, 14, 31],
    Time: 'H1',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Pedro: {
    Name: 'Pedro Henrique Sorrilha Cordeiro',
    Dia: 22,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [0],
    Time: 'H2',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  },
  Correia: {
    Name: 'Bruno Correia',
    Dia: 26,
    Mes: 11,
    Folga: false,
    Dupla: false,
    GateMaker: [8],
    Time: 'H3',
    Count: [0, 0, 0, 0, 0],
    Folgas: []
  }
}

let escala = 6

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
  console.log(folgas) // Verifique o que está sendo retornado aqui

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

console.log(peoples)
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

// Mudar para deviceready
const lastOpenRef = database.ref('app/lastOpen')

function recordAppOpen() {
  const now = getSPTime()
  lastOpenRef.set({
    lastOpen: now
  })
}

// Registrar quando o app é aberto
recordAppOpen()

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
    'Dallas - 0950': {
      times: '22:10 / 23:00',
      time: 'H1',
      fallback: ['H2', 'H3'],
      checkInEnd: '21:55'
    },
    'Nova York - 0962': {
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
  for (let day = diaAtual.getDate(); day <= daysInMonth; day++) {
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

  function getAvailablePeople(flight, day, includeFallback = true) {
    const { time, fallback } = flights[flight]
    const date = new Date(diaAtual.getFullYear(), diaAtual.getMonth(), day)
    const dateString = date.toDateString()
    let availablePeople = []

    // Prioritize people with the exact time first
    availablePeople = Object.keys(peoples).filter(personKey => {
      const person = peoples[personKey]
      return (
        !person.Folgas.includes(dateString) &&
        !person.GateMaker.includes(day) &&
        person.Time === time &&
        !Object.values(assignments[date.toISOString().split('T')[0]] || {})
          .flat()
          .includes(personKey) &&
        !(
          flight === 'Miami - 0930' &&
          wasPersonAssignedToFlight(date, 'Miami - 0930', personKey)
        ) &&
        !(
          flight === 'Dallas - 0950' &&
          wasPersonAssignedToFlight(date, 'Dallas - 0950', personKey)
        )
      )
    })

    // Sort by least assigned to this flight (balance by Count)
    availablePeople.sort(
      (a, b) =>
        peoples[a].Count[Object.keys(flights).indexOf(flight)] -
        peoples[b].Count[Object.keys(flights).indexOf(flight)]
    )

    // If fallback is needed
    if (includeFallback && availablePeople.length < 2 && fallback) {
      fallback.forEach(fbTime => {
        if (availablePeople.length < 2) {
          const fallbackCandidates = Object.keys(peoples).filter(personKey => {
            const person = peoples[personKey]
            return (
              !person.Folgas.includes(dateString) &&
              !person.GateMaker.includes(day) &&
              person.Time === fbTime &&
              !Object.values(
                assignments[date.toISOString().split('T')[0]] || {}
              )
                .flat()
                .includes(personKey)
            )
          })

          fallbackCandidates.sort(
            (a, b) =>
              peoples[a].Count[Object.keys(flights).indexOf(flight)] -
              peoples[b].Count[Object.keys(flights).indexOf(flight)]
          )

          availablePeople = availablePeople.concat(fallbackCandidates)
        }
      })
    }

    return availablePeople.slice(0, 2) // Limit to 2 people
  }

  function assignPeople(flight, availablePeople, dateString) {
    // Verificar e ajustar o Time do Correia com base no ChangeTime

    if (availablePeople.length >= 2) {
      // Rotação entre 0930 e 0950
      if (flight === 'Miami - 0930' || flight === 'Dallas - 0950') {
        const previousDate = new Date(dateString)
        previousDate.setDate(previousDate.getDate() - 1)
        const prevDateString = previousDate.toISOString().split('T')[0]

        const prev0930 = assignments[prevDateString]
          ? assignments[prevDateString]['Miami - 0930'] || []
          : []
        const prev0950 = assignments[prevDateString]
          ? assignments[prevDateString]['Dallas - 0950'] || []
          : []

        if (flight === 'Miami - 0930') {
          if (prev0930.includes('Pedro') && availablePeople.includes('Pedro')) {
            const index = availablePeople.indexOf('Pedro')
            availablePeople.splice(index, 1)
            availablePeople.push('Pedro')
          }
        }

        if (flight === 'Dallas - 0950') {
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
        (flight === 'Dallas - 0950' || flight === 'Miami - 0930')
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
    }

    // Update Count for each person assigned
    assignments[dateString][flight].forEach(personKey => {
      const flightIndex = Object.keys(flights).indexOf(flight)
      peoples[personKey].Count[flightIndex]++
      salvarLog(peoples[personKey].Name, flight)
    })
  }

  // Add GateMaker as fixed check-in closer
  function addGateMakerToCheckin(day, dayDiv) {
    const date = new Date(diaAtual.getFullYear(), diaAtual.getMonth(), day)
    const dateString = date.toISOString().split('T')[0]

    const gateMakerForDay = Object.keys(peoples).find(personKey =>
      peoples[personKey].GateMaker.includes(day)
    )

    if (gateMakerForDay) {
      const flight0962People = assignments[dateString]['Nova York - 0962']
      let replacement = null

      // Check if the GateMaker belongs to H1 and reassign check-in closer
      if (
        peoples[gateMakerForDay].Time === 'H1' &&
        flight0962People.length > 0
      ) {
        replacement = flight0962People.pop()
      }

      const gateMakerDiv = document.createElement('div')
      gateMakerDiv.className = 'gateMaker'
      gateMakerDiv.innerHTML = `<h2>Fechamento De Check-In / Montagem De Portões</h2><h3>${
        replacement ? peoples[replacement].Name : peoples[gateMakerForDay].Name
      }</h3>`

      // Mark the gateMaker for the day
      assignments[dateString]['GateMaker'] = [
        replacement ? replacement : gateMakerForDay
      ]

      dayDiv.appendChild(gateMakerDiv)
    }
  }

  const prioritizeFlights = [
    'Miami - 0906',
    'Miami - 0958',
    'Nova York - 0962',
    'Dallas - 0950',
    'Miami - 0930'
  ]

  const displayOrderFlights = [
    'Miami - 0930',
    'Dallas - 0950',
    'Nova York - 0962',
    'Miami - 0958',
    'Miami - 0906'
  ]

  const gatesDiv = document.querySelector('.Gates')

  for (let day = diaAtual.getDate(); day <= daysInMonth; day++) {
    const date = new Date(diaAtual.getFullYear(), diaAtual.getMonth(), day)
    const dayString = String(date.getDate()).padStart(2, '0')
    const monthString = String(date.getMonth() + 1).padStart(2, '0')
    const yearString = String(date.getFullYear()).slice(-2)
    const formattedDate = `${dayString}/${monthString}/${yearString}`
    const dateString = date.toISOString().split('T')[0]

    // Create .day container
    const dayDiv = document.createElement('div')
    dayDiv.className = 'day'
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
  salvarAssignments(assignments, diaAtual)
  return assignments
}

// Função para verificar o horário e executar a tarefa
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
          distribuirPessoas()
        }
      } else {
        distribuirPessoas()
      }
    })
    .catch(error => {
      console.error('Erro ao ler dados: ', error)
    })
}

// Chamar a função scheduleTask quando o app é aberto
scheduleTask()

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
          console.log('salvo', existingAssignments)
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

    if (!person.Folga) {
      let listClass = `list${person.Time}`
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

populatePeopleList(peoples)

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

/////////////////////////////////////////////////////////////////////

/*
async function getAssignments() {
  const assignmentsRef = database.ref('app/assignments')
  const snapshot = await assignmentsRef.once('value')
  return snapshot.val()
}

// Função para unificar os nomes com base nas palavras-chave
function unifyName(person, nameList) {
  for (const key in nameList) {
    if (nameList[key].some(word => person.includes(word))) {
      return key
    }
  }
  return person
}

async function countNames() {
  const assignments = await getAssignments()
  const personCount = {}

  // Lista de nomes para unificação com palavras-chave
  const nameList = {
    'Vitor Oliveira Barbosa': ['Vitor', 'Oliveira', 'Barbosa'],
    'Bruno Machado Sidomo': ['Machado', 'Bruno', 'Sidomo'],
    'João Vitor Dias': ['Dias'],
    'João Severino De Lira': ['Severino'],
    'Florisvaldo Freitas Silva': ['Florisvaldo'],
    'Bruno Correia': ['Correia'],
    'Matheus Pereira Ramos': ['Pereira'],
    'Matheus De Menezes Silva': ['Menezes'],
    'Gabriel Martins Filho': ['Martins'],
    'Gabriel De Souza Lima': ['Souza']
  }

  // Percorrer todas as datas e voos
  Object.keys(assignments).forEach(date => {
    Object.keys(assignments[date]).forEach(flight => {
      const list = assignments[date][flight]
      if (Array.isArray(list)) {
        list.forEach(person => {
          const unifiedName = unifyName(person, nameList)
          if (!personCount[unifiedName]) {
            personCount[unifiedName] = {}
          }
          if (!personCount[unifiedName][flight]) {
            personCount[unifiedName][flight] = 0
          }
          personCount[unifiedName][flight]++
        })
      }
    })
  })

  // Exibir a contagem no console
  const logs = Object.keys(personCount).map(person => {
    const flights = Object.keys(personCount[person])
      .map(flight => {
        return `${flight} - ${personCount[person][flight]}`
      })
      .join(', ')
    return `Nome: ${person}, ${flights}`
  })

  //console.log(logs.join('\n'))
}

countNames()
*/
