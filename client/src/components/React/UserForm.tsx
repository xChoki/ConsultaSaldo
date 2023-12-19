import { useState } from 'react'

export default function UserForm() {
  const [formUserInput, setFormUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSaldo, setShowSaldo] = useState(false)
  const [saldo, setSaldo] = useState(0)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    setLoading(true)
    setShowSaldo(true)

    const requestData = {
      userInput: formUserInput,
    }

    if (formUserInput) {
      fetch('http://localhost:4000/api/saldo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .catch((error) => console.error('Error:', error))
        .then((response) => {
          setSaldo(response.saldo)
          setLoading(false)
        })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='inputField'
          onChange={(e) => setFormUserInput(e.target.value)}
          value={formUserInput}
          className='border rounded-l-md p-3'
        />
        <button type='submit' className='border rounded-r-md bg-sky-300 p-3'>
          Enviar
        </button>
      </form>

      <section className={`${showSaldo && 'mt-5 text-center border rounded-md font-semibold text-lg'}`}>
        {showSaldo && (loading ? <p className='py-10'>Saldo: Cargando...</p> : <p className='py-10'>Saldo: {saldo}</p>)}
      </section>
    </>
  )
}
