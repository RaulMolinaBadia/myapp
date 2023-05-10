const impresora0 = document.getElementById('0')
const impresora1 = document.getElementById('1')
const impresora2 = document.getElementById('2')
const queueTextArea = document.getElementById('queueTextArea')
const buttonSendTextPrinter = document.getElementById('buttonSendTextPrinter')
const printerDropdown = document.getElementById('printerDropdown')
let queueValue = '0'
const colorInk = 0.2
const blackInk = 0.8
let printerSelected = '0'
let textValue = 0
const getPrinters = () => {
  try {
    return fetch('/printers', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        return data
      })
  } catch (error) {
    console.error(error)
  }
}

const putPrinterInk = data => {
  console.log(data)
  try {
    fetch(`/printers/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      sessionStorage.setItem(`printer${data.id}`, JSON.stringify(data))
      updateInkPrinters()
      clearPrintQueue(data.id)
    })
  } catch (error) {
    console.error(error)
  }
}

const clearQueueTextArea = () => {
  const queueTextArea = document.getElementById('queueTextArea')
  queueTextArea.value = ''
}

const addTextQueue = text => {
  let queuelist = document.querySelector(
    `#printer${printerSelected} .list-group`
  )
  let li = document.createElement('li')
  li.innerHTML = text
  if (text != '') {
    queuelist.appendChild(li)
    clearQueueTextArea()
  }
}

const getTextPrint = () => {
  const queueTextArea = document.getElementById('queueTextArea')
  console.log(queueTextArea.value)
  return queueTextArea.value
}

buttonSendTextPrinter.addEventListener('click', e => {
  queueValue = getTextPrint()
  addTextQueue(queueValue)
})

printerDropdown.addEventListener('input', e => {
  printerSelected = e.currentTarget.value
})
const consumeInks = idPrinter => {
  getPrinters().then(printer => {
    let textValue = queueValue.length
    console.log(textValue)
    // console.log(printer)
    // console.log(printer[idPrinter].negro - blackInk * textValue)
    let newBlackInk = printer[idPrinter].negro - blackInk * textValue
    let newYellowInk = printer[idPrinter].amarillo - colorInk * textValue
    let newCianInk = printer[idPrinter].cian - colorInk * textValue
    let newMagentaInk = printer[idPrinter].magenta - colorInk * textValue

    let data = {
      id: idPrinter,
      negro: newBlackInk,
      amarillo: newYellowInk,
      cian: newCianInk,
      magenta: newMagentaInk
    }
    putPrinterInk(data)
  })
}

impresora0.addEventListener('click', e => {
  let idPrinter = e.currentTarget.id
  consumeInks(idPrinter)
})

impresora1.addEventListener('click', e => {
  let idPrinter = e.currentTarget.id
  consumeInks(idPrinter)
})

impresora2.addEventListener('click', e => {
  let idPrinter = e.currentTarget.id
  consumeInks(idPrinter)
})

const updateInkPrinters = () => {
  let toner = document.querySelectorAll(`.toner`)
  getPrinters().then(data => {
    data.forEach((printer, i) => {
      let actualToner = toner[i].children
      actualToner[0].innerHTML = `${printer.negro}%`
      actualToner[1].innerHTML = `${printer.amarillo}%`
      actualToner[2].innerHTML = `${printer.cian}%`
      actualToner[3].innerHTML = `${printer.magenta}%`
    })
  })
}

const clearPrintQueue = id => {
  let printerQueue = document.querySelectorAll(
    `.row .list-group`
  )
  printerQueue[id].innerHTML = ''
}

window.onload = () => {
  updateInkPrinters()
}
