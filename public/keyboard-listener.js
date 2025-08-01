export default function createKeyboardListener(document) {
  const observers = []

  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function unsubscribeAll() {
    observers.length = 0
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  document.addEventListener('keydown', handleKeydown)

  function handleKeydown(event) {
    const keyPressed = event.key

    const command = {
      type: 'key-pressed',
      keyPressed
    }

    notifyAll(command)
  }

  return {
    subscribe,
    unsubscribeAll
  }
}