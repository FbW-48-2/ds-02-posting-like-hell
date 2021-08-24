export async function getRequest() {
    try{
      const res = await fetch(`http://localhost:5000/users`)
      const result = await res.json()
      console.log(result)
    }
    catch{
      console.log('something went wrong while sending')
    }}


export async function postRequest(user, pw) {
    const data = {username: user, password: pw}
    try{
      const res = await fetch(`https://localhost:5000/login`, {
        method: 'POST',
        headers: { "Content-type" : "application/json"},
        body: JSON.stringify(data)
        })
      const result = await res.json()
      console.log(result)
    }
    catch{
      console.log('something went wrong while sending')
    }}