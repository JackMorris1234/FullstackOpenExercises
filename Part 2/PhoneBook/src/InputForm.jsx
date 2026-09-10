const InputForm=({submit, newName, handleInput, newPhone, handlePhoneInput})=>{
    
    return(
        <form onSubmit={submit}>
            <div>name: <input value={newName} onChange={handleInput}/></div>
            <div>phone: <input value={newPhone} onChange={handlePhoneInput}/></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}
export default InputForm