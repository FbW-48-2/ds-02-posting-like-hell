export function handleSubmit(user, pw, e, postRequest, setUser, setPw){
    console.log('does the method arrive here?: ', e)
    e.preventDefault()
    setUser('')
    setPw('')
    postRequest(user,pw, e.target.value)
}